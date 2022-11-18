const mysql = require("mysql");
const { v4: uuidv4 } = require("uuid");

const connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: process.env.SQL_TU_PASSWORD,
  database: "crm",
});

const id_regex =
  /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/;

const table_columns = {
  company: ["name"],
  person: ["first_name", "last_name"],
  company_phone: ["phone"],
  person_phone: ["phone"],
  company_email: ["email"],
  person_email: ["email"],
  company_address: ["city", "state", "zip"],
  person_address: ["city", "state", "zip"],
  company_note: ["note"],
  person_note: ["note"],
  company_contact: ["date", "time", "description"],
  person_contact: ["date", "time", "description"],
};

for (let table in table_columns) {
  if (table != "company" && table != "person") {
    table_columns[table].unshift("parent_id");
  }
  table_columns[table].unshift("user_id");
  table_columns[table].unshift("id");
  table_columns[table].push("date_added");
  table_columns[table].push("date_modified");
}

////////////////////////////////////////////////////////////////////////////////
// Common

function idIsValid(id) {
  if (!id || !id_regex.test(id)) {
    return false;
  }
  return true;
}

function tableIsValid(table) {
  if (table_columns[table]) return true;
  return false;
}

function dataIsValid(table, data) {
  if (!data || !data.id || !id_regex.test(data.id)) {
    return false;
  }

  let columns = table_columns[table];
  if (!columns) return false;

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

function execute(command) {
  return new Promise((resolve, reject) => {
    connection.query(command, (err, res) => {
      if (err) {
        reject(err);
        return;
      }
      resolve(res);
    });
  });
}

////////////////////////////////////////////////////////////////////////////////
// Users

function getUserId(data) {
  return new Promise((resolve, reject) => {
    if (!data || !data.username || !data.password) {
      reject("data not valid");
      return;
    }

    execute(`
      SELECT id FROM user
      WHERE name = '${data.username}'
        AND password = '${data.password}';
        `)
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
// Generic Tables

function getTableRows(user_id, table) {
  return new Promise((resolve) => {
    if (!idIsValid(user_id)) {
      resolve({ statusCode: 500, data: "user id not valid" });
      return;
    }

    if (!tableIsValid(table)) {
      resolve({ statusCode: 500, data: "table not valid" });
      return;
    }

    execute(`
      SELECT * FROM ${table}
      WHERE user_id = '${user_id}';
        `)
      .then((result) => {
        resolve({ statusCode: 200, data: result });
        return;
      })
      .catch(() => {
        resolve({ statusCode: 400, data: "failed to get table rows" });
        return;
      });
  });
}

function getTableRowsWithParent(user_id, table, parent_id) {
  return new Promise((resolve) => {
    if (!idIsValid(user_id)) {
      resolve({ statusCode: 500, data: "user id not valid" });
      return;
    }

    if (!tableIsValid(table)) {
      resolve({ statusCode: 500, data: "table not valid" });
      return;
    }

    if (!idIsValid(parent_id)) {
      resolve({ statusCode: 500, data: "parent id not valid" });
      return;
    }

    execute(`
      SELECT * FROM ${table}
      WHERE user_id = '${user_id}'
        AND parent_id = '${parent_id}';
        `)
      .then((result) => {
        resolve({ statusCode: 200, data: result });
        return;
      })
      .catch(() => {
        resolve({
          statusCode: 400,
          data: "failed to get table rows with parent",
        });
        return;
      });
  });
}

function getTableRow(user_id, table, id) {
  return new Promise((resolve) => {
    if (!idIsValid(user_id)) {
      resolve({ statusCode: 500, data: "user id not valid" });
      return;
    }

    if (!tableIsValid(table)) {
      resolve({ statusCode: 500, data: "table not valid" });
      return;
    }

    if (!idIsValid(id)) {
      resolve({ statusCode: 500, data: "id not valid" });
      return;
    }

    execute(`
      SELECT * FROM ${table}
      WHERE user_id = '${user_id}'
        AND id = '${id}';
        `)
      .then((result) => {
        if (result.length) {
          resolve({ statusCode: 200, data: result[0] });
          return;
        }
        resolve({ statusCode: 400, data: "id not found" });
        return;
      })
      .catch(() => {
        resolve({ statusCode: 400, data: "failed to get table row" });
        return;
      });
  });
}

function deleteTableRow(user_id, table, id) {
  return new Promise((resolve) => {
    if (!idIsValid(user_id)) {
      resolve({ statusCode: 500, data: "user id not valid" });
      return;
    }

    if (!tableIsValid(table)) {
      resolve({ statusCode: 500, data: "table not valid" });
      return;
    }

    if (!idIsValid(id)) {
      resolve({ statusCode: 500, data: "id not valid" });
      return;
    }

    execute(`
      DELETE FROM ${table}
      WHERE user_id = '${user_id}'
        AND id = '${id}';
        `)
      .then(() => {
        resolve({ statusCode: 200, data: id });
        return;
      })
      .catch(() => {
        resolve({ statusCode: 400, data: "failed to delete table row" });
        return;
      });
  });
}

function createTableRow(user_id, table, data) {
  return new Promise((resolve) => {
    if (!idIsValid(user_id)) {
      resolve({ statusCode: 500, data: "user id not valid" });
      return;
    }

    if (!tableIsValid(table)) {
      resolve({ statusCode: 500, data: "table not valid" });
      return;
    }

    const new_id = uuidv4();
    let sql = `INSERT INTO ${table} (`;
    for (let column of table_columns[table]) {
      sql += column + ", ";
    }
    sql = sql.slice(0, -2);
    sql += ") VALUES (";
    for (let column of table_columns[table]) {
      switch (column) {
        case "id":
          sql += `'${new_id}', `;
          break;

        case "user_id":
          sql += `'${user_id}', `;
          break;

        case "parent_id":
          if (!idIsValid(data.parent_id)) {
            resolve({ statusCode: 500, data: "parent id not valid" });
            return;
          }
          sql += `'${data.parent_id}', `;
          break;

        case "date_added":
        case "date_modified":
          sql += `CURRENT_DATE(), `;
          break;

        default:
          sql += "'', ";
          break;
      }
    }
    sql = sql.slice(0, -2);
    sql += ")";

    execute(sql)
      .then(() => {
        resolve({ statusCode: 200, data: new_id });
        return;
      })
      .catch(() => {
        resolve({ statusCode: 400, data: "failed to create table row" });
        return;
      });
  });
}

function updateTableRow(user_id, table, data) {
  return new Promise((resolve) => {
    if (!idIsValid(user_id)) {
      resolve({ statusCode: 500, data: "user id not valid" });
      return;
    }

    if (!tableIsValid(table)) {
      resolve({ statusCode: 500, data: "table not valid" });
      return;
    }

    if (!dataIsValid(table, data)) {
      resolve({ statusCode: 500, data: "data not valid" });
      return;
    }

    if (user_id != data.user_id) {
      resolve({ statusCode: 401, data: "user id does not match" });
      return;
    }

    let sql = `UPDATE ${table} SET `;
    for (let column of table_columns[table]) {
      switch (column) {
        case "id":
        case "user_id":
        case "parent_id":
        case "date_added":
          break;

        case "date_modified":
          sql += `CURRENT_DATE(), `;
          break;

        default:
          sql += `${column} = '${data[column]}', `;
          break;
      }
    }
    sql = sql.slice(0, -2);
    sql += ` WHERE user_id = '${user_id}'
              AND id = '${data.id}';`;

    execute(sql)
      .then((result) => {
        resolve({ statusCode: 200, data: result });
        return;
      })
      .catch(() => {
        resolve({ statusCode: 400, data: "failed to update table row" });
        return;
      });
  });
}

////////////////////////////////////////////////////////////////////////////////

module.exports.getUserId = getUserId;

module.exports.getTableRows = getTableRows;
module.exports.getTableRowsWithParent = getTableRowsWithParent;
module.exports.getTableRow = getTableRow;
module.exports.deleteTableRow = deleteTableRow;
module.exports.createTableRow = createTableRow;
module.exports.updateTableRow = updateTableRow;
