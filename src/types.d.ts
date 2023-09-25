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
  prev_total_score: number;
  prev_average: number;
  rank: number;
}

export interface ITinyRegularGameScore {
  score1: number;
  score2: number;
  score3: number;
  score4: number;
  total_score: number;
  game_count: number;
  average: number;
  high_low: number;
  rank: number;
  participant_count: number;
  date: IRegularGameDate;
}

export interface IPasswordLoginVariables {
  username: string;
  password: string;
}

export interface IMyRecords {
  name: string;
  avatar: string;
  gender: string;
  birth_date: string;
  join_date: string;
  position: string;
  first_regular_game_date: string;
  continuous_days: number;
  total_regular_game_count: number;
  total_game_count: number;
  total_total_score: number;
  total_average: number;
  max_score: number;
  min_score: number;
  max_rank: number;
  max_rank_count: number;
  participation_rate: number;
  average_area: number[];
  regular_game_scores: ITinyRegularGameScore[];
}

export interface IDateScoreRank {
  date: string;
  score: number;
  rank: number;
}

export interface IEditMyPage {
  name: string;
  // gender: string;
  // position: string;
  phone_number: string;
  email: string;
  birth_date: string;
  join_date: string;
}
