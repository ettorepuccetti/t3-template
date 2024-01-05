describe("not logged user", () => {
  it("check header", () => {
    cy.visit("/");
    cy.getByDataTest("login-button").should("exist");
    cy.getByDataTest("logout-button").should("not.exist");
    cy.getByDataTest("login-welcome").should("not.exist");
  });
  it("add task disabled and hint message visible", () => {
    cy.visit("/");
    cy.getByDataTest("add-task-input").should("be.disabled");
    cy.getByDataTest("add-task-button").should("be.disabled");
    cy.getByDataTest("login-hint-message").should("be.visible");
  });
});

describe("logged user", () => {
  beforeEach("clear tasks", () => {
    cy.task("db:clearTasks");
  });

  beforeEach("login", () => {
    cy.intercept("GET", "/api/trpc/task.getAll?**").as("getTasks");
    cy.loginToAuth0(
      Cypress.env("DEMO_MAIL") as string,
      Cypress.env("DEMO_PASSWORD") as string,
    );
    cy.visit("/");
    cy.wait("@getTasks");
  });

  it("check header", () => {
    cy.getByDataTest("login-welcome").should("contain.text", "Welcome demo");
    cy.getByDataTest("login-button").should("not.exist");
    cy.getByDataTest("logout-button").should("exist");
  });

  it("add task", () => {
    cy.getByDataTest("add-task-input").type("test task");
    cy.getByDataTest("add-task-button").click();
    cy.getByDataTest("task-element").should("have.length", 1);
    cy.getByDataTest("task-element")
      .first()
      .should("contain.text", "1. test task");
  });

  it("delete task", () => {
    cy.getByDataTest("add-task-input").type("test task");
    cy.getByDataTest("add-task-button").click();
    cy.getByDataTest("delete-task-button").should("have.length", 1);
    cy.getByDataTest("delete-task-button").first().click();
    cy.getByDataTest("task-element").should("have.length", 0);
  });
});
