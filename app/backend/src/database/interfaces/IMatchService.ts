import Match from '../models/MatchModel';

export type IMatchMessage = {
  message: string
};

export type TBodyUpdate = {
  homeTeamGoals: number,
  awayTeamGoals: number
};

export type TBodyCreate = {
  homeTeamId: number,
  awayTeamId: number,
  homeTeamGoals: number,
  awayTeamGoals: number,
};

export type TBody = {
  status: number,
  message: Match | string
};

interface IMatchService {
  readAll(): Promise<Match[]>
  matchInProgress(): Promise<Match[] | Match>
  matchInProgressOff(): Promise<Match[] | Match>
  matchFinish(id: number): Promise<IMatchMessage>
  matchUpdate(body: TBodyUpdate, id: number): Promise<[number]>
  createMatch(body: TBodyCreate): Promise<TBody>
}

export default IMatchService;
