// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add("login", (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add("drag", { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add("dismiss", { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite("visit", (originalFn, url, options) => { ... })
import '@testing-library/cypress/add-commands';

// Cypress.Commands.add("fillin_username", (username) => {
//     cy.get("#name").type(username);
// })

// Cypress.Commands.add("generateEmail", () => {
//         let random_string = ''
//         let random_ascii
//         for (let i = 0; i < 6; i++) {
//         random_ascii = Math.floor(Math.random() * 25 + 97)
//         random_string += String.fromCharCode(random_ascii)
//         }
//         return random_string
// })