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
    console.log(post)
    res.render('post', {post});
  }
}

export default new PostController;