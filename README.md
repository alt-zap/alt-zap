<p align="center">
  <a href="https://alt.app.br">
    <img alt="Alt" src="https://avatars1.githubusercontent.com/u/68825062?s=200&v=4" width="60" />
  </a>
</p>
<h1 align="center">
  Alt
</h1>
<h5 align="center">Aplicação para pequenos negócios compartilharem seus produtos e venderem online</h5>

Pequenos empreendedores podem usar o **Alt** para cadastrar seus produtos e:

- Ter uma **página online** com o seu catálogo de produtos.
- Receber pedidos **pelo Whatsapp.**
- Configurar **métodos de entrega** e **formas de pagamento**
- Ter tudo isso **sem pagar nenhuma taxa**.

**Próximas funcionalidades:**
- [Modo Loja Física](https://github.com/alt-zap/alt-zap/issues/31) para exibir o catálogo (e receber pedidos) para **clientes presenciais**.
- [Taxa de Entrega Dinâmica](https://github.com/alt-zap/alt-zap/issues/52) para um cálculo justo da taxa de entrega.
- **Comunidades**: para grupos locais compartilharem seus produtos.

## Sumário
- [Exemplo](#exemplo)
- [Preço](#preço)
- [Desenvolvendo](#desenvolvendo)
  * [Requerimentos](#requerimentos)
  * [Iniciando](#iniciando)
  * [Disclaimers](#disclaimers)
- [Contribuidores](#contribuidores)

## Exemplo

Acesse a página da [Refazenda](https://refazenda.alt.app.br), nossa loja de exemplo, e verifique todas as funcionalidades possíveis da nossa plataforma.

<p align="center"><img src="https://user-images.githubusercontent.com/18706156/95028569-5ca31a80-0677-11eb-86a8-36041af25369.png" width="420" /></p>

## Preço

Os serviços do Alt são **todos gratuitos** e prentendemos manter esta política para sempre. Atualmente, utilizamos serviços como Firebase e Vercel para disponibilizar as funcionalidades gratuitamente.

Futuramente, planejamos **lançar uma versão _self-hosted_**, onde os usuários possam rodar (gratuitamente) nas suas próprias contas (Firebase e Vercel/Netlify).

A principal motivação desse projeto é **ajudar as comunidades locais** e contamos com a nobre contribuição de designers e programadores.

## Desenvolvendo

Este projeto renderiza o **Alt Admin**, _dashboard_ de administração que disponibiliza aos nossos clientes a configuração das funcionalidades oferecidas e também o **Alt Menu**, parte do sistema que renderiza as páginas dos estabelecimentos.

### Aprenda

Segue uma série de *Alt Talks* introduzindo a aplicação do Alt de forma mais técnica e também explicando alguns dos módulos do sistema:

- [**#001 - Rodando o projeto pela primeira vez**](https://youtu.be/ydUFnv17sXY)
- [**#002 - Módulo de Autenticação**](https://youtu.be/oW2VlA-SnBQ)
- [**#003 - Horário de Funcionamento**](https://youtu.be/5WDdAMNb1fY)
- [**#004 - Opções de Montagem**](https://youtu.be/xqLUQm44Do8)
- [**#005 - Módulo de Pedido**](https://youtu.be/rIWBrQSNByY)
- [**#006 - Internacionalização**](https://youtu.be/Il1H1h5xeVg)

### Requerimentos
- Utilizamos o [Firebase](https://firebase.google.com) como provedor de autenticação e de banco de dados para a aplicação. Para facilitar o desenvolvimento local, você pode usar o **Emulador do Firebase**, distribuído pelo próprio serviço. Caso queira criar um projeto Firebase próprio, também é possível utilizá-lo configurando as varíaveis de ambiente como no arquivo `.env.exemplo`.

- Para configurar o Emulador do Firebase, siga [estes passos](https://firebase.google.com/docs/rules/emulator-setup). **Esta etapa pode demorar um bom tempo, mas você só precisa realizá-la uma vez**. A CLI do Firebase baixará os emuladores (em Java) e, eventualmente, a JDK. Isso possibilita que você rode uma versão local do banco de dados Firestore, do Firebase.

### Iniciando
1. Clone o projeto com `git clone git@github.com:alt-zap/alt-zap.git`.
2. Rode `yarn` na pasta raiz para **instalar as dependências**.
3. Rode `yarn emulators` para **iniciar o emulador do Firebase**. 
4. Em outra aba do seu terminal, rode `yarn start`.
5. Na página inicial, faça **login com sua conta Google**. Complete seu cadastro no Alt.
6. Após isso, você **não precisa criar um novo negócio** seguindo o fluxo do Onboarding. Logo após o preenchimento dos dados, caso você esteja em `localhost`, será redirecionado para o painel do "Bar do Lucis". Em próximos logins, talvez você precise clicar no link **Meus Negócios** no Menu para ir até o painel de Administração.
7. Para visualizar o menu desse Tenant, basta acessar http://localhost:3000/bardolucis.

> É importante que você acesse o serviço utilizando o _host_ **localhost**.

### Disclaimers
- Já adicionamos alguns **dados iniciais** para que você não precise configurar nada. Você pode verificá-los na UI do Firebase Emulator (geralmente em http://localhost:4000).
- Atualmente, o serviço de localização utiliza o [Here SDK](https://developer.here.com/), que necessita de **chaves de acesso**. Caso queira, você pode criar uma conta e configurar seu ambiente, mas isso não é necessário.
- Para que o desenvolvimento local seja mais fácil, há **condições no código** para carregar os dados mockados. Por exemplo, geralmente carregaríamos os `tenants` para o `userId` do usuário que está logado, mas fazemos resolver sempre para o mesmo id (o meu) caso estejamos em `localhost`.

Sinta-se livre para reportar erros, tirar dúvidas e dar sugestões nas issues do repositório.

## Contribuidores

[![](https://sourcerer.io/fame/pedroespindula/lucis/alt-zap/images/0)](https://sourcerer.io/fame/pedroespindula/lucis/alt-zap/links/0)[![](https://sourcerer.io/fame/pedroespindula/lucis/alt-zap/images/1)](https://sourcerer.io/fame/pedroespindula/lucis/alt-zap/links/1)[![](https://sourcerer.io/fame/pedroespindula/lucis/alt-zap/images/2)](https://sourcerer.io/fame/pedroespindula/lucis/alt-zap/links/2)[![](https://sourcerer.io/fame/pedroespindula/lucis/alt-zap/images/3)](https://sourcerer.io/fame/pedroespindula/lucis/alt-zap/links/3)[![](https://sourcerer.io/fame/pedroespindula/lucis/alt-zap/images/4)](https://sourcerer.io/fame/pedroespindula/lucis/alt-zap/links/4)[![](https://sourcerer.io/fame/pedroespindula/lucis/alt-zap/images/5)](https://sourcerer.io/fame/pedroespindula/lucis/alt-zap/links/5)[![](https://sourcerer.io/fame/pedroespindula/lucis/alt-zap/images/6)](https://sourcerer.io/fame/pedroespindula/lucis/alt-zap/links/6)[![](https://sourcerer.io/fame/pedroespindula/lucis/alt-zap/images/7)](https://sourcerer.io/fame/pedroespindula/lucis/alt-zap/links/7)
