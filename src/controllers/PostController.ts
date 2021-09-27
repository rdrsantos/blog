import {Request, Response} from 'express';
import Post from '../models/Post';
import Category from '../models/Category';
import slugify from 'slugify';

class PostController {

  async get(req: Request, res: Response){
    const posts = await Post.get();
    const categories = await Category.get();
    res.render('index', {posts, categories});
  }

  async post(req: Request, res: Response){
    const {slug} = req.params;
    const post = await Post.getBySlug(slug);
    res.render('post', {post});
  }

  async postsByCategorie(req: Request, res: Response){
    const {tag} = req.params;
    const posts = await Post.postsByCategory(tag);
    const categories = await Category.get();
    res.render('index', {posts, categories})
  }

  async getAdmin(req: Request, res: Response){
    const posts = await Post.adminGet();
    res.render('admin/', {posts});
  }

  async addPage(req: Request, res: Response){
    const categories = await Category.get()
    res.render('admin/posts/new', {categories, error: false});
  }

  async add(req: Request, res: Response){
    const {title, body, category: category_id} = req.body;
    let slug = slugify(title);
    const result = await Post.new(title, slug, body, category_id);
    if(result.status){
      res.redirect('/admin');
    }else{
      const categories = await Category.get()
      res.render('admin/posts/new', {categories, error: result.err});
    }    
  }

  async editPage(req: Request, res: Response){
    const { id } = req.params;
    const post = await Post.getById(Number(id));
    const categories = await Category.get();
    res.render('admin/posts/edit', {post, categories})
  }

  async update(req: Request, res: Response){
    const {id, title, category, body} = req.body;
    await Post.update(Number(id), title, slugify(title), body, category);
    res.redirect('/admin');
  }

  async delete(req: Request, res: Response){
    const {id} = req.body;
    const result = await Post.delete(Number(id));
    if(result.status){
      res.redirect('/admin');
    }else{
      res.status(400).send('Ocorreu um erro')
    }
  }
}

export default new PostController;