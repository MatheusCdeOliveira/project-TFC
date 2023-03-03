import { Op, ModelStatic } from 'sequelize';
import IMatchService, {
  IMatchMessage,
  TBody,
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

  async createMatch(body: TBodyCreate): Promise<TBody> {
    const { homeTeamId, awayTeamId } = body;
    if (homeTeamId === awayTeamId) {
      return { status: 422, message: 'It is not possible to create a match with two equal teams' };
    }
    const teamsExist = await Team
      .findAll({ where: { id: { [Op.or]: [homeTeamId, awayTeamId] } } });
    if (teamsExist.length !== 2) {
      return { status: 404, message: 'There is no team with such id!' };
    }
    const { dataValues: { id } } = await this.model.create({ ...body });
    const newMatch = await this.model.findOne({ where: { id } });
    return { status: 201, message: newMatch } as TBody;
  }
}

export default MatchService;
