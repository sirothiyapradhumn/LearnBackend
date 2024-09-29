const express = require("express");
const mongoose = require("mongoose");
const app = express();
app.use(express.json());
mongoose.connect(
  "mongodbURL",
);

const userModal = mongoose.model("Users", {
  name: String,
  email: String,
  password: String,
});

app.post("/signUp", async (req, res) => {
  const email = req.body.username;
  const password = req.body.password;
  const name = req.body.name;

  console.log('userBody',  name, email, password );

  const userExist = await userModal.findOne({ email });
  console.log('userExist', userExist);

  if (userExist) {
    res.status(400).send("User already exist");
  }

  const user = new userModal({
    name,
    email,
    password,
  });

  console.log("user", user);

  await user.save();
  res.json({
    msg: "User created successfully",
    user: {
      name,
      email,
    }
  });
});

app.listen(8080, () => {
  console.log(`Example app listening at http://localhost:8080`);
});
