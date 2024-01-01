export {};

Cypress.Commands.add("loginToAuth0", (username: string, password: string) => {
  const log = Cypress.log({
    displayName: "AUTH0 LOGIN",
    message: [`🔐 Authenticating | ${username}`],
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    autoEnd: false,
  });
  log.snapshot("before");

  const args = { username, password };
  cy.session(
    `${username}`,
    () => {
      cy.visit("/api/auth/signin/auth0");
      cy.get("button").click();
      // Login on Auth0.
      cy.origin(
        Cypress.env("AUTH0_ISSUER") as string,
        { args },
        ({ username, password }) => {
          cy.get("input#username").type(username);
          cy.get("input#password").type(password);
          cy.get("button[value=default]")
            .filter("[data-action-button-primary='true']")
            .click();
        },
      );
      // Ensure Auth0 has redirected us back to the RWA.
      cy.url().should("equal", "http://localhost:3000/");
    },
    {
      validate: () => {
        // Validate presence of access token in localStorage.
        cy.request("/api/auth/session")
          .its("body")
          .its("user")
          .should("include", { email: username });
      },
    },
  );

  log.snapshot("after");
  log.end();
});

Cypress.Commands.add("logout", () => {
  cy.session(
    "auth0-logout",
    () => {
      cy.visit("/api/auth/signout/");
      cy.get("#submitButton").click();
      cy.url().should("equal", "http://localhost:3000/");
    },
    {
      validate: () => {
        cy.request("/api/auth/session").its("body").should("be.empty");
      },
    },
  );
});

Cypress.Commands.add("getByDataTest", (dataTest: string) => {
  return cy.get(`[data-test="${dataTest}"]`);
});