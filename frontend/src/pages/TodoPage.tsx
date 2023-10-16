import { Button, Grid, TextField, Typography, Card } from "@mui/material";
import { Stack } from "@mui/system";
import { useEffect, useState } from "react";
import { addContent, getContent } from "../utils/todo";
import { ListItem } from "../types";

interface props {
  id: number | string;
  name: string;
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
            onClick={() => (array ? setArray([...array, { title, desc }]) : "")}
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
                      <Typography>Title: {item.title}</Typography>
                      <Typography>Description : {item.desc}</Typography>
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

export default TodoPage;
