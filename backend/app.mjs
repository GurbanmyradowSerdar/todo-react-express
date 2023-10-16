import express from "express";
import cors from "cors";
import { decryptPassword, sendResponseHandling } from "./utils.mjs";
import dotenv from "dotenv";
dotenv.config();

const app = express();
const PORT = 8888;
app.use(cors());
app.use(express.json({ extended: true }));
app.use(express.urlencoded({ extended: true }));

let users = [];
let id = 0;

// ! sign up
app.post("/add-user", (req, res) => {
  if (users.length > 0) {
    let isUserExist = users.some((item) => {
      return item.name === req.body.name;
    });

    if (isUserExist) {
      sendResponseHandling("User already exists", res);
    } else {
      let newUser = {
        id,
        ...req.body,
        list: [],
      };
      id++;

      users.push(newUser);
      sendResponseHandling("", res, newUser);
    }
  } else {
    let newUser = {
      id,
      ...req.body,
      list: [],
    };
    id++;
    users.push(newUser);
    sendResponseHandling("", res, newUser);
  }
  console.log(users);
});

// ! sign in
app.post("/check-user", (req, res) => {
  if (users.length === 0) {
    sendResponseHandling("User not found", res);
  } else {
    users.forEach((item) => {
      console.log(`user ${item.password} client ${req.body.password}`);
      if (
        item.name === req.body.name &&
        decryptPassword(item.password) === decryptPassword(req.body.password)
      ) {
        sendResponseHandling("", res, item);
      } else {
        sendResponseHandling("User not found", res);
      }
    });
  }
  console.log(users);
});

// ! get todos of user via id
app.get("/get-content/:id", (req, res) => {
  let id = req.params.id;
  res.json(users[id]);
});

// ! add todo item
app.post("/add-todo/:id", (req, res) => {
  let index = req.params.id;
  let temp = req.body.list;
  users[index].list.push(...temp);
  sendResponseHandling("", res, users[index].list);
});

// ! delete todo item

app.listen(PORT, () => {
  console.log(`Listening on ${PORT}`);
});
