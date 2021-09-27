import {Request, Response} from 'express';

function auth(req: Request, res: Response, next: any){
  if(req.session.user != undefined){
    next();
  }else{
    res.redirect('/login');
  }
}

export default auth;