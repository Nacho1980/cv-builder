/// <reference types="cypress" />
describe("Personal Info Form Tests", () => {
  beforeEach(() => {
    // Visit the form page before each test
    cy.visit("/");
    cy.contains("CV Builder");

    // Click the Start button to navigate to the Personal Info Form
    cy.get('button[name="nextStepBtn"]').click();

    // Confirm navigation to the Personal Info Form
    cy.contains("Contact data").should("be.visible");
  });

  it("should render all form fields", () => {
    cy.get('input[name="fullName"]').should("exist");
    cy.get('input[name="emailAddress"]').should("exist");
    cy.get('input[name="city"]').should("exist");
    cy.get('input[name="telephone"]').should("exist");
    cy.get('input[name="web"]').should("exist");
    cy.get('[data-testid="country-selector"]').should("exist"); // Assuming CountrySelector uses a test ID
  });

  it("should validate required fields and display error messages", () => {
    // Trigger blur without entering any value
    cy.get('input[name="fullName"]').focus().blur();
    cy.get('input[name="fullName"]')
      .closest(".MuiInputBase-root")
      .should("have.class", "Mui-error");

    cy.get('input[name="emailAddress"]').focus().blur();
    cy.get('input[name="emailAddress"]')
      .closest(".MuiInputBase-root")
      .should("have.class", "Mui-error");

    cy.get('input[name="city"]').focus().blur();
    cy.get('input[name="city"]')
      .closest(".MuiInputBase-root")
      .should("have.class", "Mui-error");
  });

  it("should validate email format", () => {
    cy.get('input[name="emailAddress"]').type("invalid-email").blur();
    cy.get('input[name="emailAddress"]')
      .closest(".MuiInputBase-root")
      .should("have.class", "Mui-error");
  });

  it("should update fields when typing", () => {
    cy.fixture("userData").then((userData: any) => {
      cy.get('input[name="fullName"]').type(userData.fullName);
      cy.get('input[name="emailAddress"]').type(userData.email);
      cy.get('input[name="city"]').type(userData.city);
      cy.get('input[name="telephone"]').type(userData.telephone);
      cy.get('input[name="web"]').type(userData.web);

      // Verify that inputs are updated
      cy.get('input[name="fullName"]').should("have.value", userData.fullName);
      cy.get('input[name="emailAddress"]').should("have.value", userData.email);
      cy.get('input[name="city"]').should("have.value", userData.city);
      cy.get('input[name="telephone"]').should(
        "have.value",
        userData.telephone
      );
      cy.get('input[name="web"]').should("have.value", userData.web);
    });
  });

  it("should update country when selecting from the CountrySelector", () => {
    // Open the dropdown by clicking on the select control
    cy.get('[name="country-select"]')
      .parent()
      .find(".MuiSelect-select")
      .click({ force: true });

    // Wait for the dropdown to be visible
    cy.get(".MuiPaper-root").should("be.visible");

    // Find the country by its code and click it
    cy.get(".MuiPaper-root") // Get the parent div
      .find('li[data-value="ES"]') // Find the li element with data-value="AR" inside the parent
      .click(); // Click on the found li element

    // Verify that the country value is updated (check the country code or value)
    cy.get('[data-testid="country-selector"]').should("have.value", "ES");
  });
});
