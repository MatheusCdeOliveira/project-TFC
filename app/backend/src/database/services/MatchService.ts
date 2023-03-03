import { ModelStatic } from 'sequelize';
import IMatchService, { IMatchMessage } from '../interfaces/IMatchService';
import Match from '../models/MatchModel';
import Team from '../models/TeamModel';

class MatchService implements IMatchService {
  protected model: ModelStatic<Match> = Match;

  async readAll(): Promise<Match[]> {
    const matches = await this.model
      .findAll({
        include: [
          { model: Team, as: 'homeTeam', attributes: ['teamName'] },
          { model: Team, as: 'awayTeam', attributes: ['teamName'] },
        ] });
    return matches;
  }

  async matchInProgress(): Promise<Match[]> {
    const inProgress = await this.model.findAll({ where: { inProgress: true },
      include: [
        { model: Team, as: 'homeTeam', attributes: ['teamName'] },
        { model: Team, as: 'awayTeam', attributes: ['teamName'] }] });
    return inProgress;
  }

  async matchInProgressOff(): Promise<Match[]> {
    const inProgress = await this.model.findAll({ where: { inProgress: false },
      include: [
        { model: Team, as: 'homeTeam', attributes: ['teamName'] },
        { model: Team, as: 'awayTeam', attributes: ['teamName'] }] });
    return inProgress;
  }

  async matchFinish(id: number): Promise<IMatchMessage> {
    await this.model.update({ inProgress: false }, { where: { id } });
    return { message: 'Finished' };
  }
}

export default MatchService;
