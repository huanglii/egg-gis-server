/* eslint valid-jsdoc: "off" */

'use strict';

/**
 * @param {Egg.EggAppInfo} appInfo app info
 */
module.exports = appInfo => {
  /**
   * built-in config
   * @type {Egg.EggAppConfig}
   **/
  const config = exports = {};

  // postgres
  exports.sequelize = {
    dialect: 'postgres', // support: mysql, mariadb, postgres, mssql
    database: 'postgis_25_sample',
    host: 'localhost',
    port: 5432,
    username: 'postgres',
    password: 'admin',
  };

  return {
    ...config,
  };
};
