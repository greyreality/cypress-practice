/// <reference types="cypress" />
import { loginPage } from "./pages/loginpage"

describe("Run positive tests for Manatal login page", () => {
  // Common steps for all testcases
  beforeEach("Open website", () => {
    cy.visit("/signup");
    cy.fixture("login_testdata").as("testdata");
    loginPage.VerifyLoginPage();
  })

  it("TEST-01 Verify registration as Agency without phone", () => {
    cy.get("@testdata").then((testdata) => {
      loginPage.fillinRequiredFields(testdata.name, testdata.organization_name, testdata.password)
      loginPage.VerifyIworkForRadiobuttons()

      cy.generateEmail(testdata.email).then(generated_email => {
        loginPage.fillinEmail(generated_email);
        loginPage.fillinConfirmEmail(generated_email);
        loginPage.clickIagree();
        loginPage.clickSingUpButton();
        loginPage.VerifyConfirmPage(generated_email);
      })
    })
  })

  it("TEST-02 Verify registration as Agency with phone", () => {
    cy.get("@testdata").then((testdata) => {
      loginPage.VerifyDefaultPhoneFlag()
      loginPage.fillinAllFields(testdata.name, testdata.organization_name, testdata.password, testdata.phone)
      loginPage.VerifyIworkForRadiobuttons()

      cy.generateEmail(testdata.email).then(generated_email => {
        loginPage.fillinEmail(generated_email);
        loginPage.fillinConfirmEmail(generated_email);
        loginPage.clickIagree();
        loginPage.clickSingUpButton();
        loginPage.VerifyConfirmPage(generated_email);
      })
    })
  })

  it("TEST-03 Verify registration as Company without phone", () => {
    cy.get("@testdata").then((testdata) => {
      loginPage.fillinRequiredFields(testdata.name, testdata.organization_name, testdata.password)
      loginPage.VerifyIworkForRadiobuttons()
      loginPage.clickCompanyRadiobuttons()

      cy.generateEmail(testdata.email).then(generated_email => {
        loginPage.fillinEmail(generated_email);
        loginPage.fillinConfirmEmail(generated_email);
        loginPage.clickIagree();
        loginPage.clickSingUpButton();
        loginPage.VerifyConfirmPage(generated_email);
      })
    })
  })

  it("TEST-04 Verify registration as Company with phone", () => {
    cy.get("@testdata").then((testdata) => {
      loginPage.fillinAllFields(testdata.name, testdata.organization_name, testdata.password, testdata.phone)
      loginPage.VerifyIworkForRadiobuttons()
      loginPage.clickCompanyRadiobuttons()

      cy.generateEmail(testdata.email).then(generated_email => {
        loginPage.fillinEmail(generated_email);
        loginPage.fillinConfirmEmail(generated_email);
        loginPage.clickIagree();
        loginPage.clickSingUpButton();
        loginPage.VerifyConfirmPage(generated_email);
      })
    })
  })

  it("TEST-05 Verify dropdown with country phone code", () => {
    cy.get("[class='vti__dropdown open']").should('not.exist');
    loginPage.clickCountryCodeDropdown();
    cy.get("[class='vti__dropdown open']").should('exist');
    cy.get("[class='vti__dropdown-item']").should('have.length', 243);
  })

  it("TEST-06 Verify adding country code into phone field", () => {
    // TO DO: verify that after entering phone field reformat and includes country code or check in XHR level
  })

})
