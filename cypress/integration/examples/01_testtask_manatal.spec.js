/// <reference types="cypress" />

describe("Manatal testing", () => {

  it("TEST-01 Success registration as Agency with phone", () => {
    cy.visit("https://jb-app-frontend-staging.herokuapp.com/signup/");

    // Load login page
    cy.get("#name",{timeout:5000})
    .should('have.id','name');
    cy.contains("Start Your Free Trial",{timeout:5000}).should('exist')
    
    cy.get("#name").type("Rita Leontyeva")
    cy.get("#organization_name").type("Test")
    //Verify radiobuttons
    cy.findByLabelText('Agency', { timeout: 7000 }).should('exist')
    cy.findByLabelText('Company', { timeout: 7000 }).should('exist')

    cy.get("#company_email_address").type("rita.leontyeva+18@candidate.manatal.com")
    cy.get("#confirm_company_email_address").type("rita.leontyeva+18@candidate.manatal.com")
    cy.get("#password").type("Password")
    cy.get("[data-vv-name=phone]").type("098-890-7766")
    cy.get("[data-vv-name=agree]").check()
    cy.contains("Sign up").click()

    // Load confirm email page
    cy.contains('Start Your Free Trial',{timeout:5000}).should('not.exist')

    cy.contains("Confirm your e-mail address")
    cy.get("#confirmation-message-e2e-test").then(($confirm) => {
      const confirmText = $confirm.text();
      expect(confirmText).is.eql("A confirmation email was sent to");
    });
    cy.contains("rita.leontyeva+18@candidate.manatal.com")

  })
})
