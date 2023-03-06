import { Request, Response, Router } from 'express';
import LeaderboardController from '../controllers/LeaderboardController';
import Leaderboard from '../services/LeaderboardService';

const leaderboardRouter = Router();
const leaderboardService = new Leaderboard();
const leaderboardControl = new LeaderboardController(leaderboardService);

leaderboardRouter.get(
  '/home',
  (req: Request, res: Response) => leaderboardControl.getMatches(req, res),
);

export default leaderboardRouter;
