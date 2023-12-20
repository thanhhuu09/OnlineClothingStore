// userRoutes.test.js
const chai = require("chai");
const chaiHttp = require("chai-http");
const request = require("supertest");
const app = require("../index");

const expect = chai.expect;
chai.use(chaiHttp);

const loginAndGetToken = async (email, password) => {
  const loginResponse = await request(app)
    .post("/api/v1/auth/login")
    .send({ email, password });
  return {
    token: loginResponse.body.accessToken,
    userId: loginResponse.body.user._id,
  };
};
// set up account for test user and admin
const adminAccount = {
  email: "admin@gmail.com",
  password: "admin123",
};
const userAccount = [
  {
    firstName: "Mai",
    lastName: "Han",
    email: "hanto@gmail.com",
    password: "manhan123",
  },
  {
    firstName: "Hong",
    lastName: "Nguyen",
    email: "hong@gmail.com",
    password: "hong123",
  },
];
// Test POST /api/v1/auth/register route
before(async () => {
  // Register user account
  await request(app).post("/api/v1/auth/register").send(userAccount[0]);
  await request(app).post("/api/v1/auth/register").send(userAccount[1]);
});

let adminAuthToken, adminUserId;
let userAuthToken1, userUserId1;
let userAuthToken2, userUserId2;

// Login with admin permissions
before(async () => {
  // Obtain auth token before running tests
  const adminCredentials = await loginAndGetToken(
    adminAccount.email,
    adminAccount.password
  );
  adminAuthToken = adminCredentials.token;
  adminUserId = adminCredentials.userId;
});

// Login with user permissions
before(async () => {
  // Obtain auth token before running tests
  // user 1
  const userCredentials = await loginAndGetToken(
    userAccount[0].email,
    userAccount[0].password
  );
  userAuthToken1 = userCredentials.token;
  userUserId1 = userCredentials.userId;

  // user 2
  const userCredentials2 = await loginAndGetToken(
    userAccount[1].email,
    userAccount[1].password
  );
  userAuthToken2 = userCredentials2.token;
  userUserId2 = userCredentials2.userId;
});

describe("User Routes", () => {
  // Test GET USER BY ID route
  // Admin can get any account, but user can only get their own account
  it("GET /api/v1/users/:id", async () => {
    // Admin can get any account
    const adminRes = await request(app)
      .get("/api/v1/users/" + userUserId1) // Make sure to include the specific user ID
      .set("Authorization", "Bearer " + adminAuthToken);
    expect(adminRes).to.have.status(200);
    expect(adminRes.body).to.be.an("object");

    // User can get their own account
    const userRes = await request(app)
      .get("/api/v1/users/" + userUserId1) // Make sure to include the specific user ID
      .set("Authorization", "Bearer " + userAuthToken1);
    expect(userRes).to.have.status(200);
    expect(userRes.body).to.be.an("object");
  });

  // Test GET ALL USERS route
  // Only admin can get all users
  it("GET /api/v1/users", async () => {
    // Test with admin permissions
    const adminRes = await request(app)
      .get("/api/v1/users")
      .set("Authorization", "Bearer " + adminAuthToken);
    expect(adminRes).to.have.status(200);
    expect(adminRes.body).to.be.an("object");

    // Test with user permissions
    const userRes = await request(app)
      .get("/api/v1/users")
      .set("Authorization", "Bearer " + userAuthToken1);
    expect(userRes).to.have.status(403);
    expect(userRes.body).to.be.an("object");
  });

  // Test UPDATE USER route
  // Admin can update any user, but user can only update their own user
  it("PUT /api/v1/users/:id", async () => {
    // Admin can update any user
    const adminRes = await request(app)
      .put("/api/v1/users/" + adminUserId)
      .set("Authorization", "Bearer " + adminAuthToken)
      .send({
        firstName: "Admin",
        lastName: "Huu",
      });
    expect(adminRes).to.have.status(200);
    expect(adminRes.body).to.be.an("object");

    // User can update their own user
    const userRes = await request(app)
      .put("/api/v1/users/" + userUserId1)
      .set("Authorization", "Bearer " + userAuthToken1)
      .send({
        firstName: "Han",
        lastName: "Heo",
      });
    expect(userRes).to.have.status(200);
    expect(userRes.body).to.be.an("object");
  });

  // Change password
  // Admin can change any user's password, but user can only change their own password
  it("PUT /api/v1/users/:id/password", async () => {
    // Test with admin permissions
    const adminRes = await request(app)
      .put("/api/v1/users/" + userUserId1 + "/password")
      .set("Authorization", "Bearer " + adminAuthToken)
      .send({
        newPassword: "1234567",
        oldPassword: userAccount[0].password,
      });
    expect(adminRes).to.have.status(200);
    expect(adminRes.body).to.be.an("object");

    // Test with user permissions
    const userRes = await request(app)
      .put("/api/v1/users/" + userUserId2 + "/password")
      .set("Authorization", "Bearer " + userAuthToken2)
      .send({ newPassword: "1234567", oldPassword: userAccount[1].password });
    expect(userRes).to.have.status(200);
    expect(userRes.body).to.be.an("object");
  });

  // Delete user route
  // Admin can delete any user, but user can only delete their own user
  it("DELETE /api/v1/users/:id", async () => {
    // Test with admin permissions
    const adminRes = await request(app)
      .delete("/api/v1/users/" + userUserId1)
      .set("Authorization", "Bearer " + adminAuthToken);
    expect(adminRes).to.have.status(200);
    expect(adminRes.body).to.be.an("object");

    // Test with user permissions
    const userRes = await request(app)
      .delete("/api/v1/users/" + userUserId2)
      .set("Authorization", "Bearer " + userAuthToken2);
    expect(userRes).to.have.status(200);
    expect(userRes.body).to.be.an("object");
  });
});
