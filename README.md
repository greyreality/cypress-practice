# Project on Cypress

## To setup env:
```sh
npm install --save-dev cypress@9.4.1
node_modules/.bin/cypress open
npm install --save-dev cypress @testing-library/cypress
npm install --save-dev cypress faker@5.5.3
```

## To run tests in UI. It has retry of failed test:
```sh
npx cypress open
```
in UI choose file: 
cypress/integration/examples/01_login_positive.spec.js
cypress/integration/examples/02_login_negative.spec.js

## To run tests in terminal. It doesn't have retry:
```sh
npx cypress run --browser=chrome --record --key b83f9e08-ad6b-44a5-ab9c-78a80fc6d259 --spec /Users/margarita.leo/Documents/personal/cypress-practice/cypress/integration/examples/01_login_positive.spec.js,/Users/margarita.leo/Documents/personal/cypress-practice/cypress/integration/examples/02_login_negative.spec.js
```
Test run statistic dashboard can be view [CypressDashboard](https://dashboard.cypress.io/projects/m49jk9/runs)

and per commit in [Github]https://github.com/greyreality/cypress-practice/commits

