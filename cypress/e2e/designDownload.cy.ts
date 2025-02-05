/// <reference types="cypress" />
describe("Store Exposure Test", () => {
  it("should expose Redux store to window", () => {
    cy.visit("/");
    cy.window().should("have.property", "store"); // Check store exists
  });
});
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
      additionalData: {
        summary: "A passionate developer.",
        skills: ["JavaScript", "React"],
        languages: [{ name: "English", level: 6 }],
      },
    };

    cy.visit("/");
    cy.setReduxState(preloadedState);
    cy.visit("/design-download"); // Navigate directly to the Design and Download page
  });

  it("should allow changing template, text, background and heading colors plus downloading the file", () => {
    // Template
    cy.get('[aria-label="Template"]').within(() => {
      cy.contains("Single column").click();
      cy.contains("Two columns").click();
    });
    cy.get('[aria-pressed="true"]').should("contain.text", "Two columns");

    // Color selection
    cy.fixture("design").then((design: any) => {
      const newTextColor = design.textColor;
      const newBgColor = design.backgroundColor;
      const newHeadingColor = design.headingColor;

      cy.get('input[type="color"]')
        .eq(0)
        .invoke("val", newTextColor)
        .trigger("input");
      cy.get('input[type="color"]')
        .eq(1)
        .invoke("val", newBgColor)
        .trigger("input");
      cy.get('input[type="color"]')
        .eq(2)
        .invoke("val", newHeadingColor)
        .trigger("input");

      // Verify that colors are updated visually
      cy.get('input[type="color"]').eq(0).should("have.value", newTextColor);
      cy.get('input[type="color"]').eq(1).should("have.value", newBgColor);
      cy.get('input[type="color"]').eq(2).should("have.value", newHeadingColor);
    });

    //Download
    cy.contains("Download").click();

    cy.get("a[download]")
      .should("have.attr", "href")
      .and("match", /^blob:/);
  });
});
