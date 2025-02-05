/// <reference types="cypress" />

declare namespace Cypress {
  interface Chainable {
    setReduxState(state: any): Chainable<void>;
  }
}
