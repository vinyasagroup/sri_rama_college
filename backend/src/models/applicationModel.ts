import db from "../config/db";


export const getApplicationsModel = (
  callback:any
) => {

  db.query(
    "SELECT * FROM applications ORDER BY id DESC",
    callback
  );

};
export const saveApplicationModel = (
  data:any,
  callback:any
) => {

  db.query(
    `
    INSERT INTO applications
    (
      application_for,
      full_name,
      gender,
      dob,
      email,
      phone,
      nationality,
      mother_tongue,
      languages,
      place_of_birth,
      state,
      religion,
      caste,
      category,
      marital_status,
      father_name,
      father_occupation,
      father_phone,
      mother_name,
      mother_occupation,
      mother_phone,
      guardian_name,
      guardian_phone,
      parent_income,
      hostel_applied,
      study_status,
      computer_literacy,
      sslc_school,
      sslc_board,
      sslc_percentage,
      sslc_year,
      puc_school,
      puc_board,
      puc_percentage,
      puc_year
    )
    VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)
    `,
    [
      data.applicationFor,
      data.fullName,
      data.gender,
      data.dob,
      data.email,
      data.phone,
      data.nationality,
      data.motherTongue,
      data.languages,
      data.placeOfBirth,
      data.state,
      data.religion,
      data.caste,
      data.category,
      data.maritalStatus,

      data.fatherName,
      data.fatherOccupation,
      data.fatherPhone,

      data.motherName,
      data.motherOccupation,
      data.motherPhone,

      data.guardianName,
      data.guardianPhone,

      data.parentIncome,
      data.hostelApplied,
      data.studyStatus,
      data.computerLiteracy,

      data.sslcSchool,
      data.sslcBoard,
      data.sslcPercentage,
      data.sslcYear,

      data.pucSchool,
      data.pucBoard,
      data.pucPercentage,
      data.pucYear,
      
    ],
    callback
  );

};

export const updateApplicationStatusModel = (
  id: string,
  status: string,
  callback: any
) => {
  db.query(
    "UPDATE applications SET status=? WHERE id=?",
    [status, id],
    callback
  );
};

export const getApplicationByIdModel = (
  id: string,
  callback: any
) => {
  db.query(
    "SELECT * FROM applications WHERE id=?",
    [id],
    callback
  );
};
export const getDashboardCountsModel = (callback: any) => {
  const query = `
    SELECT
      COUNT(*) AS totalApplications,
      SUM(CASE WHEN status='Approved' THEN 1 ELSE 0 END) AS approved,
      SUM(CASE WHEN status='Pending' THEN 1 ELSE 0 END) AS pending,
      SUM(CASE WHEN status='New' THEN 1 ELSE 0 END) AS newAdmissions
    FROM applications
  `;

  db.query(query, callback);
};

export const getMonthlyApplicationsModel = (callback: any) => {
  const query = `
    SELECT
      MONTH(created_at) AS monthNumber,
      DATE_FORMAT(created_at, '%b') AS month,
      COUNT(*) AS applications
    FROM applications
    GROUP BY MONTH(created_at), DATE_FORMAT(created_at, '%b')
    ORDER BY MONTH(created_at)
  `;

  db.query(query, callback);
};

export const getCourseWiseStatsModel = (callback: any) => {
  const query = `
    SELECT
      application_for AS name,
      COUNT(*) AS applications
    FROM applications
    GROUP BY application_for
    ORDER BY applications DESC
  `;

  db.query(query, callback);
};

export const getRecentApplicationsModel = (callback: any) => {
  db.query(
    `
    SELECT
      id,
      full_name,
      application_for,
      status,
      created_at
    FROM applications
    WHERE status IN ('New', 'Pending', 'Under Review')
    ORDER BY id DESC
    `,
    callback
  );
};
