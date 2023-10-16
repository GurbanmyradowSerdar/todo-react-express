import Myaxios from "../axios";
import { IResponse, ListItem } from "../service/registration";

export function addContent(list: ListItem[], id: number | string | undefined) {
  Myaxios.post(`/add-todo/${id}`, { list: list })
    .then((res) => {})
    .catch((err) => {
      console.log(err);
    });
}

export function getContent(
  id: number | string | undefined,
  setArray: React.Dispatch<React.SetStateAction<ListItem[] | undefined>>
) {
  Myaxios.get<IResponse>(`/get-content/${id}`)
    .then((res) => {
      setArray(res.data.list);
    })
    .catch((err) => {
      console.log(err);
    });
}
