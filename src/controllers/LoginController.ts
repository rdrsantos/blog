import {request, Request, Response} from 'express';
import User from '../models/User';
// import session from 'express-session';

declare module 'express-session' {
  export interface SessionData {
    user: { [key: string]: any };
  }
}

class LoginController{
  index(req: Request, res: Response){
    res.render('login');
  }

  async auth(req: Request, res: Response){
    const {email, password} = req.body;
    const user = await User.loggin(email, password);
    if(user){
      req.session.user = {
        id: user.id,
        name: user.name,
        email: user.email,
      }
      res.redirect('/admin')
    }else{
      res.redirect('/login');
    }

    res.send('fooi')
  }

  async logout(req: Request, res: Response){
    if (req.session) {
      req.session.destroy(err => {
        if (err) {
          res.status(400).send('Unable to log out')
        } else {
          res.redirect('/');
        }
      });
    } else {
      res.end()
    }
  }
}

export default new LoginController;