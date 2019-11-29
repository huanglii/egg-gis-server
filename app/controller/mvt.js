'use strict';

const SphericalMercator = require('@mapbox/sphericalmercator');
const mapnik = require('mapnik');
const path = require('path');
mapnik.registerDatasource(path.join(mapnik.settings.paths.input_plugins, 'geojson.input'));

const Controller = require('egg').Controller;

class MvtController extends Controller {
  async index() {
    const { ctx } = this;
    ctx.body = 'hi, mvt';
  }
  async poi() {
    const { ctx } = this;
    const z = parseInt(ctx.params.z);
    const x = parseInt(ctx.params.x);
    const y = parseInt(ctx.params.y);
    ctx.logger.info(`tile: ${z}, ${x}, ${y}`);

    const merc = new SphericalMercator({
      size: 256,
    });

    const bbox = merc.bbox(x, y, z);
    ctx.logger.info(`bbox: ${bbox}`);
    const geojsonData = await this.ctx.service.poi.findByBBox(bbox);
    if (geojsonData.features) {
      const map = new mapnik.Map(256, 256, '+init=epsg:3857');
      const vt = new mapnik.VectorTile(z, x, y);

      vt.addGeoJSON(JSON.stringify(geojsonData), 'point');
      const data = await renderVectorTile(map, vt);
      ctx.set('Content-Type', 'application/x-protobuf');
      ctx.body = data;
    } else {
      ctx.body = null;
    }

    function renderVectorTile(map, vectorTile) {
      return new Promise((resolve, reject) => {
        map.render(vectorTile, {}, (error, tile) => {
          if (error) reject(error);
          resolve(tile.getData());
        });
      });
    }
  }
}

module.exports = MvtController;
