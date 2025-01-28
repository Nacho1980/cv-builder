describe("Navigation", () => {
  it("should navigate through all steps/pages", () => {
    cy.visit("/");

    // Verify the user lands on the personal data page
    cy.contains("Personal Data").should("exist");

    // Fill in personal data and move to the next step
    cy.get('input[name="fullName"]').type("John Doe");
    cy.get('input[name="email"]').type("john.doe@example.com");
    cy.contains("Next").click();

    // Verify navigation to Education step
    cy.contains("Education").should("exist");
    cy.contains("Next").click();

    // Verify navigation to Experience step
    cy.contains("Experience").should("exist");
    cy.contains("Next").click();

    // Verify navigation to Summary/Skills/Languages step
    cy.contains("Summary").should("exist");
    cy.contains("Next").click();

    // Verify navigation to Template Selection step
    cy.contains("Select Template").should("exist");
  });
});
