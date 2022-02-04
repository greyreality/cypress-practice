/// <reference types="cypress" />

export class ManataLoginPage{
    fillinRequiredFields(name,organization_name,password,phone){
        cy.fillin_username(name);
        cy.get("#organization_name").type(organization_name);
        cy.get("#password").type(password);
        cy.get("[data-vv-name=phone]").type(phone);
    }

    clickSingUpButton(){
        cy.contains("Sign up").click();
    }
}

export const loginPage = new ManataLoginPage();