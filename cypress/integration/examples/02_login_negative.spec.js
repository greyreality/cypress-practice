/// <reference types="cypress" />
import { loginPage } from "./pages/loginpage"

describe("Run negative tests for Manatal login page", () => {
  // Common steps for all testcases
  beforeEach("Open website", () => {
    cy.visit("/signup");
    cy.fixture("login_testdata").as("testdata");
    loginPage.VerifyLoginPage();
  })

  it("TEST-07 Verify error messages for required fields", () => {
    // TO DO:  Test should be splitted per field
    loginPage.clickSingUpButton();
    cy.contains("The name field is required").should('exist');
    cy.contains("The organization name field is required").should('exist');
    cy.contains("The company email address field is required").should('exist');
    cy.contains("The confirm company email address field is required").should('exist');
    cy.contains("The password field is required").should('exist');
    cy.contains("The agree field is required").should('exist');
  })

  it("TEST-08 Verify error messages for required fields when enter empty value", () => {
    // TO DO:  Test should be splitted per field
    loginPage.fillinRequiredFields('  ', '  ', '  ')
    cy.contains("The name field is required").should('exist');
    cy.contains("The organization name field is required").should('exist');
    cy.contains("The password field is required").should('exist');
    loginPage.fillinEmail("  ");
    loginPage.fillinConfirmEmail("  ");
    cy.contains("The company email address field is required").should('exist');
    cy.contains("The confirm company email address field is required").should('exist');
  })

  it("TEST-09 Verify error message for field length", () => {
    // TO DO:  Test should be splitted per field
    cy.generateString(256).then(generated_string => {
      loginPage.fillinRequiredFields(generated_string, generated_string, generated_string)
    })

    cy.contains("The name field may not be greater than 255 characters").should('exist');
    cy.contains("The organization name field may not be greater than 255 characters").should('exist');
    cy.contains("The password field may not be greater than 255 characters").should('exist');

    cy.generateString(255).then(generated_string => {
      loginPage.fillinEmail(generated_string);
      cy.contains("The company email address field may not be greater than 254 characters").should('exist');
      loginPage.fillinConfirmEmail(generated_string);
      cy.contains("The confirm company email address field may not be greater than 254 characters").should('exist');
    })
  })

  it("TEST-10 Verify error message for field length - phone", () => {
    // BUG: field phone doesn't have an length validation on UI
    cy.get('[data-vv-name=phone]').should('be.visible');
    cy.get("[data-vv-name=phone]").type('8662116130462090659655056767081315775484545832963858328272248951094087126403116632080468880234053442583202511210549037648533803224188649683156678105660598961340249414014412717046818316534890756118158495507857315360446934645235647673144187605644077894169789');
    cy.contains("The phone field may not be greater than 16 digits").should('exist');
    //i see that backend API returns "Ensure this field has no more than 16 characters."
  })

  it("TEST-11 Verify that can not enter letters for field - phone", () => {
    // TO DO: when enter letters  - phone field is empty
  })

  it("TEST-12 Verify that can not enter more than 6 digits for field - phone", () => {
    // TO DO: when enter '1234567' get error message - Enter a valid phone number
  })

  it("TEST-13 Verify that cant enter not valid email for field - email", () => {
    // TO DO: when enter 'mail' get error message - The email address field must be a valid email
    // TO DO: when enter '@mail.com' get error message - The email address field must be a valid email
    // TO DO: when enter 'mail@mail.11' get error message - The email address field must be a valid email
    // TO DO: when enter 'mail$@mail.com' get error message - The email address field must be a valid email
  })

  it("TEST-14 Verify that can not enter not valid email for field - confirm email", () => {
    // TO DO: when enter 'mail' get error message - The email address field must be a valid email
    // TO DO: when enter '@mail.com' get error message - The email address field must be a valid email
    // TO DO: when enter 'mail@mail.11' get error message - The email address field must be a valid email
    // TO DO: when enter 'mail$@mail.com' get error message - The email address field must be a valid email
  })

  it("TEST-15 Verify error message for fields - email and confirm email", () => {
    loginPage.fillinEmail('email01@mail.com');
    loginPage.fillinConfirmEmail('email02@mail.com');
    cy.contains("The confirm company email address confirmation does not match").should('exist');
  })

  it("TEST-16 Verify error message for regestration with existing email", () => {
    cy.get("@testdata").then((testdata) => {
      cy.visit("/signup");
      loginPage.VerifyLoginPage();
      loginPage.fillinRequiredFields(testdata.name, testdata.organization_name, testdata.password)
      loginPage.VerifyIworkForRadiobuttons()

      loginPage.fillinEmail('rita.leontyeva+1@candidate.manatal.com');
      loginPage.fillinConfirmEmail('rita.leontyeva+1@candidate.manatal.com');
      loginPage.clickIagree();
      // Turn off cypress fail on uncaught:exception event
      Cypress.on('uncaught:exception', (err, runnable) => {
        return false;
      });
      Cypress.on('fail', (err, runnable) => { return false });

      loginPage.clickSingUpButton();
      cy.get("[class='toast-error-message']").should('be.visible');
      cy.contains("User with this email address already exists.").should('exist');
    })
  })
})
