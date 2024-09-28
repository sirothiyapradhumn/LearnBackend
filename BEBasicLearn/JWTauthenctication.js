const express = require("express");
const jwt = require("jsonwebtoken");
const jwtPassword = "123456";

const app = express();
app.use(express.json());
const ALL_USERS = [
  {
    username: "sahil@gmail.com",
    password: "123",
    name: "Sahil Sirothiya",
  },
  {
    username: "raman@gmail.com",
    password: "123321",
    name: "Raman singh",
  },
  {
    username: "priya@gmail.com",
    password: "123321",
    name: "Priya kumari",
  },
];

const userExists = (username, password) => {
  return ALL_USERS.find((user) => user.username === username && user.password === password);
}

app.post("/signin", (req, res) => {
  const username = req.body.username;
  const password = req.body.password;

  if (!userExists(username, password)) {
    return res.status(403).json({
      msg: "User doesnt exist in our in memory db",
    });
  }

  var token = jwt.sign({ username: username }, jwtPassword);
  return res.json({
    token,
  });
});

app.get("/user", (req, res) => {
  const token = req.headers.authorization;
  console.log('token', token);
  try {
    const decodeed = jwt.verify(token, jwtPassword);
    const username = decodeed.username;
    const showUsers = ALL_USERS.filter((user) => user.username !== username);
    return res.json({
      users: showUsers,
    });
  } catch (err) {
    return res.status(403).json({
      msg: "Invalid token",
    })
  }
})


app.listen(8080, () => {
  console.log(`Example app listening at http://localhost:8080`);
})