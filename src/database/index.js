const db = require('knex')({
    client: 'mysql',
    connection: {
      // host : '127.0.0.1',
      // host : 'noolim-project.cdhxtabtekrk.ap-northeast-2.rds.amazonaws.com',
      host : 'springboot2-webservice.covzzjccqpoz.ap-northeast-2.rds.amazonaws.com',
      user : 'sjoongh',
      port : 3306,
      password : 'sjh87354~',
      database : 'board_db',
      timezone: 'KST'
    },
  });

  
  module.exports = db;