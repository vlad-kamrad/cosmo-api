import { Router } from "express";
import fs from "fs/promises";
import path from "path";

import { authenticateToken as authorized } from "../middlewares/auth";

const router = Router();
const swaggerDocument = path.join(__dirname, "../../swagger.json");

router.get("/api-docs", authorized, async (_, res) => {
  // #swagger.ignore = true

  const configData = await fs.readFile(swaggerDocument, "utf-8");
  res.json(JSON.parse(configData));
});

export default router;
