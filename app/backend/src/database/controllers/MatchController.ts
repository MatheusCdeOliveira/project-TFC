import { Request, Response } from 'express';
import IMatchService from '../interfaces/IMatchService';

class MatchController {
  private _service: IMatchService;

  constructor(service: IMatchService) {
    this._service = service;
  }

  async readAll(req: Request, res: Response) {
    try {
      const result = await this._service.readAll();
      return res.status(200).json(result);
    } catch (err) {
      const error = err as Error;
      return res.status(500).json({ message: error.message });
    }
  }

  async matchInProgress(req: Request, res: Response) {
    try {
      const result = await this._service.matchInProgress();
      return res.status(200).json(result);
    } catch (err) {
      const error = err as Error;
      return res.status(500).json({ message: error.message });
    }
  }

  async matchInProgressOff(req: Request, res: Response) {
    try {
      const result = await this._service.matchInProgressOff();
      return res.status(200).json(result);
    } catch (err) {
      const error = err as Error;
      return res.status(500).json({ message: error.message });
    }
  }

  async matchFinish(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const result = await this._service.matchFinish(Number(id));
      return res.status(200).json(result);
    } catch (err) {
      const error = err as Error;
      return res.status(500).json({ message: error.message });
    }
  }
}

export default MatchController;
