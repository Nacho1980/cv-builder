/// <reference types="cypress" />
import { languageLevels } from "../../src/constants";

describe("Additional sections", () => {
  beforeEach(() => {
    // Visit the form page before each test
    cy.visit("/"); // Adjust to your route for this form
    cy.contains("Welcome to the CV Builder");

    // Handle ResizeObserver errors that are common with Material UI
    cy.on("uncaught:exception", (err: { message: string | string[] }) => {
      if (err.message.includes("ResizeObserver")) {
        return false;
      }
    });

    // Click the Start button to navigate to the Personal Info Form
    //cy.contains("START").click();
    cy.contains("button", "START").click();

    // Confirm navigation to the Personal Info Form
    cy.contains("Contact data").should("be.visible");

    cy.fixture("userData").then(
      (userData: {
        fullName: string;
        email: string;
        city: string;
        telephone: string;
        web: string;
      }) => {
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
        cy.get('input[name="fullName"]').should(
          "have.value",
          userData.fullName
        );
        cy.get('input[name="emailAddress"]').should(
          "have.value",
          userData.email
        );
        cy.get('input[name="city"]').should("have.value", userData.city);
        cy.get('input[name="telephone"]').should(
          "have.value",
          userData.telephone
        );
        cy.get('input[name="web"]').should("have.value", userData.web);
      }
    );

    // Navigate to Education
    cy.get('[data-testid="ArrowForwardIosIcon"]').click();

    cy.fixture("education").then((educationData: any[]) => {
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
    // Navigate to Experience
    cy.get('[data-testid="ArrowForwardIosIcon"]').click();

    cy.get('input[name="company"]').should("exist");
    cy.get('input[name="position"]').should("exist");
    cy.get('textarea[name="summary"]').should("exist");
    cy.fixture("experience").then((experienceData: any[]) => {
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

    // Navigate to summary
    cy.get('[data-testid="ArrowForwardIosIcon"]').click({ force: true });
  });

  it("Should update fields when typing", () => {
    cy.fixture("additionalSections").then(
      (additionalData: {
        summary: any;
        skills: string[];
        languages: { name: string; level: string }[];
      }) => {
        // Summary
        cy.get('textarea[name="summary"]').type(additionalData.summary);

        // Skills
        additionalData.skills.forEach((skill: string, index: number) => {
          cy.get('input[name="skill"]').type(skill);
          cy.get('button[name="addSkill"]').click();
        });
        cy.get('[data-testid="list-of-skills"]')
          .find("li")
          .should("have.length", 7);

        // Languages
        additionalData.languages.forEach(
          (language: { name: string; level: string }, index: number) => {
            const levelSlider: number =
              languageLevels.find((ll) => ll.label === language.level)?.value ??
              0;
            console.log(language.name);
            console.log("Slider level: " + levelSlider);
            const min = 1;
            const max = 7;
            const percentage = (levelSlider - min) / (max - min); //0->1
            console.log(percentage);
            cy.get('input[name="language"]').type(language.name);
            cy.get(".MuiSlider-root").then(
              ($slider: { width: () => any; height: () => any }) => {
                const sliderWidth = $slider.width(); // Get actual width
                const sliderHeight = $slider.height(); // Get height for center alignment
                const clickX = sliderWidth * percentage; // Calculate exact click position
                const clickY = sliderHeight / 2; // Click in the vertical center
                cy.wrap($slider).click(clickX, clickY, { force: true });
              }
            );
            cy.get('button[name="addLanguage"]').click();
          }
        );
        cy.get('[data-testid="list-of-languages"]')
          .find("li")
          .should("have.length", 3);
      }
    );
  });
});
