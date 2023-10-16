import BaseAxios from "./connection";
import { IResponse, ListItem } from "./registration";

export function addContent(list: ListItem[], id: number | string | undefined) {
  BaseAxios.post(`/add-todo/${id}`, { list: list })
    .then((res) => {})
    .catch((err) => {
      console.log(err);
    });
}

export function getContent(
  id: number | string | undefined,
  setArray: React.Dispatch<React.SetStateAction<ListItem[] | undefined>>
) {
  BaseAxios.get<IResponse>(`/get-content/${id}`)
    .then((res) => {
      setArray(res.data.list);
    })
    .catch((err) => {
      console.log(err);
    });
}
