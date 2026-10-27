import { GetObjectCommand } from "@aws-sdk/client-s3";
import { s3 } from "../config/s3";

export const getFile = async (req: any, res: any) => {
  try {
    const key = decodeURIComponent(req.params.key);

    console.log("========== FILE REQUEST ==========");
    console.log("Requested Key:", key);

    // Browser video Range request
    const range = req.headers.range;

    /*
     * Example:
     * Range: bytes=0-1000000
     */
    if (range) {
      console.log("Range Request:", range);

      // Get total file size
      const headResponse = await s3.send(
        new GetObjectCommand({
          Bucket: process.env.BUCKET_NAME!,
          Key: key,
          Range: "bytes=0-0",
        })
      );

      const contentRange = headResponse.ContentRange;

      if (!contentRange) {
        return res.status(404).json({
          message: "File information not available",
        });
      }

      /*
       * Example:
       * Content-Range: bytes 0-0/25000000
       */
      const totalSize = Number(
        contentRange.split("/")[1]
      );

      // Parse browser Range header
      const rangeMatch = range.match(
        /bytes=(\d+)-(\d*)/
      );

      if (!rangeMatch) {
        return res.status(416).end();
      }

      const start = Number(rangeMatch[1]);

      let end = rangeMatch[2]
        ? Number(rangeMatch[2])
        : Math.min(
            start + 1024 * 1024 - 1,
            totalSize - 1
          );

      // Prevent end from exceeding file size
      end = Math.min(
        end,
        totalSize - 1
      );

      const chunkSize = end - start + 1;

      console.log("Start:", start);
      console.log("End:", end);
      console.log("Chunk Size:", chunkSize);
      console.log("Total Size:", totalSize);

      // Request only required bytes from Linode/S3
      const response = await s3.send(
        new GetObjectCommand({
          Bucket: process.env.BUCKET_NAME!,
          Key: key,
          Range: `bytes=${start}-${end}`,
        })
      );

      // Partial content
      res.status(206);

      res.setHeader(
        "Content-Range",
        `bytes ${start}-${end}/${totalSize}`
      );

      res.setHeader(
        "Accept-Ranges",
        "bytes"
      );

      res.setHeader(
        "Content-Length",
        chunkSize
      );

      res.setHeader(
        "Content-Type",
        response.ContentType || "video/mp4"
      );

      res.setHeader(
        "Cache-Control",
        "public, max-age=31536000"
      );

      if (response.Body) {
        const body = response.Body as any;

        body.pipe(res);
      }

      return;
    }

    // Normal file request
    const response = await s3.send(
      new GetObjectCommand({
        Bucket: process.env.BUCKET_NAME!,
        Key: key,
      })
    );

    if (!response.Body) {
      return res.status(404).json({
        message: "File not found",
      });
    }

    res.status(200);

    res.setHeader(
      "Content-Type",
      response.ContentType ||
        "application/octet-stream"
    );

    if (response.ContentLength) {
      res.setHeader(
        "Content-Length",
        response.ContentLength
      );
    }

    res.setHeader(
      "Accept-Ranges",
      "bytes"
    );

    res.setHeader(
      "Cache-Control",
      "public, max-age=31536000"
    );

    const body = response.Body as any;

    body.pipe(res);

  } catch (error: any) {
    console.log(
      "========== FILE ERROR =========="
    );

    console.log("Error:", error);

    return res.status(404).json({
      message: "File not found",
    });
  }
};