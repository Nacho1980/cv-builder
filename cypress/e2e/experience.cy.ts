/// <reference types="cypress" />
describe("Experience tests", () => {
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
      education: {
        items: [{ year: "06-2020", center: "MIT", degree: "Computer Science" }],
      },
    };

    cy.visit("/");
    cy.setReduxState(preloadedState);
    cy.visit("/experience"); // Navigate directly to the page
  });

  it("Should update fields when typing", () => {
    cy.get('input[name="company"]').should("exist");
    cy.get('input[name="position"]').should("exist");
    cy.get('textarea[name="summary"]').should("exist");
    cy.fixture("experience").then((experienceData: any) => {
      experienceData.forEach((experience: any, index: number) => {
        cy.get('input[name="company"]').type(experience.company);
        cy.get('input[name="position"]').type(experience.position);
        cy.get('textarea[name="summary"]').type(experience.summary);
        cy.get('input[name="startDate"]').click({ force: true });
        cy.get('button[name="previousYear"]').should("exist");
        if (index === 0) {
          cy.get('button[name="previousYear"]').first().click();
          cy.get('button[name="previousYear"]').first().click(); //2023
          cy.get('button[name="month06"]').first().click(); //june
        } else if (index === 1) {
          cy.get('button[name="nextYear"]').first().click(); //2024
          cy.get('button[name="month11"]').first().click(); //november
        }
        cy.get('input[name="endDate"]').click({ force: true });
        cy.wait(500);
        cy.get('button[name="previousYear"]').should("exist");
        if (index === 0) {
          cy.get('button[name="previousYear"]').first().click(); //2024
          cy.get('button[name="month10"]').first().click(); //october
        } else if (index === 1) {
          cy.get('button[name="nextYear"]').first().click(); //2025
          cy.get('button[name="month01"]').first().click(); //january
        }

        // Verify that inputs are updated
        cy.get('input[name="company"]').should(
          "have.value",
          experience.company
        );
        cy.get('input[name="position"]').should(
          "have.value",
          experience.position
        );
        cy.get('textarea[name="summary"]').should(
          "have.value",
          experience.summary
        );
        cy.get('input[name="startDate"]').should(
          "have.value",
          experience.startDate
        );
        cy.get('input[name="endDate"]').should(
          "have.value",
          experience.endDate
        );

        cy.get('button[name="addExperience"]').click(); //add position
      });

      cy.get('[data-testid="list-of-experience"]')
        .find("li")
        .should("have.length", 2);
    });
  });
});
