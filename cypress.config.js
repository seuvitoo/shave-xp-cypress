const { defineConfig } = require("cypress");
const { Pool } = require("pg");

const dbConfig = {
  host: "localhost",
  user: "postgres",
  password: "qaninja",
  database: "postgres",
  port: "5432",
};

module.exports = defineConfig({
  e2e: {
    setupNodeEvents(on, config) {
      const pool = new Pool(dbConfig);
      on("task", {
        removeUser(email) {
          return new Promise(function (resolve) {
            pool.query(
              "DELETE FROM users where email = $1",
              [email],
              function (error, result) {
                if (error) {
                  throw error;
                }
                resolve({ sucess: result });
              }
            );
          });
        },
      });
    },
    viewportWidth: 1920,
    viewportHeight: 1080,
    baseUrl: "http://localhost:3000",
  },
});
