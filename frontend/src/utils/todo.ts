import {
  IAddTodoArgs,
  IAddTodoResponse,
  IRemoveTodoArgs,
  ITodoGetContentArgs,
  ITodoResponse,
} from "../types";
import BaseAxios from "./connection";

export function getContent({ name, password, setArray }: ITodoGetContentArgs) {
  BaseAxios.post<any, ITodoResponse, ITodoGetContentArgs>("/get-content", {
    name,
    password,
    setArray,
  })
    .then((res) => {
      if (res.data.error) {
        alert(res.data.errorMessage);
      } else {
        setArray(res.data.body.list);
      }
    })
    .catch((err) => {
      console.log(err);
    });
}

export function addTodo(args: IAddTodoArgs) {
  BaseAxios.post<any, IAddTodoResponse, IAddTodoArgs>("/add-todo", {
    desc: args.desc,
    name: args.name,
    password: args.password,
    setArray: args.setArray,
    title: args.title,
    array: args.array,
  })
    .then((res) => {
      if (res.data.error) {
        alert(res.data.errorMessage);
      } else {
        args.array.length > 0
          ? args.setArray([...args.array, res.data.body])
          : args.setArray([res.data.body]);
      }
    })
    .catch((err) => {
      console.log(err);
    });
}

export function deleteTodo({ name, password, setArray, id }: IRemoveTodoArgs) {
  BaseAxios.post<any, ITodoResponse, IRemoveTodoArgs>(`/delete-todo/${id}`, {
    name,
    password,
    setArray,
    id,
  })
    .then((res) => {
      if (res.data.error) {
        alert(res.data.errorMessage);
      } else {
        setArray(res.data.body.list);
      }
    })
    .catch((err) => {
      console.log(err);
    });
}
