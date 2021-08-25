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

  async getPost(slug: string){
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
}

export default new Posts;