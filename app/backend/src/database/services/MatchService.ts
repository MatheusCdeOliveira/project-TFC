import { ModelStatic } from 'sequelize';
import IMatchService from '../interfaces/IMatchService';
import Match from '../models/MatchModel';
import Team from '../models/TeamModel';

class MatchService implements IMatchService {
  protected model: ModelStatic<Match> = Match;

  async readAll(): Promise<Match[]> {
    const matches = await this.model
      .findAll({
        raw: true,
        include: [
          { model: Team, as: 'homeTeam', attributes: ['teamName'] },
          { model: Team, as: 'awayTeam', attributes: ['teamName'] },
        ] });
    return matches;
  }
}

export default MatchService;
