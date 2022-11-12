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

// Validate login
router.post("/api/crm/login", (request, response) => {
  main
    .getUserId(request.body)
    .then((user_id) => {
      authentication.setAuthentication(response, userCookieName, user_id);
      returnSuccess(response, user_id);
    })
    .catch(() => {
      rejectUnauthenticated(response, userCookieName);
    });
});

////////////////////////////////////////////////////////////////////////////////
// Companies

// Get all companies
router.get("/api/crm/companies", (request, response) => {
  const user_id = authentication.getAuthentication(request, userCookieName);
  if (user_id) {
    returnPromiseResponse(response, main.getCompanies(user_id));
  } else {
    rejectUnauthenticated(response, userCookieName);
  }
});

////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////

module.exports = router;
