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
    const poi = await this.ctx.service.poi.findById(this.ctx.params.id);
    this.ctx.body = {
      success: true,
      data: poi,
    };
  }
}

module.exports = PoiController;
