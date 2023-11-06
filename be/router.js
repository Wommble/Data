import express from "express";

import {
  getUser,
  createUser,
  deleteUser,
  editUser,
  // allowuser,
} from "./users/index.js";
import { checkAccount, checkIfLogin } from "./login/index.js";

export const usersRouter = express.Router();
export const limitedRouter = express.Router();

usersRouter.get("/", getUser);
usersRouter.post("/user", createUser);
usersRouter.post("/login", checkAccount);

limitedRouter.use(checkIfLogin);
limitedRouter.delete("/user/:id", deleteUser);
limitedRouter.patch("/user/:id", editUser);

// export default { usersRouter, limitedRouter };
