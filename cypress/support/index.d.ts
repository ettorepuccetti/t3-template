/// <reference types="cypress" />
import "./commands";

declare global {
  namespace Cypress {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    interface Chainable<Subject> {
      /**
       * Login to Auth0 with the given username and password
       * @param username username to login with
       * @param password password to login with
       */
      loginToAuth0(username: string, password: string): void;

      /**
       * Logout to the application using logout callback.
       * It store the session using cypress so that it can switch from logged out to logged in state without having to login again
       */
      logout(): void;

      /**
       * Get an element by its data-test attribute. Additional cypress commands can be chained to the returned element
       * @param dataTest data-test attribute of the element to get
       */
      getByDataTest(dataTest: string): Chainable<JQuery<HTMLElement>>;
    }
  }
}
