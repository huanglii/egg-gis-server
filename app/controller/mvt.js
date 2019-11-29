'use strict';

const SphericalMercator = require('@mapbox/sphericalmercator');

const Controller = require('egg').Controller;

class MvtController extends Controller {
  async index() {
    const { ctx } = this;
    const z = parseInt(ctx.params.z);
    const x = parseInt(ctx.params.x);
    const y = parseInt(ctx.params.y);
    const layerName = ctx.params.layer;
    ctx.logger.info(`tile: ${z}, ${x}, ${y}`);

    const merc = new SphericalMercator({
      size: 256,
    });

    const bbox = merc.bbox(x, y, z, false, '900913');
    ctx.logger.info(`bbox: ${bbox}`);
    const data = await this.ctx.service.mvt.findByBBox(layerName, layerName, bbox);
    ctx.body = data
  }
}

module.exports = MvtController;
