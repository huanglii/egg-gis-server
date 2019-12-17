'use strict';

const Controller = require('egg').Controller;

class PoiController extends Controller {
  async index() {
    const pois = await this.ctx.service.poi.findAll();
    this.ctx.body = {
      success: true,
      data: pois,
    };
  }
  async info() {
    const id = this.ctx.params.id;
    let poi = await this.ctx.service.cache.get(`poi_info_${id}`);
    if (!poi) {
      poi = await this.ctx.service.poi.findById(id);
      await this.ctx.service.cache.set(`poi_info_${id}`, poi);
    }
    this.ctx.logger.info('poi_info: %j', poi);
    this.ctx.body = {
      success: true,
      data: poi,
    };
  }
}

module.exports = PoiController;
