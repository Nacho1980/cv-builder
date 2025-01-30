/// <reference types="cypress" />
describe("Education tests", () => {
  beforeEach(() => {
    // Visit the form page before each test
    cy.visit("/"); // Adjust to your route for this form
    cy.contains("Welcome to the CV Builder");

    // Handle ResizeObserver errors that are common with Material UI
    cy.on("uncaught:exception", (err) => {
      if (err.message.includes("ResizeObserver")) {
        return false;
      }
    });

    // Click the Start button to navigate to the Personal Info Form
    //cy.contains("START").click();
    cy.contains("button", "START").click();

    // Confirm navigation to the Personal Info Form
    cy.contains("Contact data").should("be.visible");

    cy.fixture("userData").then((userData: any) => {
      cy.get('input[name="fullName"]').type(userData.fullName);
      cy.get('input[name="emailAddress"]').type(userData.email);
      cy.get('input[name="city"]').type(userData.city);
      cy.get('input[name="telephone"]').type(userData.telephone);
      cy.get('input[name="web"]').type(userData.web);

      cy.get('[name="country-select"]')
        .parent()
        .find(".MuiSelect-select")
        .click({ force: true });
      cy.get(".MuiPaper-root").should("be.visible");
      cy.get(".MuiPaper-root").find('li[data-value="ES"]').click();

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

    cy.get('[data-testid="ArrowForwardIosIcon"]').click({ force: true });
  });

  it("should render all form fields", () => {
    cy.get('input[name="center"]').should("exist");
    cy.get('input[name="degree"]').should("exist");
    cy.get('input[name="date"]').should("exist"); // Assuming CountrySelector uses a test ID
  });

  it("should update fields when typing", () => {
    cy.fixture("education").then((educationData: any) => {
      educationData.forEach((education: any, index: number) => {
        cy.get('input[name="center"]').type(education.center);
        cy.get('input[name="degree"]').type(education.degree);
        cy.get('input[name="date"]').click({ force: true });
        cy.get('button[name="previousYear"]').should("exist");
        if (index === 0) {
          cy.get('button[name="previousYear"]').click();
          cy.get('button[name="previousYear"]').click(); //2023
          cy.get('button[name="month06"]').click(); //june
        } else if (index === 1) {
          cy.get('button[name="nextYear"]').click(); //2024
          cy.get('button[name="month09"]').click(); //september
        }

        // Verify that inputs are updated
        cy.get('input[name="center"]').should("have.value", education.center);
        cy.get('input[name="degree"]').should("have.value", education.degree);
        cy.get('input[name="date"]').should("have.value", education.date);

        cy.get('button[name="addEducation"]').click(); //add degree
      });

      cy.get('[data-testid="list-of-education"]')
        .find("li")
        .should("have.length", 2);
    });
  });
});
