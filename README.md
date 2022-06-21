# Reorize

comando para criar a database  
npx sequelize db:create

caso queira pode inserir qualquer outro nome e senha mas alterar database e password no "development" em 
src/config/config.json

comando para executar as tabelas  
npx sequelize-cli db:migrate

comando para executar o projeto  
npm start

em /src/test_adm/adm.js é possivel ver o CRUD do projeto e a execução é através do Postman, Insomnia ou qualquer outro app que seja possivel
executar requisições de API
