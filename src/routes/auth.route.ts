import { Router } from "express";
import { isRootAdminUser, generateAccessToken } from "../middlewares/auth";

const router = Router();

router.post("/login", (req, res) => {
  // #swagger.description = 'Receive credentials and returns jwt'
  // #swagger.requestBody = { required: true, schema: { $ref: "#/definitions/auth_login_req" } }

  const { username, password } = req?.body || {};

  if (!isRootAdminUser(username, password)) {
    return res.sendStatus(403);
  }

  return res.json(generateAccessToken({ username }));
});

export default router;
