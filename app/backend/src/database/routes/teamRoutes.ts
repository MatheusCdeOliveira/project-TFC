import { Request, Response, Router } from 'express';
import LoginController from '../controllers/LoginController';
import TeamController from '../controllers/TeamController';
import validateEmail from '../middlewares/validateEmail';
import validateLogin from '../middlewares/validateLogin';
import LoginService from '../services/loginService';
import TeamService from '../services/TeamService';
import authenticationMiddleware from '../middlewares/authValidate';

const teamRoutes = Router();
const teamService = new TeamService();
const teamController = new TeamController(teamService);
teamRoutes.get('/teams', (req: Request, res: Response) => teamController.readAll(req, res));
teamRoutes.get('/teams/:id', (req: Request, res: Response) => teamController.getById(req, res));

const loginRoutes = Router();
const loginService = new LoginService();
const loginController = new LoginController(loginService);
loginRoutes.post(
  '/',
  validateLogin,
  validateEmail,
  (req: Request, res: Response) => loginController.login(req, res),
);

loginRoutes.get(
  '/role',
  authenticationMiddleware,
  (req: Request, res: Response) => loginController.authenticateLogin(req, res),
);

export default teamRoutes;
export { loginRoutes };
