import Team from '../models/TeamModel';

export default interface ITeamService {
  readAll(): Promise<Team[]>
  getById(id: number): Promise<Team>
}
