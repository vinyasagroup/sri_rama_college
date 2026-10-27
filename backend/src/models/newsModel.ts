import db from "../config/db";

export const saveNewsModel = (

  data: any,

  callback: any

) => {

  db.query(

    `
    INSERT INTO news
    (
      title,
      category,
      description,
      news_date,
      banner_image
    )

    VALUES
    (
      ?,
      ?,
      ?,
      ?,
      ?
    )
    `,

    [

      data.title,

      data.category,

      data.description,

      data.date,

      data.bannerImage

    ],

    callback

  );

};
export const saveParagraphModel = (
  newsId: number,
  paragraphNo: number,
  paragraph: string,
  callback: any
) => {

  db.query(

    `
    INSERT INTO news_paragraphs
    (
      news_id,
      paragraph_no,
      content
    )
    VALUES
    (
      ?,
      ?,
      ?
    )
    `,

    [
      newsId,
      paragraphNo,
      paragraph
    ],

    callback

  );

};

export const getNewsModel = (

  callback: any

) => {

  db.query(

    `
    SELECT *
    FROM news
    ORDER BY id DESC
    `,

    callback

  );

};

export const getParagraphsModel = (

  newsId: number,

  callback: any

) => {

  db.query(

    `
    SELECT *
    FROM news_paragraphs

    WHERE news_id=?

    ORDER BY paragraph_no ASC
    `,

    [

      newsId

    ],

    callback

  );

};

export const updateNewsModel = (

  id: any,

  data: any,

  callback: any

) => {

  db.query(

    `
    UPDATE news

    SET

    title=?,

    category=?,

    description=?,

    news_date=?,

    banner_image=?

    WHERE id=?

    `,

    [

      data.title,

      data.category,

      data.description,

      data.date,

      data.bannerImage,

      id

    ],

    callback

  );

};

export const deleteParagraphModel = (

  newsId: number,

  callback: any

) => {

  db.query(

    `
    DELETE FROM news_paragraphs

    WHERE news_id=?
    `,

    [

      newsId

    ],

    callback

  );

};

export const deleteNewsModel = (

  id: any,

  callback: any

) => {

  db.query(

    `
    DELETE FROM news

    WHERE id=?
    `,

    [

      id

    ],

    callback

  );

};