import db from '../database';

class Category{
  async get(){
    try{
      const categories = await db('categories').select();
      return categories;
    } catch(error){
      console.log(error);
    }
  }
}

export default new Category;