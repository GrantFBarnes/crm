const database = require("./database.js");

const id_regex =
  /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/;

////////////////////////////////////////////////////////////////////////////////
// Common

function idIsValid(id) {
  if (!id || !id_regex.test(id)) {
    return false;
  }
  return true;
}

function dataIsValid(table, data) {
  if (!data || !data.id || !id_regex.test(data.id)) {
    return false;
  }

  return true;
}

function getIdFromData(data, field) {
  if (data && data[field] && id_regex.test(data[field])) {
    return data[field];
  }
  return "";
}

////////////////////////////////////////////////////////////////////////////////
// Users

function validateLogin(data) {
  return new Promise((resolve) => {
    if (!data || !data.username || !data.password) {
      resolve({ statusCode: 500, data: "data not valid" });
      return;
    }

    database
      .run(
        `
        SELECT id FROM user WHERE name = '${data.username}' AND password = '${data.password}';
        `
      )
      .then((result) => {
        if (result.length) {
          resolve({ statusCode: 200, data: true });
          return;
        }
        resolve({ statusCode: 401, data: false });
        return;
      })
      .catch(() => {
        resolve({ statusCode: 400, data: "failed to validate login" });
        return;
      });
  });
}

////////////////////////////////////////////////////////////////////////////////

module.exports.validateLogin = validateLogin;
