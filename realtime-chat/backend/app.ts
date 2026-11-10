import "dotenv/config";
import express = require("express");
import cors from "cors";

import router from "./src/routes/realtimeChatRoutes"

const app = express()

app.use(cors());
app.use(express.json());
app.use(router);

const port = 3000

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})