import { Request, Response, Router } from 'express';
import MatchController from '../controllers/MatchController';
import authenticationMiddleware from '../middlewares/authValidate';
import MatchService from '../services/MatchService';

const matchRoutes = Router();
const matchService = new MatchService();
const matchController = new MatchController(matchService);
matchRoutes.get('/', (req: Request, res: Response) => {
  if (req.query.inProgress === 'true') return matchController.matchInProgress(req, res);
  if (req.query.inProgress === 'false') return matchController.matchInProgressOff(req, res);
  return matchController.readAll(req, res);
});
matchRoutes.patch(
  '/:id/finish',
  authenticationMiddleware,
  (req: Request, res: Response) => matchController.matchFinish(req, res),
);

matchRoutes.patch(
  '/:id',
  authenticationMiddleware,
  (req: Request, res: Response) => matchController.matchUpdate(req, res),
);

matchRoutes.post(
  '/',
  authenticationMiddleware,
  (req: Request, res: Response) => matchController.createMatch(req, res),
);

export default matchRoutes;
