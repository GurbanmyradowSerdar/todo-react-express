import express from "express";
import cors from "cors";

const app = express();
const PORT = 8888;
app.use(cors());
app.use(express.json({ extended: true }));
app.use(express.urlencoded({ extended: true }));

let users = [];
let id = 0;

app.get("/get-users", (req, res) => {
  res.json(users);
});

app.get("/get-content/:id", (req, res) => {
  let id = req.params.id;
  res.json(users[id]);
});

app.post("/add-user", (req, res) => {
  if (users.length > 0) {
    let result = users.some((item, index) => {
      return item.name === req.body.name && item.password === req.body.password;
    });
    if (!result) {
      let newUser = {
        id: id,
        ...req.body,
        list: [],
      };
      id++;

      users.push(newUser);
      res.json(newUser);
    }
  } else {
    let newUser = {
      id: id,
      ...req.body,
      list: [],
    };
    id++;

    users.push(newUser);
    res.json(newUser);
  }
});

app.post("/add-todo/:id", (req, res) => {
  let index = req.params.id;
  let temp = req.body.list.map((item, i) => {
    return item;
  });
  users[index].list.push(...temp);
  res.json(users[index].list);
});

app.listen(PORT, () => {
  console.log(`Listening on ${PORT}`);
});
