import { Request, Response } from 'express';
import ITeamService from '../interfaces/ITeamService';

class TeamController {
  private _service: ITeamService;

  constructor(service: ITeamService) {
    this._service = service;
  }

  async readAll(req: Request, res: Response) {
    const result = await this._service.readAll();
    return res.status(200).json(result);
  }

  async getById(req: Request, res: Response) {
    const id = parseInt(req.params.id, 10);
    const result = await this._service.getById(id);
    return res.status(200).json(result);
  }
}

export default TeamController;
