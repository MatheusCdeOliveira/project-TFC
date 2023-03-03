import Match from '../models/MatchModel';

export type IMatchMessage = {
  message: string
};

export type TBody = {
  homeTeamGoals: number,
  awayTeamGoals: number
};

interface IMatchService {
  readAll(): Promise<Match[]>
  matchInProgress(): Promise<Match[] | Match>
  matchInProgressOff(): Promise<Match[] | Match>
  matchFinish(id: number): Promise<IMatchMessage>
  matchUpdate(body: TBody, id: number): Promise<[number]>
}

export default IMatchService;
