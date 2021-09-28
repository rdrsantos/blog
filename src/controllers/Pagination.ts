import {Request, Response} from 'express';
import { attachPaginate } from 'knex-paginate';
import db from '../database';
import Category from '../models/Category';
attachPaginate();

class Pagination{
  async paginate(req: Request, res: Response){
    let {page} = req.params;
    let next = true;
    const categories = await Category.get();

    if(page === '1' || page === undefined){
      page = '1';
    }

    const posts = await db('posts').orderBy('id', 'desc')
    .paginate({ perPage: 10, currentPage: Number(page), isLengthAware: true });

    if(posts.pagination.lastPage === Number(page)){
      next = false;
    }
    console.log(posts.pagination)
    res.render(
      'pagination', 
      {
        posts: posts.data, 
        categories, 
        page: Number(page), 
        next,
        lastPage: posts.pagination.lastPage
      });

  }
}

export default new Pagination;