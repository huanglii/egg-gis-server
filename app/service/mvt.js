'use strict';

// app/service/user.js
const Service = require('egg').Service;

class MVTService extends Service {
  async findByBBox(tableName, layerName, bbox) {
    const sql = `
    SELECT
      ST_AsMVT(tile, '${layerName}', 4096, 'geom') AS tiles
    FROM
      (
      SELECT
        t.gid,
        ST_AsMVTGeom(t.geom, ST_MakeEnvelope(${bbox[0]}, ${bbox[1]}, ${bbox[2]}, ${bbox[3]}, 3857), 4096) AS geom 
      FROM
      (
        SELECT ST_Transform( geom, 3857) geom, gid FROM ${tableName}) t 
      ) tile
    `
    const result = await this.ctx.model.query(sql, {
      type: 'SELECT',
    });
    return result[0].tiles;
  }
}

module.exports = MVTService;
