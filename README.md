# Desafio MB Web

## Aplicação Frontend desenvolvida com ReactJS + TypeScript + Vite + Tailwind + SASS
API desenvolvida em NodeJs utilizando Express

- Preparando o ambiente de desenvolvimento

  - Será utilizado VSCode como editor de código 
  - você vai precisar do Node versão 20.11.0 ou versão LTS, link para instalação: (https://nodejs.org/en/download/) 
  - será também necessário ter o npm instalado na versão 10.2.4, comando para instalação: npm install -g npm@10.2.4

  - Em seguida será nessário instalação do Yarn através do comando: 

  ```bash
  npm i --global yarn
  ```

  - Execute o comando abaixo para instalar as dependências:
  ```bash
  yarn install
  ```

  - Para iniciar a aplicação, execute o comando:

   ```bash
  yarn server
  ```

  - Conforme requisito: deve-se acessar a aplicação via [GET] /registration. Responsável por renderizar uma página html simples que irá carregar os componentes do formulário no browser:
  http://localhost:3002/registration

- Para um dos principais requisitos a performance, foi implementado as rotas dividas entre 4 etapas, utilizando lazy

- É requisitado também validações para os campos dos formulário, para isso no front foram criadas validações em src/validators e para o Back foi implementado na API em server/validators

- API desenvolvida no diretório da raiz server/


-- Desenvolvido por Lucas Souza Davanso, email: lucassouzadavanso@gmail.com, celular: (17) 99632-5685
github: https://github.com/lucasdav
