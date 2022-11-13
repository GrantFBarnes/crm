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

  let columns = [];
  switch (table) {
    case "company":
      columns = ["id", "user_id", "name", "city", "state", "zip"];
      break;

    case "company_contact_info":
      columns = ["id", "user_id", "company_id", "type", "value"];
      break;

    default:
      return false;
  }

  for (let field in data) {
    if (columns.indexOf(field) < 0) {
      return false;
    }
  }

  const keys = Object.keys(data);
  for (let column of columns) {
    if (keys.indexOf(column) < 0) {
      return false;
    }
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
        SELECT id FROM user
        WHERE name = '${data.username}'
          AND password = '${data.password}';
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

function getCompany(user_id, company_id) {
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

function updateCompany(user_id, data) {
  return new Promise((resolve) => {
    if (!idIsValid(user_id)) {
      resolve({ statusCode: 500, data: "user id not valid" });
      return;
    }

    if (!dataIsValid("company", data)) {
      resolve({ statusCode: 500, data: "data not valid" });
      return;
    }

    if (user_id != data.user_id) {
      resolve({ statusCode: 401, data: "user id does not match" });
      return;
    }

    database
      .run(
        `
        UPDATE company
        SET
          name = '${data.name}',
          city = '${data.city}',
          state = '${data.state}',
          zip = '${data.zip}'
        WHERE user_id = '${user_id}'
          AND id = '${data.id}';
        `
      )
      .then((result) => {
        resolve({ statusCode: 200, data: result });
        return;
      })
      .catch(() => {
        resolve({ statusCode: 400, data: "failed to update company" });
        return;
      });
  });
}

function createCompany(user_id, data) {
  return new Promise((resolve) => {
    if (!idIsValid(user_id)) {
      resolve({ statusCode: 500, data: "user id not valid" });
      return;
    }

    database
      .run(
        `
        INSERT INTO company
        (id, user_id, name, city, state, zip)
        VALUES
        (UUID(), '${user_id}', '', '', '', '')
        `
      )
      .then((result) => {
        resolve({ statusCode: 200, data: result });
        return;
      })
      .catch(() => {
        resolve({ statusCode: 400, data: "failed to create company" });
        return;
      });
  });
}

function deleteCompany(user_id, id) {
  return new Promise((resolve) => {
    if (!idIsValid(user_id)) {
      resolve({ statusCode: 500, data: "user id not valid" });
      return;
    }

    if (!idIsValid(id)) {
      resolve({ statusCode: 500, data: "id not valid" });
      return;
    }

    database
      .run(
        `
        DELETE FROM company
        WHERE user_id = '${user_id}'
          AND id = '${id}';
        `
      )
      .then((result) => {
        resolve({ statusCode: 200, data: result });
        return;
      })
      .catch(() => {
        resolve({ statusCode: 400, data: "failed to delete company" });
        return;
      });
  });
}

////////////////////////////////////////////////////////////////////////////////
// Company Contact Info

function getCompanyContactInfo(user_id, company_id) {
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
        SELECT * FROM company_contact_info
        WHERE user_id = '${user_id}'
          AND company_id = '${company_id}';
        `
      )
      .then((result) => {
        resolve({ statusCode: 200, data: result });
        return;
      })
      .catch(() => {
        resolve({
          statusCode: 400,
          data: "failed to get company contact info",
        });
        return;
      });
  });
}

function updateCompanyContactInfo(user_id, company_id, data) {
  return new Promise((resolve) => {
    if (!idIsValid(user_id)) {
      resolve({ statusCode: 500, data: "user id not valid" });
      return;
    }

    if (!idIsValid(company_id)) {
      resolve({ statusCode: 500, data: "company id not valid" });
      return;
    }

    if (!dataIsValid("company_contact_info", data)) {
      resolve({ statusCode: 500, data: "data not valid" });
      return;
    }

    if (user_id != data.user_id) {
      resolve({ statusCode: 401, data: "user id does not match" });
      return;
    }

    if (company_id != data.company_id) {
      resolve({ statusCode: 500, data: "company id does not match" });
      return;
    }

    database
      .run(
        `
        UPDATE company_contact_info
        SET
          type = '${data.type}',
          value = '${data.value}'
        WHERE user_id = '${user_id}'
          AND company_id = '${company_id}'
          AND id = '${data.id}';
        `
      )
      .then((result) => {
        resolve({ statusCode: 200, data: result });
        return;
      })
      .catch(() => {
        resolve({
          statusCode: 400,
          data: "failed to update company contact info",
        });
        return;
      });
  });
}

function createCompanyContactInfo(user_id, company_id, data) {
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
        INSERT INTO company_contact_info
        (id, user_id, company_id, type, value)
        VALUES
        (UUID(), '${user_id}', '${company_id}', '', '')
        `
      )
      .then((result) => {
        resolve({ statusCode: 200, data: result });
        return;
      })
      .catch(() => {
        resolve({
          statusCode: 400,
          data: "failed to create company contact info",
        });
        return;
      });
  });
}

function deleteCompanyContactInfo(user_id, company_id, id) {
  return new Promise((resolve) => {
    if (!idIsValid(user_id)) {
      resolve({ statusCode: 500, data: "user id not valid" });
      return;
    }

    if (!idIsValid(company_id)) {
      resolve({ statusCode: 500, data: "company id not valid" });
      return;
    }

    if (!idIsValid(id)) {
      resolve({ statusCode: 500, data: "id not valid" });
      return;
    }

    database
      .run(
        `
        DELETE FROM company_contact_info
        WHERE user_id = '${user_id}'
          AND company_id = '${company_id}'
          AND id = '${id}';
        `
      )
      .then((result) => {
        resolve({ statusCode: 200, data: result });
        return;
      })
      .catch(() => {
        resolve({
          statusCode: 400,
          data: "failed to delete company contact info",
        });
        return;
      });
  });
}

////////////////////////////////////////////////////////////////////////////////
// Company Notes

function getCompanyNotes(user_id, company_id) {
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
        SELECT * FROM company_note
        WHERE user_id = '${user_id}'
          AND company_id = '${company_id}';
        `
      )
      .then((result) => {
        resolve({ statusCode: 200, data: result });
        return;
      })
      .catch(() => {
        resolve({ statusCode: 400, data: "failed to get company notes" });
        return;
      });
  });
}

////////////////////////////////////////////////////////////////////////////////

module.exports.getUserId = getUserId;

module.exports.getCompanies = getCompanies;
module.exports.getCompany = getCompany;
module.exports.updateCompany = updateCompany;
module.exports.createCompany = createCompany;
module.exports.deleteCompany = deleteCompany;

module.exports.getCompanyContactInfo = getCompanyContactInfo;
module.exports.updateCompanyContactInfo = updateCompanyContactInfo;
module.exports.createCompanyContactInfo = createCompanyContactInfo;
module.exports.deleteCompanyContactInfo = deleteCompanyContactInfo;

module.exports.getCompanyNotes = getCompanyNotes;
