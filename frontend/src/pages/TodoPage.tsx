import { Button, Grid, TextField, Typography } from "@mui/material";
import { Stack } from "@mui/system";
import { useState } from "react";
import { addTodo } from "../utils/todo";
import { ITodoPageProps, ListItem } from "../types";
import TodoCard from "../components/TodoCard";

const TodoPage = (props: ITodoPageProps) => {
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");
  const [array, setArray] = useState<ListItem[]>(props.list);

  return (
    <Stack
      sx={{
        minHeight: "100vh",
        fontSize: {
          xs: "10px",
          sm: "12px",
          md: "13px",
          lg: "15px",
        },
      }}
      alignItems="center"
      gap={3}
    >
      <Stack alignItems={"center"}>
        <Typography fontSize={"3.4em"}>Todo list</Typography>
        <Typography fontSize={"1.5em"}>Welcome {props.name}</Typography>
      </Stack>
      <Stack spacing={2} alignItems="center">
        <TextField
          type={"Title"}
          label="Title"
          variant="outlined"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          inputProps={{ style: { fontSize: "1em" } }}
        />
        <TextField
          type={"text"}
          label="Description"
          variant="outlined"
          value={desc}
          onChange={(e) => setDesc(e.target.value)}
          inputProps={{ style: { fontSize: "1em" } }}
        />
        <Button
          variant="contained"
          onClick={() =>
            addTodo({
              array,
              desc,
              name: props.name,
              password: props.password,
              setArray,
              title,
            })
          }
          sx={{ fontSize: "1.1em" }}
        >
          Add
        </Button>
      </Stack>
      <Grid container spacing={2} sx={{ p: "20px" }}>
        {array.length === 0
          ? null
          : array.map((item, i) => {
              return (
                <TodoCard
                  key={i}
                  desc={item.desc}
                  title={item.title}
                  id={i}
                  name={props.name}
                  password={props.password}
                  setArray={setArray}
                />
              );
            })}
      </Grid>
    </Stack>
  );
};

export default TodoPage;
