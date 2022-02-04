/// <reference types="cypress" />
import {loginPage} from "../../integration/examples/pages/loginpage"

describe("Manatal testing", () => {

  beforeEach("Open website",() => {
    // Common steps for all testcases
    cy.visit("/signup");
    cy.fixture("login_testdata").as("testdata");
  })

  it.only("TEST-01 Success registration as Agency with phone", () => {

    // Wait until login page will be loaded
    cy.get("#name",{timeout:5000})
    .should('have.id','name');
    cy.contains("Start Your Free Trial",{timeout:5000}).should('exist')

    cy.get("@testdata").then((testdata) => {
       loginPage.fillinRequiredFields(testdata.name,testdata.organization_name,testdata.password,testdata.phone)
        // // Using custom command function
        // cy.fillin_username(testdata.name);
        // // Using testdata from fixture
        // cy.get("#organization_name").type(testdata.organization_name);
        // cy.get("#password").type(testdata.password);
        // cy.get("[data-vv-name=phone]").type(testdata.phone);
    })
    
    //Verify radiobuttons
    cy.findByLabelText('Agency', { timeout: 7000 }).should('exist')
    cy.findByLabelText('Company', { timeout: 7000 }).should('exist')

    cy.get("#company_email_address").type("rita.leontyeva+26@candidate.manatal.com")
    cy.get("#confirm_company_email_address").type("rita.leontyeva+26@candidate.manatal.com")
    cy.get("[data-vv-name=agree]").check()
    // cy.contains("Sign up").click()
    loginPage.clickSingUpButton();

    // Wait until confirm email page will be loaded
    cy.contains('Start Your Free Trial',{timeout:5000}).should('not.exist')

    // Verify confirm email page
    cy.contains("Confirm your e-mail address")
    cy.get("#confirmation-message-e2e-test").then(($confirm) => {
      const confirmText = $confirm.text();
      expect(confirmText).is.eql("A confirmation email was sent to");
    });
    cy.contains("rita.leontyeva+26@candidate.manatal.com")

  })

  it.only("TEST-02 Success registration as Agency without phone", () => {
    cy.get("#name",{timeout:5000})
  })

})
