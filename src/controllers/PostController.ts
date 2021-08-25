import {Request, Response} from 'express';
import Post from '../models/Post';
import Category from '../models/Category';

class PostController {

  async get(req: Request, res: Response){
    const posts = await Post.get();
    const categories = await Category.get()
    res.render('index', {posts, categories});
  }

  async post(req: Request, res: Response){
    const {slug} = req.params;
    const post = await Post.getPost(slug);
    res.render('post', {post});
  }

  async postsByCategorie(req: Request, res: Response){
    const {tag} = req.params;
    const posts = await Post.postsByCategory(tag);
    const categories = await Category.get();
    res.render('index', {posts, categories})
  }

  async getAdmin(req: Request, res: Response){
    const posts = await Post.get();
    res.render('admin/', {posts});
  }


}

export default new PostController;