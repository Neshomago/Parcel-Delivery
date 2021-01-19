module.exports = {
  development: {
    client: 'mysql',
    connection: {
      host: process.env.HOST,
      user: process.env.USER,
      password: process.env.PASSWORD,
      database: process.env.DATABASE,
      migrations: {
        tableName: 'knex_migrations',
      },
    },
  },

  production: {
    client: 'mysql',
    connection: {
      host: process.env.HOST,
      user: process.env.USER,
      password: process.env.PASSWORD,
      database: process.env.DATABASE,
      migrations: {
        tableName: 'knex_migrations',
      },
    },
  },
};
