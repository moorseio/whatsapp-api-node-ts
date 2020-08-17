import ip from 'ip';

import app from './app';

app.listen('3333', () =>
  console.log(
    `---------------------------------------------------------------------------
      WhatsApp-API-Typescript esta rodando! Acesse uma das URL's:
      Local: http://localhost:3333
      Externo: http://${ip.address()}:3333
    ---------------------------------------------------------------------------`,
  ),
);
