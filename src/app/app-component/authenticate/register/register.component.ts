import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/app-service/auth-service/auth.service';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  userData;
  constructor(private _auth : AuthService, private _route : Router) { }
  
  ngOnInit(): void {
    this.userData = {
      "user" : {
        "username" : '' ,
        "first_name" : '' ,
        "last_name" : '' ,
        "email" : '',
        "password" : ''
      }
    }
  }

  signUp(){
    this._auth.Register(this.userData).subscribe(
      signUpResponse => {
        localStorage.setItem('Token', signUpResponse.key)
        localStorage.setItem('user', signUpResponse.user.toString())
        console.log(signUpResponse)
      },
      signUpError => {
        console.log(signUpError)
        alert(signUpError.error)
      },
      () => {
        console.log("Sign up Successful")
        this._route.navigate(['login'])
      }
    )
  }

}
