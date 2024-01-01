/// <reference types="cypress" />
import "./commands";

declare global {
  namespace Cypress {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    interface Chainable<Subject> {
      loginToAuth0(username: string, password: string): void;
    }
  }
}
