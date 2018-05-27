# Projeto Flashcards

Projeto final do curso **React Native** do [Udacity](https://br.udacity.com/).

## Introdução

Um aplicativo, criado com [React Native](https://facebook.github.io/react-native/), [Redux](https://redux.js.org/) e [React Navigation](https://reactnavigation.org/), cujo propósito é criar conjuntos de perguntas e respostas.

Nessa aplicativo, os usuários podem criar _decks_, estrutura onde os _cards_ são agrupados. Cada _card_ é composto por uma pergunta e uma resposta, e também devem ser criados pelo usuário. Uma vez criado um _deck_ e os _cards_ desse deck, o usuário pode realizar um _quiz_, no qual irá responder às perguntas de cada _card_ e comparar com a resposta correspondente. A melhor pontuação obtida no _quiz_ é armazenada para servir de comparação. Uma notificação diária busca lembrar o usuário de realizar o _quiz_.

O objetivo do projeto foi criar toda a aplicação com base no React Native. Optou-se por utilizar a Redux _store_, como forma de estruturar os dados da aplicação e manter os dados sincronizados entre cada componente.

## Instalação e Inicialização

Para realizar a instalação das dependências do projeto é necessário ter o [Node](https://nodejs.org/en/) instalado em uma versão superior à versão 6.

  * Clone o Projeto com o [git](https://git-scm.com/):

    `git clone https://github.com/raphael-jorge/reactnd-project-flashcards.git`

  * Navegue até a pasta do projeto:

    `cd reactnd-project-flashcards`

  * Instale as dependências necessárias:

    `yarn install`

  * Inicialize a aplicação

    `yarn start`

  * Siga as instruções exibidas para acessar a aplicação.

A aplicação foi desenvolvida e testada apenas na plataforma **Android**.
