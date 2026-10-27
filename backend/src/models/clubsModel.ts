import db from "../config/db";

// ================= Save Club =================
export const saveClubModel = (data: any, callback: Function) => {

  const sql = `
    INSERT INTO clubs
    (
      club_name,
      club_category,
      club_short_description,
      club_image
    )
    VALUES (?,?,?,?)
  `;

  db.query(
    sql,
    [
      data.clubName,
      data.clubCategory,
      data.clubShortDescription,
      data.clubImage
    ],
    (err, result: any) => {

      if (err) {
        return callback(err);
      }

      callback(null, result.insertId);

    }
  );

};

// ================= Save Overview =================

export const saveOverviewModel = (
  clubId: number,
  overview: any[],
  callback: Function
) => {

  if (!overview || overview.length === 0) {
    return callback(null);
  }

  let completed = 0;
  let hasError = false;

  overview.forEach((item, index) => {
console.log("Saving Overview:", item);
    db.query(
  `
  INSERT INTO club_overview
  (
    club_id,
    overview_order,
    overview_content
  )
  VALUES (?,?,?)
  `,
  [
    clubId,
    index + 1,
    item.paragraph
  ],
  
      (err, result) => {

  console.log("Overview Insert Error:", err);
  console.log("Overview Insert Result:", result);

  if (hasError) return;

  if (err) {
    hasError = true;
    return callback(err);
  }

  completed++;

  if (completed === overview.length) {
    callback(null);
  }
}
    );

  });

};

// ================= Save Faculty Coordinators =================

export const saveCoordinatorModel = (
  clubId: number,
  coordinators: any[],
  callback: Function
) => {

  if (!coordinators || coordinators.length === 0) {
    return callback(null);
  }

  let completed = 0;
  let hasError = false;

  coordinators.forEach((item) => {
console.log("Saving Coordinator:", item);
    db.query(
      `
      INSERT INTO club_faculty_coordinators
      (
        club_id,
        club_faculty_name,
        club_faculty_designation
      )
      VALUES (?,?,?)
      `,
      [
        clubId,
        item.name,
        item.designation
      ],
      (err) => {

        if (hasError) return;

        if (err) {
          hasError = true;
          return callback(err);
        }

        completed++;

        if (completed === coordinators.length) {
          callback(null);
        }

      }
    );

  });

};

// ================= Get All Clubs =================

export const getClubsModel = (callback: Function) => {

  db.query(
    `
    SELECT
      c.*,

      GROUP_CONCAT(
        DISTINCT o.overview_content
        ORDER BY o.overview_order
        SEPARATOR '||'
      ) AS overview,

      GROUP_CONCAT(
        DISTINCT CONCAT(
          fc.club_faculty_name,
          ' (',
          fc.club_faculty_designation,
          ')'
        )
        SEPARATOR '||'
      ) AS coordinators

    FROM clubs c

    LEFT JOIN club_overview o
      ON c.id = o.club_id

    LEFT JOIN club_faculty_coordinators fc
      ON c.id = fc.club_id

    GROUP BY c.id

    ORDER BY c.id DESC
    `,
    (err, result) => {

      if (err) {
        return callback(err);
      }

      callback(null, result);

    }
  );

};

// ================= Get Club By Id =================

export const getClubByIdModel = (
  id: number,
  callback: Function
) => {

  db.query(
    `
    SELECT *
    FROM clubs
    WHERE id = ?
    `,
    [id],
    (err, club: any) => {

      if (err) {
        return callback(err);
      }

      db.query(
        `
        SELECT *
        FROM club_overview
        WHERE club_id = ?
        ORDER BY overview_order
        `,
        [id],
        (err2, overview: any) => {

          if (err2) {
            return callback(err2);
          }

          db.query(
            `
            SELECT *
            FROM club_faculty_coordinators
            WHERE club_id = ?
            `,
            [id],
            (err3, coordinators: any) => {

              if (err3) {
                return callback(err3);
              }

              callback(null, {
                club: club[0],
                overview,
                coordinators
              });

            }
          );

        }
      );

    }
  );

};


// ================= Update Club =================

export const updateClubModel = (
  id: number,
  data: any,
  callback: Function
) => {

  const sql = `
    UPDATE clubs
    SET
      club_name = ?,
      club_category = ?,
      club_short_description = ?,
      club_image = ?
    WHERE id = ?
  `;

  db.query(
    sql,
    [
      data.clubName,
      data.clubCategory,
      data.clubShortDescription,
      data.clubImage,
      id
    ],
    (err) => {

      if (err) {
        return callback(err);
      }

      callback(null);

    }
  );

};

// ================= Delete Overview =================

export const deleteOverviewModel = (
  clubId: number,
  callback: Function
) => {

  db.query(
    `
    DELETE FROM club_overview
    WHERE club_id = ?
    `,
    [clubId],
    (err) => {

      if (err) {
        return callback(err);
      }

      callback(null);

    }
  );

};

// ================= Delete Faculty Coordinators =================

export const deleteCoordinatorModel = (
  clubId: number,
  callback: Function
) => {

  db.query(
    `
    DELETE FROM club_faculty_coordinators
    WHERE club_id = ?
    `,
    [clubId],
    (err) => {

      if (err) {
        return callback(err);
      }

      callback(null);

    }
  );

};

// ================= Delete Club =================

export const deleteClubModel = (
  id: number,
  callback: Function
) => {

  db.query(
    `
    DELETE FROM clubs
    WHERE id = ?
    `,
    [id],
    (err) => {

      if (err) {
        return callback(err);
      }

      callback(null);

    }
  );

};