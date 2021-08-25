import {Request, Response} from 'express';
import Category from '../models/Category';

class CategoryController {
  async get(req: Request, res: Response){
    const categories = await Category.get();
  }
}

export default new CategoryController;