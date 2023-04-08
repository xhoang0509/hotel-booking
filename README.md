# DATN-API

### Create Database for new developer:

```bash
cd src
npx sequelize-cli db:drop;npx sequelize-cli db:create;npx sequelize-cli db:migrate;npx sequelize-cli db:seed:all;
```

### Database for pipeline
```bash
cd src
npx sequelize-cli db:migrate; npx sequelize-cli db:seed:all
```