<!-- AUTO-GENERATED-CONTENT:START (STARTER) -->
<p align="center">
  <a href="https://www.gatsbyjs.com">
    <img alt="Gatsby" src="https://avatars1.githubusercontent.com/u/68825062?s=200&v=4" width="60" />
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

## Exemplo

Veja a página do [Alt Burguer CG](https://alt-zap.vercel.app/altburguer-cg), hamburgueria para qual o Alt foi desenvolvido inicialmente, e veja uma demonstração do serviço.

<p align="center"><img src="https://user-images.githubusercontent.com/18706156/87861502-3776f980-c91d-11ea-9d48-c33c941d2636.png" width="420" /></p>

## Preço

Os serviços do Alt são **todos gratuitos** e prentendemos manter esta política para sempre, desde que consigamos continuar oferecendo nossa plataform **sem custos**.

Futuramente, planejamos **lançar uma versão self-hosted** que os usuário possam rodar (gratuitamente) nas suas próprias contas (Firebase e Vercel/Netlify).

A principal motivação desse projeto é **ajudar as comunidades locais** e contamos com a nobre contribuição de designers e programadores.

## Arquitetura

Ainda estamos [melhorando nossa documentação](https://github.com/alt-zap/alt-zap/issues/53), mas esta imagem pode te ajudar a entender como funciona o Alt, atualmente:

![Arquitetura do Alt](https://user-images.githubusercontent.com/18706156/91663167-93f13b00-eabd-11ea-87c4-6999a9350c90.jpg)

**Disclaimer:** Por enquanto, este projeto **também está renderizando o Menu**. Isso é uma ação temporária para facilitar a integração de novos desenvolvedores.

## Desenvolvendo

Este projeto renderiza o **Alt Admin**, _dashboard_ de administração que oferece aos nosso clientes a configuração das funcionalidades.


Para desenvolver localmente, você precisará [configurar o Firebase Emulator](https://firebase.google.com/docs/rules/emulator-setup).

Para iniciar o desenvolvimento:
1. Clone o projeto com `git clone git@github.com:alt-zap/alt-zap.git`.
2. Rode `yarn` na pasta raiz para **instalar as dependências**.
3. Rode `yarn emulators` para **iniciar o emulador do Firebase**. 
4. Em outra aba do seu terminal, rode `yarn start`.
5. Na página inicial, faça **login com sua conta Google**. Complete seu cadastro no Alt.
6. Após isso, você **não precisa criar um novo negócio**. Após cadastrar seus documentos, vá para URL `/tenants`. (explicação abaixo).
7. Para visualizar o menu, basta acessar http://localhost:3000/bardolucis.

### Disclaimers
- Já adicionamos alguns **dados iniciais** para que você não precise configurar nada para desenvolver. Você pode verificá-los na UI do Firebase Emulator (geralmente em http://localhost:4000).
- Atualmente, o serviço de localização utiliza o [Here SDK](https://developer.here.com/), que necessita de **chaves de acesso**. Caso queira, você pode criar uma conta e configurar seu ambiente, mas isso não é necessário.
- Para que o desenvolvimento local seja mais fácil, há **condições no código** para carregar os dados mockados. Por exemplo, geralmente carregaríamos os `tenants` para o `userId` do usuário que está logado, mas fazemos resolver sempre para o mesmo id (o meu) caso estejamos em `localhost`.

Sinta-se livre para reportar erros, tirar dúvidas e dar sugestões pra gente nas issues.



## Contribuidores

[![](https://sourcerer.io/fame/pedroespindula/lucis/alt-zap/images/0)](https://sourcerer.io/fame/pedroespindula/lucis/alt-zap/links/0)[![](https://sourcerer.io/fame/pedroespindula/lucis/alt-zap/images/1)](https://sourcerer.io/fame/pedroespindula/lucis/alt-zap/links/1)[![](https://sourcerer.io/fame/pedroespindula/lucis/alt-zap/images/2)](https://sourcerer.io/fame/pedroespindula/lucis/alt-zap/links/2)[![](https://sourcerer.io/fame/pedroespindula/lucis/alt-zap/images/3)](https://sourcerer.io/fame/pedroespindula/lucis/alt-zap/links/3)[![](https://sourcerer.io/fame/pedroespindula/lucis/alt-zap/images/4)](https://sourcerer.io/fame/pedroespindula/lucis/alt-zap/links/4)[![](https://sourcerer.io/fame/pedroespindula/lucis/alt-zap/images/5)](https://sourcerer.io/fame/pedroespindula/lucis/alt-zap/links/5)[![](https://sourcerer.io/fame/pedroespindula/lucis/alt-zap/images/6)](https://sourcerer.io/fame/pedroespindula/lucis/alt-zap/links/6)[![](https://sourcerer.io/fame/pedroespindula/lucis/alt-zap/images/7)](https://sourcerer.io/fame/pedroespindula/lucis/alt-zap/links/7)