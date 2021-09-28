import express from 'express';
import PostController from '../controllers/PostController';
import CategoryController from '../controllers/CategoryController';
import LoginController from '../controllers/LoginController';
import auth from '../middlewares/auth';
import Pagination from '../controllers/Pagination';
const routes = express.Router();

routes.get('/', PostController.get);
routes.get('/post/:slug', PostController.post);
routes.get('/posts/:tag', PostController.postsByCategorie);

routes.get('/admin', auth , PostController.getAdmin)
routes.get('/admin/posts/new', auth ,PostController.addPage)
routes.post('/admin/posts/add', auth , PostController.add)
routes.get('/admin/posts/edit/:id', auth ,PostController.editPage)
routes.post('/admin/posts/updt', auth ,PostController.update)
routes.post('/admin/posts/delete', auth ,PostController.delete)

//admin categories
routes.get('/admin/categories', auth ,CategoryController.get)
routes.get('/admin/categories/new', auth ,CategoryController.newPage)
routes.post('/admin/categories/add', auth ,CategoryController.add)
routes.post('/admin/categories/delete', auth ,CategoryController.delete)
routes.get('/admin/categories/edit/:id', auth ,CategoryController.editPage)
routes.post('/admin/categories/updt', auth ,CategoryController.update)

//login
routes.get('/login', LoginController.index)
routes.post('/auth', LoginController.auth)
routes.get('/logout', LoginController.logout)

routes.get('/page/:page', Pagination.paginate)

export default routes;