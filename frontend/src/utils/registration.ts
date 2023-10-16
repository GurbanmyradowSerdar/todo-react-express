import { ICredentials, IRegistrationArgs, IResponse } from "../types";
import { encryptPassword } from "./ciphering";
import BaseAxios from "./connection";

// ! sign in
export function signIn({ name, password, setUser }: IRegistrationArgs) {
  BaseAxios.post<any, IResponse, ICredentials>("/check-user", {
    name: name,
    password: encryptPassword(password),
  })
    .then((res) => {
      if (res.data.error) {
        alert(res.data.errorMessage);
      } else {
        setUser(res.data.body);
      }
    })
    .catch((err) => {
      console.log(err);
    });
}

// ! sign up
export function signUp({ name, password, setUser }: IRegistrationArgs) {
  BaseAxios.post<any, IResponse, ICredentials>("/add-user", {
    name: name,
    password: encryptPassword(password),
  })
    .then((res) => {
      if (res.data.error) {
        alert(res.data.errorMessage);
      } else {
        setUser(res.data.body);
      }
    })
    .catch((err) => console.log(err));
}
