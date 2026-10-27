import {
  saveApplicationModel,
  getApplicationsModel,
  updateApplicationStatusModel,
  getApplicationByIdModel,
  getDashboardCountsModel
} from "../models/applicationModel";
import {
  getMonthlyApplicationsModel,
} from "../models/applicationModel";

import { getRecentApplicationsModel } from "../models/applicationModel";

import { getCourseWiseStatsModel } from "../models/applicationModel";
import {
  validateApplication
} from "../schemas/applicationSchema";

import { sendMail } from "../utils/sendMail";

export const saveApplication = (
  req: any,
  res: any
) => {

  const error =
    validateApplication(req.body);

  if (error) {
    return res.status(400).json({
      message: error
    });
  }

  saveApplicationModel(
    req.body,
    (err: any) => {

      if (err) {

        console.log("MYSQL ERROR:", err);

        return res.status(500).json({
          message: err.sqlMessage
        });

      }

      res.json({
        message: "Application Submitted"
      });

    }
  );

};

export const getApplications = (
  _req: any,
  res: any
) => {

  getApplicationsModel(
    (
      err: any,
      result: any
    ) => {

      if (err) {
        return res
          .status(500)
          .json(err);
      }

      res.json(result);

    }
  );

};

export const updateApplicationStatus = (
  req: any,
  res: any
) => {

  const { id } =
    req.params;

  const { status } =
    req.body;

  updateApplicationStatusModel(
    id,
    status,
    (err: any) => {

      if (err) {
        return res
          .status(500)
          .json(err);
      }

      getApplicationByIdModel(
        id,
        async (
          err2: any,
          result: any
        ) => {

          if (err2) {
            return res
              .status(500)
              .json(err2);
          }

          const student =
            result[0];

          if (!student) {
            return res.status(404).json({
              message: "Student not found"
            });
          }

          try {

            await sendMail(
              student.email,
              "Admission Status Updated",
              `
              <div style="font-family:Arial;padding:20px">
                <h2>Hello ${student.full_name}</h2>

                <p>
                  Your admission application for
                  <strong>${student.application_for}</strong>
                  has been updated.
                </p>

                <h3>
                  Current Status:
                  ${status}
                </h3>

                <br/>

                <p>
                  Regards,<br/>
                  Sri Rama First Grade College, Kalladka
                </p>
              </div>
              `
            );

            res.json({
              message:
                "Status updated and email sent successfully"
            });

          } catch (mailError) {

            console.log(mailError);

            res.json({
              message:
                "Status updated but email failed"
            });

          }

        }
      );

      

    }
  );

};
export const getDashboardCounts = (
  _req: any,
  res: any
) => {

  getDashboardCountsModel((err: any, result: any) => {

    if (err) {
      return res.status(500).json(err);
    }

    res.json(result[0]);

  });

};
export const getMonthlyApplications = (
  _req: any,
  res: any
) => {
  getMonthlyApplicationsModel((err: any, result: any) => {
    if (err) {
      return res.status(500).json(err);
    }

    res.json(result);
  });
};

export const getCourseWiseStats = (
  _req: any,
  res: any
) => {
  getCourseWiseStatsModel((err: any, result: any) => {
    if (err) {
      return res.status(500).json(err);
    }

    res.json(result);
  });
};

export const getRecentApplications = (
  _req: any,
  res: any
) => {

  getRecentApplicationsModel((err: any, result: any) => {

    if (err) {
      return res.status(500).json(err);
    }

    res.json(result);

  });

};