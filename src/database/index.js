const db = require('knex')({
    client: 'mysql',
    connection: {
      host : '127.0.0.1',
      user : 'board_user',
      port : 3306,
      password : 'board',
      database : 'board_db',
      timezone: 'KST'
    },
  });

  
  module.exports = db;