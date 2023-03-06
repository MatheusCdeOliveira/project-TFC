import { Request, Response } from 'express';
import ILeaderboardService from '../interfaces/ILeaderboardService';

class LeaderboardController {
  private _service: ILeaderboardService;

  constructor(service: ILeaderboardService) {
    this._service = service;
  }

  async getMatches(req: Request, res: Response) {
    const result = await this._service.getMatches();
    return res.status(200).json(result);
  }
}

export default LeaderboardController;
