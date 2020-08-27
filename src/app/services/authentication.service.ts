import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  private users=[
    {username:'admin',password:'1234', roles:['ADMIN','USER']},
    {username:'user1',password:'1234', roles:['USER']},
    {username:'user2',password:'1234', roles:['USER']},
  ];
  public isAuthenticated:boolean;
  public userAutneticated;
  public token:string;

  constructor() { }

  public login(username:string, password:string){
    let user=undefined;
    this.users.forEach(u=>{
      if(u.username==username && u.password==password){
       user=u;
       this.token=btoa(JSON.stringify({username:u.username,roles:u.roles})) ;
      }
    });
    if(user){
      this.isAuthenticated=true;
      this.userAutneticated=user;
    }else{
      this.isAuthenticated=false;
      this.userAutneticated=undefined;
    }
  }
  public isAdmin(){
    if(this.userAutneticated.roles.indexOf('ADMIN')>-1){
      return true;
    }
    return false;
  }
  public saveAuthenticatedUser(){
    if(this.userAutneticated){
      localStorage.setItem('authToken',this.token);
    }
  }
  public loadAuthenticatedUserFromLocalStorage(){
    let t = localStorage.getItem('authToken');
    if(t){
      let user = JSON.parse(atob(t));
      this.userAutneticated= {username:user.username, roles:user.roles};
    this.isAuthenticated=true;
    this.token=t;
    }

  }
  public removeTokenFromLocalStorage(){
    localStorage.removeItem('authToken');
    this.token = undefined;
    this.isAuthenticated = false;
    this.userAutneticated =undefined;
  }
}
