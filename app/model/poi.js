'use strict';

// sequelize-auto -o "./app/model" -d postgis_25_sample -h localhost -u postgres -p 5432 -x admin -e postgres -t point -s public
module.exports = app => {
  const { BIGINT, STRING, DOUBLE, GEOMETRY } = app.Sequelize;

  const Poi = app.model.define('point', {
    id: {
      type: BIGINT,
      allowNull: false,
      primaryKey: true,
    },
    name: {
      type: STRING,
      allowNull: true,
    },
    lng: {
      type: DOUBLE,
      allowNull: true,
    },
    lat: {
      type: DOUBLE,
      allowNull: true,
    },
    geom: {
      type: GEOMETRY,
    },
  }, {
    tableName: 'point',
    timestamps: false, // 去除createAt updateAt
  });

  return Poi;
};
