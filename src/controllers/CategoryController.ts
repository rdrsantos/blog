import {Request, Response} from 'express';
import Category from '../models/Category';

class CategoryController {
  async get(req: Request, res: Response){
    const categories = await Category.get();
    res.render('admin/categories', {categories});
  }

  async newPage(req: Request, res: Response){
    res.render('admin/categories/new');
  }

  async add(req: Request, res: Response){
    const {title} = req.body;
    const exist = await Category.findByTitle(title);
    if(exist){
      res.status(400).send('Titulo já existe!');
      return;
    }else{
      const status = await Category.new(title, title);
      if(status.status){
        res.redirect('/admin/categories');
      }else{
        res.status(400).send('Erro interno');
      }
    }
  }

  async editPage(req: Request, res: Response){
    const {id} = req.params;
    const category = await Category.findById(Number(id));
    res.render('admin/categories/edit', {category});
  }

  async update(req: Request, res: Response){
    const {id, title} = req.body;
    const result = await Category.update(Number(id), title, title);
    if(result.status){
      res.redirect('/admin/categories');
    }else{
      res.status(404).send("error")
    }
  }

  async delete(req: Request, res: Response){
    const {id} = req.body;
    const exist = await Category.findById(id);
    if(exist){
      await Category.delete(id);
      res.redirect('/admin/categories')
    }else{
      res.status(404).send('Usuario não encontrado');
    }
  }
}

export default new CategoryController;