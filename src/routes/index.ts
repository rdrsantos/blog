import express from 'express';
import PostController from '../controllers/PostController';
import CategoryController from '../controllers/CategoryController';
const routes = express.Router();
routes.use(express.json())

routes.get('/', PostController.get);
routes.get('/post/:slug', PostController.post);
routes.get('/posts/:tag', PostController.postsByCategorie);

routes.get('/admin', PostController.getAdmin)
routes.get('/admin/posts/new', PostController.addPage)
routes.post('/admin/posts/add', PostController.add)
routes.get('/admin/posts/edit/:id', PostController.editPage)
routes.post('/admin/posts/updt', PostController.update)
routes.post('/admin/posts/delete', PostController.delete)

export default routes;