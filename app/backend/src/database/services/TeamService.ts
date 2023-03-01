import { ModelStatic } from 'sequelize';
import ITeamService from '../interfaces/ITeamService';
import Team from '../models/TeamModel';

export default class TeamService implements ITeamService {
  protected model: ModelStatic<Team> = Team;

  async readAll(): Promise<Team[]> {
    return this.model.findAll({ raw: true });
  }

  async getById(id: number): Promise<Team> {
    const result = await this.model.findOne({ where: { id } });
    return result as Team;
  }
}
