import express from "express";
import cors from "cors";
import {
  checkCredentials,
  decryptPassword,
  sendResponseHandling,
} from "./utils.mjs";
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
});

// ! sign in
app.post("/check-user", (req, res) => {
  if (users.length === 0) {
    sendResponseHandling("User not found", res);
  } else {
    users.forEach((item) => {
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
});

// ! get todos of user via id
app.post("/get-content", (req, res) => {
  if (users.length === 0) {
    sendResponseHandling("there is no any users", res);
  } else {
    let userIndex = users.findIndex((user) =>
      checkCredentials(
        user.name,
        user.password,
        req.body.name,
        req.body.password
      )
    );
    if (userIndex === -1) {
      sendResponseHandling("user not found", res);
    } else {
      sendResponseHandling("", res, { list: users[userIndex].list });
    }
  }
});

// ! add todo item
app.post("/add-todo", (req, res) => {
  if (users.length === 0) {
    sendResponseHandling("there is no any users", res);
  } else {
    let userIndex = users.findIndex((user) =>
      checkCredentials(
        user.name,
        user.password,
        req.body.name,
        req.body.password
      )
    );
    if (userIndex === -1) {
      sendResponseHandling("user not found", res);
    } else {
      let todo = {
        title: req.body.title,
        desc: req.body.desc,
      };
      users[userIndex].list.push(todo);
      sendResponseHandling("", res, todo);
    }
  }
});

// ! delete todo item
app.post("/delete-todo/:id", (req, res) => {
  let id = req.params.id;
  if (users.length === 0) {
    sendResponseHandling("there is no any users", res);
  } else {
    let userIndex = users.findIndex((user) =>
      checkCredentials(
        user.name,
        user.password,
        req.body.name,
        req.body.password
      )
    );
    if (userIndex === -1) {
      sendResponseHandling("user not found", res);
    } else {
      users[userIndex].list.splice(id, 1);
      sendResponseHandling("", res, { list: users[userIndex].list });
    }
  }
});

app.listen(PORT, () => {
  console.log(`Listening on ${PORT}`);
});
