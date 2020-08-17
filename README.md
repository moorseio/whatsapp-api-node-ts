<div>
<h2 align="center">Whatsapp API Typescript Chatbot</h2>
<p align="center">
<strong><font size="+2" align="center">
  <a href="https://whatsapp.moorse.io/">Nosso Site</a>
  <span> · </span>
  <a href="https://moorse.readme.io/">Documentação</a>
</font></strong>
<br/>
<a href="https://moorse.io/">
  <img alt="Logo" title="#logo" width="300px" src="files/github.gif">
</a>
</p>
</div>

## O que é o WhatsApp Api Moorse Typescript?
Moorse é uma empresa focada no desenvolvimento de API's e tecnologias de diversos canais de comunicação, entre essas API's temos a solução Moorse WhatsApp API (API não-oficial) que permite desenvolvedores utilizarem de suas funcionalidades que podem ter semelhança com a API oficial. Viemos ao mercado com o objetivo de facilitar a comunicação entre o seu sistema e o mundo digital de forma robusta e escalável. Esta documentação tem como objetivo exemplificar o uso do **Whatsapp API** na linguagem Javascript utilizando Typescript

* **E-Commerce** – Envie mensagens com o status do pedido em tempo real, mantenha seu cliente informado.
* **Chat Bot** – Automatize a interação com clientes por fluxos conversacionais e seja mais eficiente. Escolha respostas predefinidas ou crie chatbots com Inteligência Artificial para interagir no WhatsApp.
* **Alertas e Notificações** – Use as mensagens do WhatsApp para enviar com segurança mensagens sobre monitoramento, desde notificações de voo até confirmações de reserva e alertas de entrega.
* **Atendimento** – Crie seu sistema de atendimento utilizando nossas APIs, permita que as equipes de vendas e suporte respondam perguntas sobre produtos ou serviços de atendimento ao cliente usando o aplicativo de mensagens preferido de seus clientes.


### :mag: Veja também

Além do Javascript, nós temos exemplos nas mais variadas linguagens utilizadas no momento. Veja abaixo todas as opções que temos disponíveis:

- [Java](https://github.com/moorseio/whatsapp-api-java)
- [Python]()
- [PHP]()

### :fire: Faça a Demo em nosso site
Você não tem muito conhecimento, ou quer testar nossa API sem precisar utilizar uma linguagem de programação ou o terminal? Disponibilizamos também uma interface web onde você consegue realizar o teste em apenas 3 passos. Acesse o [Moorse Demo](https://app.moorse.io/demo) e veja como é simples.


### :rocket: Configurando o projeto
Neste tópico iremos ver como realizar a configuração do projeto.

1. Acesse o sistema do [Moorse](https://app.moorse.io/register) e crie sua conta.
2. No [menu de integrações](https://app.moorse.io/integrations) identifique o número disponibilizado para realizar sua demo.
3. No [menu de webhooks](http://front.moorse.io/webhooks) crie um **Novo Webhook** e adicione:
  - Nome:
  - Método: `POST`
  - URL: https://<ip-publico>/webhook

> Caso não tenha um ip público é possivel utilizar o `ngrok` para gerar uma URL pública sem nenhum custo
>
> Você pode baixar o ngrok [clicando aqui](https://ngrok.com/download)
> Após baixar execute o mesmo com o seguinte comando no seu terminal:
>
> `$ ngrok http 3333`

3. Crie um arquivo `.env` e adicione as seguintes variáveis com as configurações da sua conta moorse.

```
MOORSE_URL = http://api.moorse.io
MOORSE_LOGIN = seuemail@email.com
MOORSE_PASS = 123456
```

### :arrow_forward: Executando seu projeto
No terminal Acesse a raiz do seu projeto e execute o comando abaixo:

```
# Gere o banco de dados SQLite e execute as migrations
yarn typeorm migration:run

# Popule o Banco com as informações iniciais
yarn seed:run

# Execute o projeto
yarn dev:server
```
