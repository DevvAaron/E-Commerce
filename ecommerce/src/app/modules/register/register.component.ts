import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth-profile/_service/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit{

  email:any ='';
  name:any ='';
  surname:any ='';
  password:any ='';
  repet_password:any ='';

  constructor(
    public authService: AuthService,
    public router: Router,
  )
  { }

  ngOnInit(): void {   
    
    if (this.authService.user) {
      this.router.navigate(["/"]);
    } 
  }

  registro(){
    if (!this.email ||
      !this.name ||
      !this.surname ||
      !this.password ||
      !this.repet_password) {
      alert("TODOS LOS CAMPOS SON REQUERIDOS");
    }
    if (this.password != this.repet_password) {
      alert("LAS CONSTRASEÑAS TIENEN QUE SER IGUALES");
    }
    let data= {
      email: this.email,
      name: this.name,
      surname: this.surname,
      password: this.password,
      repet_password: this.repet_password,
      rol: 'cliente',
    };
    this.authService.registro(data).subscribe((resp:any)=>{
      console.log(resp);
    });
  }
}
