/// <reference types="cypress" />
import { loginPage } from "./pages/loginpage"
import { NewEmailGenerator } from "../../support/index"
import { generateEmail } from "../../support/index"

describe("Run positive tests for Manatal login page", () => {
  // Common steps for all testcases
  beforeEach("Open website", () => {
    cy.visit("/signup");
    cy.fixture("login_testdata").as("testdata");
  })

  it("TEST-01 Verify registration as Agency without phone", () => {
    loginPage.VerifyLoginPage();

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
    loginPage.VerifyLoginPage();

    cy.get("@testdata").then((testdata) => {
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
    loginPage.VerifyLoginPage();

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
    loginPage.VerifyLoginPage();

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

})
