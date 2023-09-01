export interface IRegularGameDate {
  id: number;
  round_of_game: number;
  date: string;
}

export interface IUser {
  id: number;
  last_login: string;
  username: string;
  email: string;
  name: string;
  avatar: string;
  gender: string;
  birth_date: string;
  join_date: string;
  position: string;
  phone_number: string;
}

export interface IPasswordLoginVariables {
  username: string;
  password: string;
}
