const { Router } = require("express");
const { HttpError } = require("../errors");

function metersRouter(meterService) {
  const r = Router();

  r.get("/", async (req, res, next) => {
    try {
      const page = Math.max(parseInt(req.query.page) || 1, 1);
      const limit = Math.min(Math.max(parseInt(req.query.limit) || 20, 1), 100);
      const { items, total } = await meterService.list({
        page,
        limit,
        status: req.query.status,
      });
      res.json({ data: items, page, limit, total });
    } catch (e) {
      next(e);
    }
  });

  r.get("/:id", async (req, res, next) => {
    try {
      const meter = await meterService.getById(req.params.id);
      if (!meter)
        throw new HttpError(
          404,
          "METER_NOT_FOUND",
          `Meter ${req.params.id} not found`,
        );
      res.json(meter);
    } catch (e) {
      next(e);
    }
  });

  r.get("/:id/consumption", async (req, res, next) => {
    try {
      const { from, to } = req.query;
      if ((from && isNaN(Date.parse(from))) || (to && isNaN(Date.parse(to)))) {
        throw new HttpError(400, "BAD_DATE", "from/to must be ISO 8601 dates");
      }
      const data = await meterService.consumption(req.params.id, { from, to });
      if (!data)
        throw new HttpError(
          404,
          "METER_NOT_FOUND",
          `Meter ${req.params.id} not found`,
        );
      res.json({ meterId: req.params.id, unit: "kWh", data });
    } catch (e) {
      next(e);
    }
  });

  return r;
}
module.exports = metersRouter;
