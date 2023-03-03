import Match from '../models/MatchModel';

export type IMatchMessage = {
  message: string
};

interface IMatchService {
  readAll(): Promise<Match[]>
  matchInProgress(): Promise<Match[] | Match>
  matchInProgressOff(): Promise<Match[] | Match>
  matchFinish(id: number): Promise<IMatchMessage>
}

export default IMatchService;
