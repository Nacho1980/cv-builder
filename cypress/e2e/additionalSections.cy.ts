/// <reference types="cypress" />
import { languageLevels } from "../../src/constants";

describe("Additional sections", () => {
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
      experience: {
        items: [
          {
            startDate: "01-2021",
            companyName: "TechCorp",
            positionName: "Developer",
            summary: "Developed apps",
          },
        ],
      },
    };

    cy.visit("/");
    cy.setReduxState(preloadedState);
    cy.visit("/additional-info"); // Navigate directly to page
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
            const min = 1;
            const max = 7;
            const percentage = (levelSlider - min) / (max - min); //0->1
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
