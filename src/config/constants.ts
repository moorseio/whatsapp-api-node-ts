export const credentials = {
  login: process.env.MOORSE_LOGIN,
  password: process.env.MOORSE_PASS,
};

export const messages = {
  status: {
    answered: 'RESPONDIDA',
  },

  error: {
    user: 'Could not create user. Something went wrong',
    config: 'Could not create config. Something went wrong',
    webhook: 'Could not call Bot Service. Something went wrong',
    tokenStatus: 'Could not Validate token. Something went wrong',

    createUser: 'Could not create user. Something went wrong',
    createProduct: 'Could not create product. Something went wrong',

    sendMessage: 'Could not send the message. Something went wrong',
    mountMessage: 'Could not mount the message. Something went wrong',
  },

  menu: {
    welcome:
      '\\n Seja bem vindo ao Moorse Pizzaria 🍕. \\n Por favor selecione uma opção abaixo: \\n\\n',
    addedItem: 'Item adicionado, Deseja adicionar algo mais? \\n\\n',
    ordered: 'Pedido realizado \\n\\n',
  },

  file: {
    imageURL: 'https://moorse.io/assets/api/pizza.png',
    fileName: 'pizza.png',
  },
};

export const status = {
  open: 'OPEN',
  processing: 'PROCESSING',
  ordering: 'ORDERING',
  finished: 'FINISHED',
};
