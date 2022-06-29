Cypress.Commands.add('generateFixture', (fileName,numTimes) => {
  const faker = require('faker-br');
  const increment = 0;

  cy.writeFile(`cypress/fixtures/${fileName}.json`, {
    'hits':Cypress._.times(numTimes, () => {
      if(increment >= numTimes){
        return dynamicData;
      }

      let dynamicData = {
        'title':`${faker.lorem.words(3)}`,
        'url':`${faker.internet.url()}`,
        'author':`${faker.name.firstName()} ${faker.name.lastName()}`,
        'num_comments':`${faker.datatype.number()}`,
        'points':`${faker.datatype.number()}`,
        'objectID':`${faker.datatype.uuid()}`,
      };
      increment++;
    })

  });
});





