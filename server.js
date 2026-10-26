require("dotenv").config();
const createApp = require("./app");
const { createMeterService } = require("./services/meters");

const meterService = createMeterService();
const app = createApp({ meterService });

const port = process.env.PORT || 3000;
app.listen(port, () =>
  console.log(`API on http://localhost:5050  (docs: /docs)`),
);
