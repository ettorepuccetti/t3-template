describe("test", () => {
  it("login", () => {
    cy.loginToAuth0(
      Cypress.env("DEMO_MAIL") as string,
      Cypress.env("DEMO_PASSWORD") as string,
    );
    cy.visit("/");
    
  });
});
