import db from '../database';

class Category{
  async get(){
    try{
      const categories = await db('categories').select().orderBy('title', 'asc');
      return categories;
    } catch(error){
      console.log(error);
    }
  }

  async new(title: string, tag: string){
    try {
      await db('categories').insert({title, tag});
      return {status: true};
    } catch (error) {
      console.log(error);
      return {status: false};
    }
  }

  async findById(id: number){
    try {
      const category = await db('categories').select().where({id});
      return category.length ? category[0] : undefined;
    } catch (error) {
      console.log(error);
    }
  }

  async findByTitle(title: string){
    title = title.trim();
    try {
      const category = await db('categories').select().where({title});
      return category.length ? category[0] : undefined;
    } catch (error) {
      console.log(error);
      return undefined;
    }
  }

  async update(id: number, title: string, tag: string){
    try {
      await db('categories').update({title, tag}).where({id});
      return {status: true};
    } catch (error) {
      console.log(error);
      return{ status: false};
    }
  }

  async delete(id: number){
    try {
      await db('categories').del().where({id});
    } catch (error) {
      console.log(error);
    }
  }
}

export default new Category;