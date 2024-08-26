import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { URL_SERVICIOS } from 'src/app/config/config';
import { map, catchError} from 'rxjs/operators';
import { of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  token:any = null;
  user:any = null;

  constructor(
    private http: HttpClient,
    private router: Router,
  ) {
    this.getlocalStorage();
  }

  getlocalStorage(){
    if (localStorage.getItem("token")) {
      this.token = localStorage.getItem("token");
      this.user = JSON.parse(localStorage.getItem("user") ?? '');
    }else{
      this.token = null;
      this.user = null;
    }
  }

  login(email:string, password: string){
    let URL = URL_SERVICIOS + "users/login";
    return this.http.post(URL, {email,password}).pipe(
      map((resp: any) =>{
        if (resp.USER_FRONTEND.token && resp.USER_FRONTEND.token) {
          //Almacenar el token en el local storage
          return this.localStorageSave(resp.USER_FRONTEND);
        }else{
          //Devuelveme el status 
          return resp;
        }
      }),
      catchError((erro:any)=>{
        console.log(erro);
        return of(erro);
      })
    )
  }

  localStorageSave(USER_FRONTEND:any){
    localStorage.setItem("token",USER_FRONTEND.token);
    localStorage.setItem("user", JSON.stringify(USER_FRONTEND.user));
    return true;
  }


  registro(data:any){
    let URL = URL_SERVICIOS + "users/register";
    return this.http.post(URL, data)
  }

  logout(){
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    this.router.navigate(["auth/login"]);
  }
}
