/// <reference types="cypress" />

export class ManataLoginPage {
    fillinRequiredFields(name, organization_name, password) {
        cy.get("#name").type(name);
        cy.get("#organization_name").type(organization_name);
        cy.get("#password").type(password);
    }

    fillinAllFields(name, organization_name, password, phone) {
        cy.get("#name").type(name);
        cy.get("#organization_name").type(organization_name);
        cy.get("#password").type(password);
        cy.get('[data-vv-name=phone]').should('be.visible');
        cy.get("[data-vv-name=phone]").type(phone);
    }

    fillinEmail(email) {
        cy.get("#company_email_address").type(email);
    }

    fillinConfirmEmail(confirm_email) {
        cy.get("#confirm_company_email_address").type(confirm_email);
    }

    VerifyLoginPage() {
        cy.get("#name").should('have.id', 'name');
        cy.contains("Start Your Free Trial").should('exist')
    }

    VerifyConfirmPage(email) {
        // Wait until confirm email page will be loaded
        cy.contains('Start Your Free Trial').should('not.exist')

        // Verify confirm email page
        cy.contains("Confirm your e-mail address").should('exist')
        cy.get("#confirmation-message-e2e-test").then(($confirm) => {
            const confirmText = $confirm.text();
            expect(confirmText).is.eql("A confirmation email was sent to");
        });
        cy.contains(email)
    }

    VerifyIworkForRadiobuttons() {
        cy.findByLabelText('Agency').should('exist')
        cy.findByLabelText('Company').should('exist')
    }

    VerifyDefaultPhoneFlag(){
        cy.get("[class='vti__flag th']", {timeout: 10000}).should('exist')     
    }

    clickCompanyRadiobuttons() {
        cy.findByLabelText('Company').click();
    }

    clickIagree() {
        cy.get("[data-vv-name=agree]").check()
    }

    clickSingUpButton() {
        cy.get('.signup-material-button-contained').click();
    }
    
    clickCountryCodeDropdown() {
        cy.get("[class='vti__dropdown-arrow']").click();
    }
}

export const loginPage = new ManataLoginPage();