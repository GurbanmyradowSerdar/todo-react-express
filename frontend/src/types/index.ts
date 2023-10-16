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
  setUser: React.Dispatch<React.SetStateAction<Partial<IUser> | undefined>>;
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
