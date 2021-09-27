import db from '../database';
class User {
  async get(){
    try {
      const users = await db('users').select();
      (users.length) ? users : undefined;
    } catch (error) {
      console.log(error);
    }
  }

  async loggin(email: string, password: string){
    const user = await db('users').select().where({email, password});
    if(user.length){
      return user[0];
    }else{
      return undefined;
    }
  }
}

export default new User;