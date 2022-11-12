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
router.post("/api/crm/login", (request, response) => {
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
router.post("/api/crm/logout", (request, response) => {
  authentication.removeAuthentication(response, userCookieName);
  returnSuccess(response);
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

// Get company
router.get("/api/crm/company/:company_id", (request, response) => {
  const user_id = authentication.getAuthentication(request, userCookieName);
  if (user_id) {
    returnPromiseResponse(
      response,
      main.getCompany(user_id, request.params.company_id)
    );
  } else {
    rejectUnauthenticated(response, userCookieName);
  }
});

////////////////////////////////////////////////////////////////////////////////
// Company Contact Info

// Get company contact info
router.get("/api/crm/company/:company_id/contact", (request, response) => {
  const user_id = authentication.getAuthentication(request, userCookieName);
  if (user_id) {
    returnPromiseResponse(
      response,
      main.getCompanyContactInfo(user_id, request.params.company_id)
    );
  } else {
    rejectUnauthenticated(response, userCookieName);
  }
});

// Update company contact info
router.put("/api/crm/company/:company_id/contact", (request, response) => {
  const user_id = authentication.getAuthentication(request, userCookieName);
  if (user_id) {
    returnPromiseResponse(
      response,
      main.updateCompanyContactInfo(
        user_id,
        request.params.company_id,
        request.body
      )
    );
  } else {
    rejectUnauthenticated(response, userCookieName);
  }
});

// Create company contact info
router.post("/api/crm/company/:company_id/contact", (request, response) => {
  const user_id = authentication.getAuthentication(request, userCookieName);
  if (user_id) {
    returnPromiseResponse(
      response,
      main.createCompanyContactInfo(
        user_id,
        request.params.company_id,
        request.body
      )
    );
  } else {
    rejectUnauthenticated(response, userCookieName);
  }
});

// Delete company contact info
router.delete(
  "/api/crm/company/:company_id/contact/:id",
  (request, response) => {
    const user_id = authentication.getAuthentication(request, userCookieName);
    if (user_id) {
      returnPromiseResponse(
        response,
        main.deleteCompanyContactInfo(
          user_id,
          request.params.company_id,
          request.params.id
        )
      );
    } else {
      rejectUnauthenticated(response, userCookieName);
    }
  }
);

////////////////////////////////////////////////////////////////////////////////
// Company Notes

// Get company notes
router.get("/api/crm/company/:company_id/notes", (request, response) => {
  const user_id = authentication.getAuthentication(request, userCookieName);
  if (user_id) {
    returnPromiseResponse(
      response,
      main.getCompanyNotes(user_id, request.params.company_id)
    );
  } else {
    rejectUnauthenticated(response, userCookieName);
  }
});

////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////

module.exports = router;
