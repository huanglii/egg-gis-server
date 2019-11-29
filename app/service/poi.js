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
  async findByBBox(bbox) {
    const sql = `
      select row_to_json(fc) geom
      from (
          select
              'FeatureCollection' as "type",
              array_to_json(array_agg(f)) as "features"
          from (
              select
                  'Feature' as "type",
                  ST_AsGeoJSON(geom, 6) :: json as "geometry",
                  (
                      select json_strip_nulls(row_to_json(t))
                      from (
                          select id, name, lng, lat
                      ) t
                  ) as "properties"
              from point
              where geom && ST_MakeBox2D(ST_Point(${bbox[0]}, ${bbox[1]}),ST_Point(${bbox[2]}, ${bbox[3]}))
          ) as f
      ) as fc;
    `;
    const result = await this.ctx.model.query(sql, {
      type: 'SELECT',
    });
    return result[0].geom;
  }
}

module.exports = PoiService;
