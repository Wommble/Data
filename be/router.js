// Single routing
import express from "express";
import {
  getUser,
  createUser,
  deleteUser,
  editUser,
  checkAccount,
} from "./users/index.js";

const usersRouter = express.Router();

usersRouter.get("/", getUser);
usersRouter.post("/user", createUser);
usersRouter.delete("/user/:id", deleteUser);
usersRouter.patch("/user/:id", editUser);
usersRouter.post("/login", checkAccount);
// /login post
// /login get
// /login put
// /login delete

// /user post
// /user get
// /user put
// /user delete

// /sada post
// /sad get
// /sdadar put
// /adelete

export default usersRouter;
