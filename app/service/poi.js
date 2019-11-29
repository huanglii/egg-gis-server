'use strict';

// app/service/user.js
const Service = require('egg').Service;

class PoiService extends Service {
  async findById(id) {
    const poi = await this.ctx.model.Poi.findByPk(id);
    return poi;
  }
  async findAll() {
    const pois = await this.ctx.model.Poi.findAll();
    return pois;
  }
}

module.exports = PoiService;
