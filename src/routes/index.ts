import { Router } from 'express';
import PostController from '../controllers/PostController';
import CategoryController from '../controllers/CategoryController';
const routes = Router();

routes.get('/', PostController.get);
routes.get('/post/:slug', PostController.post);

export default routes;