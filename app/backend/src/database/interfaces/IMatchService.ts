import Match from '../models/MatchModel';

interface IMatchService {
  readAll(): Promise<Match[]>
}

export default IMatchService;
