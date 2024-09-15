const express = require("express");
const router = express.Router();
const db = require("../base-orm/sequelize-init");
const { Op, ValidationError } = require("sequelize");



router.get("/api/acciones", async function (req, res) {

  let where = {};

  if (req.query.Denominacion != undefined && req.query.Denominacion !== "") {
    where.Denominacion = {
      [Op.like]: "%" + req.query.Denominacion + "%",
    };
  }
  if (req.query.Vigente != undefined && req.query.Vigente !== "") {
    where.Vigente = req.query.Vigente === "true";
  }
  if (req.query.min != undefined && req.query.min !== "" && req.query.max != undefined && req.query.max !== "") {
    where.Ranking = {
      [Op.between]: [req.query.min, req.query.max], // Utiliza el operador "between" para definir el rango
      };
  }

  if (req.query.Region !== undefined && req.query.Region !== "") {
    where.Origen = {[Op.eq]: await numeroRegion(req.query.Region)}
  }

  let items = await db.Acciones.findAndCountAll({
    attributes: [
      "IdAccion",
      "Denominacion",
      "Ranking",
      "Vigente",
      "Origen",
    ],
    where,
  });

  res.json(items.rows);
});

const numeroRegion = async(nombre) => {
  let where = {}
  where.Region = {[Op.like]: "%" + nombre + "%"};

  let region = await db.Regiones.findOne({
    attributes: [
      "IdRegion",
      "Region"
    ],
    where
  });
  console.log(region.Region)
  return region.IdRegion + 9

}

module.exports = router;