const express = require("express");
const swaggerUi = require("swagger-ui-express");
const openapi = require("./openapi.json");
const metersRouter = require("./routes/meters");
const { errorHandler } = require("./errors");

function createApp({ meterService }) {
  const app = express();
  app.get("/health", (_, res) => res.json({ status: "ok" }));
  app.get("/openapi.json", (_, res) => res.json(openapi));
  app.use("/docs", swaggerUi.serve, swaggerUi.setup(openapi));
  app.use("/api/v1/meters", metersRouter(meterService));
  app.use(errorHandler);
  return app;
}
module.exports = createApp;
