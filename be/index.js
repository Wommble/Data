import express from "express";
import cors from "cors";
import usersRouter from "./router.js";

const port = 8080;
const app = express();

app.use(cors());
app.use(express.json());

app.use("/", usersRouter);

app.listen(port, () => {
  console.log(`its running on http://localhost:${port}`);
});
