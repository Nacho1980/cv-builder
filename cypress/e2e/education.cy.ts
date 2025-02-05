/// <reference types="cypress" />
describe("Store Exposure Test", () => {
  it("should expose Redux store to window", () => {
    cy.visit("/");
    cy.window().should("have.property", "store"); // Check store exists
  });
});
describe("Education tests", () => {
  beforeEach(() => {
    const preloadedState = {
      personalData: {
        fields: {
          fullName: "John Doe",
          email: "john@example.com",
          city: "New York",
          country: "USA",
          telephone: "1234567890",
          web: "https://johndoe.com",
        },
        isValid: true,
      },
    };
    cy.visit("/");
    cy.setReduxState(preloadedState);
    cy.visit("/education"); // Navigate directly to the education page
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
