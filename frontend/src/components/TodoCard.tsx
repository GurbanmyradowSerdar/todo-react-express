import { Grid, Typography, Stack, Card, Button } from "@mui/material";
import { deleteTodo } from "../utils/todo";
import { ITodoCard } from "../types";

const TodoCard = (props: ITodoCard) => {
  return (
    <Grid item xs={12} md={6} lg={4}>
      <Card elevation={8} sx={{ padding: "20px 10px" }}>
        <Stack alignItems={"flex-start"} flexWrap="wrap" spacing={2}>
          <Typography sx={{ fontSize: "1.5em" }}>
            Title: {props.title}
          </Typography>
          <Typography sx={{ fontSize: "1.5em" }}>
            Description : {props.desc}
          </Typography>
          <Button
            variant="contained"
            onClick={() =>
              deleteTodo({
                id: props.id,
                name: props.name,
                password: props.password,
                setArray: props.setArray,
              })
            }
            sx={{ fontSize: "1.1em" }}
          >
            Delete
          </Button>
        </Stack>
      </Card>
    </Grid>
  );
};

export default TodoCard;
