const { Pool } = require("pg");

const dbConfig = {
  host: "localhost",
  user: "postgres",
  password: "qaninja",
  database: "postgres",
  port: "5432",
};

module.exports = {
  removeUser(email) {
    return new Promise(function (resolve) {
      const pool = new Pool(dbConfig);

      pool.query(
        "DELETE FROM user WHERE email = $1",
        [email],
        function (error, result) {
          if (error) {
            throw error;
          }
          resolve({ message: result });
        }
      );
    });
  },
};
