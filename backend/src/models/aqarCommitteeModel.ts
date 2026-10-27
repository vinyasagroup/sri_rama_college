import db from "../config/db";

export const saveAQARCommitteeModel = (
  data:any,
  callback:any
) => {

  db.query(
    `
    INSERT INTO aqar_committee
    (
      aqar_sl_no,
      aqar_name,
      aqar_designation,
      aqar_role
    )
    VALUES (?,?,?,?)
    `,
    [
      data.aqarSlNo,
      data.aqarName,
      data.aqarDesignation,
      data.aqarRole
    ],
    callback
  );

};

export const getAQARCommitteeModel = (
  callback:any
) => {

  db.query(
    `
    SELECT *
    FROM aqar_committee
    ORDER BY id DESC
    `,
    callback
  );

};

export const updateAQARCommitteeModel = (
  id:any,
  data:any,
  callback:any
) => {

  db.query(
    `
    UPDATE aqar_committee
    SET
      aqar_sl_no=?,
      aqar_name=?,
      aqar_designation=?,
      aqar_role=?
    WHERE id=?
    `,
    [
      data.aqarSlNo,
      data.aqarName,
      data.aqarDesignation,
      data.aqarRole,
      id
    ],
    callback
  );

};

export const deleteAQARCommitteeModel = (
  id:any,
  callback:any
) => {

  db.query(
    `
    DELETE FROM aqar_committee
    WHERE id=?
    `,
    [id],
    callback
  );

};