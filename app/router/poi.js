'use strict';

/**
 * @param {Egg.Application} app - egg application
 */
module.exports = app => {
  const { router, controller } = app;

  router.get('/poi', controller.poi.index);
  router.get('/poi/:id', controller.poi.info);
};
