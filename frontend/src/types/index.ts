// ! user var
export interface IUser {
  id: number;
  name: string;
  list?: ListItem[];
}

// ! sign in and sign up
export interface IRegistrationArgs {
  name: string;
  password: string;
  setUser: React.Dispatch<React.SetStateAction<IUser | undefined>>;
}

export interface ICredentials {
  name: string;
  password: string;
}

export interface ListItem {
  title: string;
  desc: string;
}

export interface IResponse {
  data: {
    body: {
      id: number;
      name: string;
      list?: ListItem[];
    };
    error: boolean;
    errorMessage: string;
  };
}

// ! todo page
export interface ITodoPageProps {
  id: number | string;
  name: string;
  password: string;
  list: ListItem[];
}

export interface ITodoGetContentArgs {
  name: string;
  password: string;
  setArray: React.Dispatch<React.SetStateAction<ListItem[]>>;
}

export interface IAddTodoArgs extends ITodoGetContentArgs {
  title: string;
  desc: string;
  array: ListItem[];
}

export interface IRemoveTodoArgs extends ITodoGetContentArgs {
  id: number;
}

export interface IAddTodoResponse {
  data: {
    body: {
      title: string;
      desc: string;
    };
    error: boolean;
    errorMessage: string;
  };
}

export interface ITodoResponse {
  data: {
    body: {
      list: ListItem[];
    };
    error: boolean;
    errorMessage: string;
  };
}

// ! todo card copmonent
export interface ITodoCard {
  title: string;
  desc: string;
  id: number;
  name: string;
  password: string;
  setArray: React.Dispatch<React.SetStateAction<ListItem[]>>;
}
