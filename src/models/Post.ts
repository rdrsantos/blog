import db from '../database';

class Posts{

  async get(){
    try{
      const posts = await db('posts').select().orderBy('id', 'desc');
      return posts;
    } catch(error){
      console.log(error);
    }
  }

  async adminGet(){
    try{
      const posts = await db('posts').innerJoin('categories', 'posts.category_id', 'categories.id')
      .select('posts.*', 'categories.title as category_name').orderBy('title', 'asc');
      return posts;
    } catch(error){
      console.log(error);
    }
  }

  async getById(id: number){
    try {
      const post = await db('posts').select().where({id});
      return post[0];
    } catch (error) {
      console.log(error);
      return undefined;
    }
  }

  async getBySlug(slug: string){
    try{
      const post = await db('posts').innerJoin('categories', 'posts.category_id', 'categories.id')
      .select('posts.*', 'categories.title as cat_name ').where({slug});
      return post[0];
    } catch(error){
      console.log(error);
    }
  }

  async postsByCategory(category: string){
    try {
      const posts = await db('posts').select('posts.*').innerJoin('categories', 'posts.category_id', 'categories.id').where('categories.tag', category);
      return posts;
    } catch (error) {
      console.log(error);
    }
  }

  async new(title: string, slug: string, body: string, category_id: number){
    try {
      await db('posts').insert({title, slug, body, category_id});
      return true;
    } catch (error) {
      console.log(error);
      return undefined;
    }
  }

  async update(id: number, title: string, slug: string, body: string, category_id: string){
    try {
      await db('posts').update({title, slug, body, category_id}).where({id});
      return true;
    } catch (error) {
      console.log(error);
      return false;
    }
  }

  async delete(id: number){
    const exist = await this.getById(id);
    if(exist){
      try {
        await db('posts').del().where({id});
        return {status: true};
      } catch (error) {
        console.log(error);
        return {status: false, err: 'Ocorreu um erro interno'};
      }
    } else{
      return {status: false, err: 'Usuario não existe'}
    }
  }
}

export default new Posts;