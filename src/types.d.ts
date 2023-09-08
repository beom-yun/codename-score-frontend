export interface IRegularGameDate {
  id: number;
  round_of_game: number;
  date: string;
  num_of_bowlers: number;
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

export interface IBowler {
  pk: number;
  username: string;
  name: string;
  avatar: string;
  position: string;
}

export interface IRegularGameScore {
  bowler: IBowler;
  score1: number;
  score2: number;
  score3: number;
  score4: number;
  total_score: number;
  game_count: number;
  average: number;
  high_low: number;
}

export interface IPasswordLoginVariables {
  username: string;
  password: string;
}
