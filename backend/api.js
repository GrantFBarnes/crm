const express = require("express");

const authentication = require("../../home-page/backend/authentication.js");
const main = require("./main.js");

const managerCookieName = "gfb_manager_token";
const userCookieName = "gfb_user_token";

const router = express.Router();

function returnSuccess(response) {
  response.writeHead(200, { "Content-Type": "application/json" });
  response.write(JSON.stringify({ status: "ok" }));
  response.end();
}

function rejectUnauthenticated(response, cookieName) {
  authentication.removeAuthentication(response, cookieName);
  response.writeHead(401, { "Content-Type": "application/json" });
  response.write(JSON.stringify({ status: "not authenticated" }));
  response.end();
}

function returnResponse(response, result) {
  response.writeHead(result.statusCode, { "Content-Type": "application/json" });
  response.write(JSON.stringify(result.data));
  response.end();
}

function returnPromiseResponse(response, promise) {
  promise
    .then((result) => {
      response.writeHead(result.statusCode, {
        "Content-Type": "application/json",
      });
      response.write(JSON.stringify(result.data));
      response.end();
    })
    .catch(() => {
      response.writeHead(500, { "Content-Type": "application/json" });
      response.write("error");
      response.end();
    });
}

////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////
// APIs defined here

////////////////////////////////////////////////////////////////////////////////
// Users

// User login
router.post("/api/crm/user/login", (request, response) => {
  main
    .getUserId(request.body)
    .then((user_id) => {
      authentication.setAuthentication(response, userCookieName, user_id);
      returnSuccess(response);
    })
    .catch(() => {
      rejectUnauthenticated(response, userCookieName);
    });
});

// User logout
router.post("/api/crm/user/logout", (request, response) => {
  authentication.removeAuthentication(response, userCookieName);
  returnSuccess(response);
});

// Get user name
router.get("/api/crm/user/name", (request, response) => {
  const user_id = authentication.getAuthentication(request, userCookieName);
  if (user_id) {
    returnPromiseResponse(response, main.getUserName(user_id));
  } else {
    rejectUnauthenticated(response, userCookieName);
  }
});

// Get if user is authenticated
router.get("/api/crm/user/authenticated", (request, response) => {
  const user_id = authentication.getAuthentication(request, userCookieName);
  if (user_id) {
    // refresh cookie to reset timeout
    authentication.setAuthentication(response, userCookieName, user_id);
    returnSuccess(response);
  } else {
    rejectUnauthenticated(response, userCookieName);
  }
});

// Set user password
router.post("/api/crm/user/password", (request, response) => {
  const user_id = authentication.getAuthentication(request, userCookieName);
  if (user_id) {
    returnPromiseResponse(
      response,
      main.setUserPassword(user_id, request.body)
    );
  } else {
    rejectUnauthenticated(response, userCookieName);
  }
});

////////////////////////////////////////////////////////////////////////////////
// Generic Tables

// Get all rows from table
router.get("/api/crm/table/:table", (request, response) => {
  const user_id = authentication.getAuthentication(request, userCookieName);
  if (user_id) {
    returnPromiseResponse(
      response,
      main.getTableRows(user_id, request.params.table)
    );
  } else {
    rejectUnauthenticated(response, userCookieName);
  }
});

// Get top view count rows from table
router.get("/api/crm/table/:table/top", (request, response) => {
  const user_id = authentication.getAuthentication(request, userCookieName);
  if (user_id) {
    returnPromiseResponse(
      response,
      main.getTableTopRows(user_id, request.params.table)
    );
  } else {
    rejectUnauthenticated(response, userCookieName);
  }
});

// Get rows from table with given foreign key
router.get("/api/crm/table/:table/fk/:fk_name/:fk_id", (request, response) => {
  const user_id = authentication.getAuthentication(request, userCookieName);
  if (user_id) {
    returnPromiseResponse(
      response,
      main.getTableRowsWithForeignKey(
        user_id,
        request.params.table,
        request.params.fk_name,
        request.params.fk_id
      )
    );
  } else {
    rejectUnauthenticated(response, userCookieName);
  }
});

// Get row from table
router.get("/api/crm/table/:table/id/:id", (request, response) => {
  const user_id = authentication.getAuthentication(request, userCookieName);
  if (user_id) {
    returnPromiseResponse(
      response,
      main.getTableRow(user_id, request.params.table, request.params.id)
    );
  } else {
    rejectUnauthenticated(response, userCookieName);
  }
});

// Delete row from table
router.delete("/api/crm/table/:table/id/:id", (request, response) => {
  const user_id = authentication.getAuthentication(request, userCookieName);
  if (user_id) {
    returnPromiseResponse(
      response,
      main.deleteTableRow(user_id, request.params.table, request.params.id)
    );
  } else {
    rejectUnauthenticated(response, userCookieName);
  }
});

// Create row in table
router.post("/api/crm/table/:table", (request, response) => {
  const user_id = authentication.getAuthentication(request, userCookieName);
  if (user_id) {
    returnPromiseResponse(
      response,
      main.createTableRow(user_id, request.params.table, request.body)
    );
  } else {
    rejectUnauthenticated(response, userCookieName);
  }
});

// Update row in table
router.put("/api/crm/table/:table", (request, response) => {
  const user_id = authentication.getAuthentication(request, userCookieName);
  if (user_id) {
    returnPromiseResponse(
      response,
      main.updateTableRow(user_id, request.params.table, request.body)
    );
  } else {
    rejectUnauthenticated(response, userCookieName);
  }
});

////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////

module.exports = router;
