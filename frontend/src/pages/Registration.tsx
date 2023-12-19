import { Button, TextField, Typography } from "@mui/material";
import { Stack } from "@mui/system";
import { useState } from "react";
import { signIn, signUp } from "../utils/registration";
import TodoPage from "./TodoPage";
import { IUser } from "../types";
import { encryptPassword } from "../utils/ciphering";

const Registration = () => {
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [user, setUser] = useState<IUser>();

  return user?.name === undefined ? (
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
        <Typography fontSize={"2.5em"}>Registration</Typography>
        <TextField
          type={"text"}
          label="User_name"
          variant="outlined"
          inputProps={{ style: { fontSize: "1.1em" } }}
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <TextField
          type={"password"}
          label="Password"
          variant="outlined"
          inputProps={{ style: { fontSize: "1.1em" } }}
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <Stack direction={"row"} spacing={2}>
          <Button
            sx={{ fontSize: "1.2em" }}
            variant="contained"
            onClick={() =>
              signIn({
                name,
                password,
                setUser,
              })
            }
          >
            Sign in
          </Button>
          <Button
            sx={{ fontSize: "1.2em" }}
            variant="contained"
            onClick={() => signUp({ name, password, setUser })}
          >
            Sign up
          </Button>
        </Stack>
      </Stack>
    </Stack>
  ) : (
    <TodoPage
      id={user.id}
      list={user.list || []}
      name={user.name}
      password={encryptPassword(password)}
    />
  );
};

export default Registration;
