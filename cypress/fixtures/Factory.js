import faker from 'faker-br';

export class Factory {
  static getUserToLogin(login_type) {
    switch (login_type) {
    case 'admin':
      return {
        email: Cypress.env('email'),
        password: Cypress.env('password'),
      };
    case 'valid':
      return {
        email: 'angeloAro',
        password: '1saza',
      };
    case 'empty':
      return {
        email: '',
        password: '',
      };
    case 'invalid':
      return {
        email: faker.internet.email(),
        password: faker.internet.password(),
      };
    }
  }

  static getUser(type) {
    switch (type) {
    case 'admin':
      return {
        nome: 'Fulano',
        email: 'fulano@qa.com',
        password: 'teste',
        administrador: 'true',
      };
    case 'valid':
      return {
        nome: faker.name.findName(),
        email: faker.internet.email(),
        password: faker.internet.password(),
        administrador: admin.toString(),
      };
    case 'invalid':
      return {
        nome: 'Fulano da Silva',
        email: 'beltrano@qa.com.br',
        password: 'teste',
        administrador: 'true',
      };
    case 'empty':
      return {
        nome: '',
        email: '',
        password: '',
        administrador: admin.toString(),
      };
    default:
      return { notfound: 'O usuário não foi encontrado, verifique o tipo passado!' };
    }
  }
}
