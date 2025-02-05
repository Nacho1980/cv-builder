declare global {
  namespace Cypress {
    interface Chainable {
      setReduxState(state: any): Chainable<void>;
    }
  }
}

Cypress.Commands.add("setReduxState", (state) => {
  cy.window().then((win) => {
    if (win.store) {
      win.store.dispatch({ type: "SET_STATE", payload: state });
    } else {
      throw new Error("Redux store is not attached to the window object.");
    }
  });
});
