import { ModelStatic } from 'sequelize';
import IMatchService, {
  IMatchMessage,
  TBodyCreate,
  TBodyUpdate } from '../interfaces/IMatchService';
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

  async matchUpdate(body: TBodyUpdate, id: number): Promise<[number]> {
    const updateRow = await this.model.update({ ...body }, { where: { id } });
    return updateRow;
  }

  async createMatch(body: TBodyCreate): Promise<Match> {
    const { dataValues: { id } } = await this.model.create({ ...body });
    const newMatch = await this.model.findOne({ where: { id } });
    return newMatch as Match;
  }
}

export default MatchService;
