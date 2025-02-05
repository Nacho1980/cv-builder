describe("Custom Command Loading Test", () => {
  it("should log custom command loading", () => {
    cy.visit("/");

    // Check if custom command is recognized
    expect(typeof (cy as any).setReduxState).to.equal("function");

    // Call custom command with minimal data
    cy.setReduxState({ testKey: "testValue" });
  });
});
