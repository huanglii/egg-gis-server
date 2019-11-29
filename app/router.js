'use strict';

/**
 * @param {Egg.Application} app - egg application
 */
module.exports = app => {
  require('./router/home')(app);
  require('./router/poi')(app);
  require('./router/mvt')(app);
};
