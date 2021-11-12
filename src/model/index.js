const db = require('../database');

const self = {};

// user

self.addUser = async ({ user_name }) => {
    const query = `
      INSERT INTO user
      values (null,?,now())
    `;
    await db.raw(query, [user_name]);
  };
  self.findUser = async ({ user_no }) => {
    const query = `
      SELECT * FROM user
      WHERE user_no = ?
    `;
    const ret = await db.raw(query, [user_no]);
    return ret[0];
  };
  
  // content

  self.addContent = async ({ user_no, title, context }) => {
    const query = `
      INSERT INTO content 
      values (null,?, ?, ?, now())
    `;
    await db.raw(query, [user_no, title, context ]);
  };
  
  self.modifyContent = async ({  title, context, content_no }) => {
    const query = `
      UPDATE content
      SET title = ?, context = ?
      WHERE content_no = ?
    `;
    await db.raw(query, [ title, context, content_no]);
  };
  
  self.deleteContent = async ({ content_no }) => {
    const query = `
      DELETE FROM content
      WHERE content_no = ? 
    `;
    await db.raw(query, [content_no]);
  };
  
  self.findContent = async ({ content_no }) => {
    const query = `
    SELECT 
    content_no,
    U.user_no,
    CT.title,
    CT.context,
    CT.regdate,
    U.user_name
    FROM content CT
    INNER JOIN user U on U.user_no = CT.user_no
    WHERE CT.content_no = ?
    `;
    const ret = await db.raw(query, [content_no]);
    return ret[0][0];
  };
  
  self.findContentList = async () => {
    const query = `
    SELECT 
    content_no,
    U.user_no,
    title,
    context,
    CT.regdate,
    user_name
    FROM content CT
    INNER JOIN user U ON U.user_no = CT.user_no
    ORDER BY CT.regdate DESC
    `;
    const ret = await db.raw(query );
    return ret[0];
  };
  
  // comment

  self.addComment = async ({ user_no, content_no, context }) => {
    const query = `
      INSERT INTO comment
      values (null,?, ?, ?,now())
    `;
    await db.raw(query, [user_no, content_no, context]);
  };
  
  self.findComment = async ({ content_no }) => {
    const query = `
      SELECT 
      CM.comment_no,
      U.user_no,
      CM.content_no,
      CM.context,
      CM.regdate,
      U.user_name
      FROM comment CM
      INNER JOIN user U on U.user_no = CM.user_no
      WHERE CM.content_no = ?
    `;
    const ret = await db.raw(query, [content_no]);
    return ret[0];
  };

  self.modifyComment = async ({ context, comment_no }) => {
    const query = `
      UPDATE comment
      SET  context = ?
      WHERE comment_no = ?
    `;
    await db.raw(query, [ context, comment_no]);
  };

  self.deleteComment = async ({ comment_no }) => {
    const query = `
      DELETE FROM comment
      WHERE comment_no = ? 
    `;
    await db.raw(query, [comment_no]);
  };
  
  // subcomment

  self.addSubComment = async ({ user_no, comment_no, context }) => {
    const query = `
      INSERT INTO subcomment
      values (null,?, ?, ?,now())
    `;
    await db.raw(query, [user_no, comment_no, context]);
  };
  
  self.findSubComment = async ({ comment_no }) => {
    const query = `
      SELECT * FROM subcomment SCM
      INNER JOIN user U on U.user_no = SCM.user_no
      WHERE comment_no = ?
    `;
    const ret = await db.raw(query, [comment_no]);
    return ret[0];
  };
  
  self.deleteSubComment = async ({ subcomment_no }) => {
    const query = `
      DELETE FROM subcomment
      WHERE subcomment_no = ? 
    `;
    await db.raw(query, [subcomment_no]);
  };
  

  // location 해보기

  self.findLocation = async ({ loca_no }) => {
    const query = `
    SELECT *
    FROM location
    WHERE loca_no = ?
    `;
    const ret = await db.raw(query, [loca_no]);
    return ret[0][0];
  };
  
  self.findLocationList = async () => {
    const query = `
    SELECT *
    FROM location
    ORDER BY loca_no 
    `;
    const ret = await db.raw(query );
    return ret[0];
  };


  // locationdetail 
  self.findLocationDetail = async ({ detail_no }) => {
    const query = `
    SELECT *
    FROM locationdetail
    WHERE detail_no = ?
    `;
    const ret = await db.raw(query, [detail_no]);
    return ret[0][0];
  };
  
  self.findLocationDetailList = async () => {
    const query = `
    SELECT *
    FROM locationdetail
    ORDER BY detail_no 
    `;
    const ret = await db.raw(query );
    return ret[0];
  };

  // hash 

  self.findHash = async ({ hash_no }) => {
    const query = `
    SELECT *
    FROM hash
    WHERE hash_no = ?
    `;
    const ret = await db.raw(query, [hash_no]);
    return ret[0][0];
  };
  
  self.findHashList = async () => {
    const query = `
    SELECT *
    FROM hash
    ORDER BY hash_no 
    `;
    const ret = await db.raw(query );
    return ret[0];
  };

module.exports = self;