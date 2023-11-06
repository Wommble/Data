import fs from "fs";
export const checkAccount = (req, res) => {
  const body = req.body;
  fs.readFile("./data/user.json", (readError, data) => {
    let savedData = JSON.parse(data);
    if (readError) {
      res.json({
        status: "errors",
      });
    }

    let correctPassword = false;
    savedData.forEach((cur) => {
      if (body.username == cur.username && body.password == cur.password) {
        correctPassword = true;
      }
    });

    if (correctPassword) res.json({ status: true });
    else res.json({ status: false });
  });
};
export const checkIfLogin = (req, res, next) => {
  console.log(req.body.headers);
  if (req.headers.token) {
    next();
  } else res.status(401).json({ response: "Please loging first" });
};
