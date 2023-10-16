import Myaxios from "../axios";

export interface ListItem {
  name: string;
  text: string;
}

export interface IResponse {
  id: number | string;
  name: string;
  password: string;
  list?: ListItem[];
}

export function signIn(
  name: string,
  password: string,
  setUser: React.Dispatch<React.SetStateAction<Partial<IResponse> | undefined>>
) {
  Myaxios.get<IResponse[]>("/get-users")
    .then((res) => {
      if (res.data.length > 0) {
        res.data.forEach((item, i) => {
          if (item.name === name && item.password === password) {
            setUser(item);
          }
        });
      }
    })
    .catch((err) => {
      console.log(err);
    });
}

export function signUp(
  name: string,
  password: string,
  setUser: React.Dispatch<React.SetStateAction<Partial<IResponse> | undefined>>
) {
  Myaxios.post("/add-user", {
    name: name,
    password: password,
  })
    .then((res) => {
      setUser(res.data);
    })
    .catch((err) => console.log(err));
}
