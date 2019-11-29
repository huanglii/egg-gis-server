'use strict';

/**
 * @param {Egg.Application} app - egg application
 */
module.exports = app => {
  const { router, controller } = app;

  router.get('/mvt', controller.mvt.index);
  router.get('/mvt/:layer/:z/:x/:y.pbf', controller.mvt.poi);
};
