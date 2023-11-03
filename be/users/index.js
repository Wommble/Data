import fs from "fs";

var getDatas = () => {
  fs.readFile("./data/user.json", "utf-8", (readError, data) => {
    if (readError) {
      response.json({
        status: "errors",
      });
    }
    var DataOfUsers = JSON.parse(data);
  });
};

export const getUser = (request, response) => {
  fs.readFile("./data/user.json", "utf-8", (readError, data) => {
    if (readError) {
      response.json({
        status: "errors",
      });
    }
    let datas = JSON.parse(data);
    response.json({ data: datas });
    console.log(getDatas);
  });
};
export const createUser = (request, response) => {
  const body = [request.body];
  fs.readFile("./data/user.json", (readError, data) => {
    let savedData = JSON.parse(data);
    if (readError) {
      response.json({
        status: "errors",
      });
    }
    body.forEach((element) => {
      const newUser = {
        id: Date.now().toString(),
        username: element?.username,
        age: element?.age,
        password: element?.password,
      };
      savedData.push(newUser);
    });

    console.log(savedData);
    fs.writeFile(
      "./data/user.json",
      JSON.stringify(savedData),
      (writeError) => {
        if (writeError) {
          response.json({ statusOfUser: writeError });
        } else {
          response.json({
            status: "success",
            data: savedData,
          });
        }
      }
    );
  });
};
export const deleteUser = (request, response) => {
  var { id } = request.params;
  fs.readFile("./data/user.json", "utf-8", (readError, data) => {
    let savedData = JSON.parse(data);
    if (readError) {
      response.json({
        status: "errors",
      });
    }
    const filteredData = savedData.filter((element) => element.id !== id);

    fs.writeFile(
      "./data/user.json",
      JSON.stringify(filteredData),
      (writeError) => {
        if (writeError) {
          response.json({ statusOfUser: writeError });
        } else {
          response.json({
            status: "success",
            data: filteredData,
          });
        }
      }
    );
  });
};
export const editUser = (request, response) => {
  const body = [request.body];
  var { id } = request.params;
  fs.readFile("./data/user.json", "utf-8", (readError, data) => {
    let savedData = JSON.parse(data);
    if (readError) {
      response.json({
        status: "errors",
      });
    }
    const filteredData = savedData.filter((element) => element.id === id);
    const newData = savedData.filter((element) => element.id !== id);
    if (
      filteredData[0].password == body[0].password &&
      id == filteredData[0].id
    ) {
      body.forEach((element) => {
        const changedUser = {
          id: id,
          username: element.username,
          age: element.age,
          password: filteredData[0].password,
        };
        newData.push(changedUser);
      });
    } else {
      res.json({ status: "error" });
      return;
    }
    fs.writeFile("./data/user.json", JSON.stringify(newData), (writeError) => {
      if (!writeError) {
        response.json({
          status: "success",
          data: newData,
        });
      }
    });
  });
};

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
