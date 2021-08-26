import { Router } from 'express';
import PostController from '../controllers/PostController';
import CategoryController from '../controllers/CategoryController';
const routes = Router();

routes.get('/', PostController.get);
routes.get('/post/:slug', PostController.post);
routes.get('/posts/:tag', PostController.postsByCategorie);

routes.get('/admin', PostController.getAdmin)
routes.get('/admin/posts/new', PostController.new)
export default routes;