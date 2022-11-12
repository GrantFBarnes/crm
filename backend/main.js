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

function getUserId(data) {
  return new Promise((resolve, reject) => {
    if (!data || !data.username || !data.password) {
      reject("data not valid");
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
          resolve(result[0].id);
          return;
        }
        reject("invalid credentials");
        return;
      })
      .catch(() => {
        reject("failed to validate login");
        return;
      });
  });
}

////////////////////////////////////////////////////////////////////////////////
// Companies

function getCompanies(user_id) {
  return new Promise((resolve) => {
    if (!idIsValid(user_id)) {
      resolve({ statusCode: 500, data: "user id not valid" });
      return;
    }

    database
      .run(
        `
        SELECT * FROM company
          WHERE user_id = '${user_id}';
        `
      )
      .then((result) => {
        resolve({ statusCode: 200, data: result });
        return;
      })
      .catch(() => {
        resolve({ statusCode: 400, data: "failed to get companies" });
        return;
      });
  });
}

function getCompanyById(user_id, company_id) {
  return new Promise((resolve) => {
    if (!idIsValid(user_id)) {
      resolve({ statusCode: 500, data: "user id not valid" });
      return;
    }

    if (!idIsValid(company_id)) {
      resolve({ statusCode: 500, data: "company id not valid" });
      return;
    }

    database
      .run(
        `
        SELECT * FROM company
          WHERE user_id = '${user_id}'
            AND id = '${company_id}';
        `
      )
      .then((result) => {
        if (result.length) {
          resolve({ statusCode: 200, data: result[0] });
          return;
        }
        resolve({ statusCode: 400, data: "company not found" });
        return;
      })
      .catch(() => {
        resolve({ statusCode: 400, data: "failed to get company" });
        return;
      });
  });
}

////////////////////////////////////////////////////////////////////////////////

module.exports.getUserId = getUserId;

module.exports.getCompanies = getCompanies;
module.exports.getCompanyById = getCompanyById;
