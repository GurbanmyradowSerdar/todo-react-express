import { Button, Grid, TextField, Typography, Card } from "@mui/material";
import { Stack } from "@mui/system";
import React, { useEffect, useState } from "react";
import { signIn, IResponse, signUp, ListItem } from "../service/registration";
import { addContent, getContent } from "../service/todo";

interface props {
  id: number | string;
  name: string;
  password: string;
  list?: ListItem[];
}

const TodoPage = (props: Partial<props>) => {
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");
  const [array, setArray] = useState<ListItem[]>();

  useEffect(() => {
    getContent(props.id, setArray);
  }, []);

  return (
    <Stack sx={{ minHeight: "100vh" }} alignItems="center" spacing={3}>
      <Stack alignItems={"center"}>
        <Typography fontSize={"3.4rem"}>Todo list</Typography>
        <Typography fontSize={"1.3rem"}>Welcome {props.name}</Typography>
      </Stack>
      <Stack spacing={2} alignItems="center">
        <TextField
          type={"Title"}
          label="Title"
          variant="outlined"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <TextField
          type={"text"}
          label="Description"
          variant="outlined"
          value={desc}
          onChange={(e) => setDesc(e.target.value)}
        />
        <Stack direction={"row"} spacing={2}>
          <Button
            variant="contained"
            onClick={() =>
              array ? setArray([...array, { name: title, text: desc }]) : ""
            }
          >
            Add
          </Button>
          <Button
            variant="contained"
            onClick={() => (array ? addContent(array, props.id) : "")}
          >
            Save
          </Button>
        </Stack>
      </Stack>
      <Grid container spacing={1}>
        {array === undefined
          ? null
          : array.map((item, i) => {
              return (
                <Grid item key={i} xs={12} md={6} lg={4}>
                  <Card elevation={10} sx={{ padding: "20px 10px" }}>
                    <Stack
                      alignItems={"flex-start"}
                      flexWrap="wrap"
                      spacing={2}
                    >
                      <Typography>Title: {item.name}</Typography>
                      <Typography>Description : {item.text}</Typography>
                      <Button
                        variant="contained"
                        onClick={() => {
                          array
                            ? setArray([
                                ...array.slice(0, i),
                                ...array.slice(i + 1),
                              ])
                            : "";
                        }}
                      >
                        Delete
                      </Button>
                    </Stack>
                  </Card>
                </Grid>
              );
            })}
      </Grid>
    </Stack>
  );
};

const Registration = () => {
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [user, setUser] = useState<Partial<IResponse>>();

  function inn() {
    signIn(name, password, setUser);
  }

  function up() {
    signUp(name, password, setUser);
  }

  useEffect(() => {}, [user]);

  return user?.name === undefined ? (
    <Stack
      sx={{ minHeight: "100vh" }}
      alignItems="center"
      justifyContent={"center"}
    >
      <Stack
        alignItems={"center"}
        spacing={3}
        m={1}
        sx={{
          padding: "40px 20px",
          borderRadius: "20px",
        }}
      >
        <Typography fontSize={"2rem"}>Registration</Typography>
        <TextField
          type={"text"}
          label="User_name"
          variant="outlined"
          inputProps={{ style: { fontSize: "1.3rem" } }}
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <TextField
          type={"password"}
          label="Password"
          variant="outlined"
          inputProps={{ style: { fontSize: "1.3rem" } }}
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <Stack direction={"row"} spacing={2}>
          <Button variant="contained" onClick={inn}>
            Sign in
          </Button>
          <Button variant="contained" onClick={up}>
            Sign up
          </Button>
        </Stack>
      </Stack>
    </Stack>
  ) : (
    <TodoPage
      id={user.id}
      list={user.list}
      name={user.name}
      password={user.password}
    />
  );
};

export default Registration;
