const db = require('knex')({
    client: 'mysql',
    connection: {
      host : '127.0.0.1',
      user : 'board_user',
      port : 3306,
      password : 'board',
      timezone: 'KST',
      database : 'board_db'
    },
    // define: {
    //   timestamps: true
    // }
  });

  
  module.exports = db;