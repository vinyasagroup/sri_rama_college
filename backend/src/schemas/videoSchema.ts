export const validateVideo = (
  body: any
) => {

  if (
    !body.video ||
    !body.video.trim()
  ) {
    return "YouTube Link is Required";
  }

  if (!body.status) {
    return "Status is Required";
  }

  const youtubeRegex =
    /^(https?:\/\/)?(www\.)?(youtube\.com\/(watch\?v=|embed\/|shorts\/)|youtu\.be\/)[\w-]+/;

  if (!youtubeRegex.test(body.video.trim())) {
    return "Please enter a valid YouTube link";
  }

  return null;
};