import { Component, OnInit } from '@angular/core';
import {FirebaseTSAuth} from 'firebasets/firebasetsAuth/firebaseTSAuth'
@Component({
  selector: 'app-authenticator',
  templateUrl: './authenticator.component.html',
  styleUrls: ['./authenticator.component.scss']
})
export class AuthenticatorComponent implements OnInit {
state = AuthenticatorCompState.LOGIN
firebasetsAuth:FirebaseTSAuth;
  constructor() {
    this.firebasetsAuth = new FirebaseTSAuth();
   }

  ngOnInit(): void {
  }

  onResetClick(resetEmail:HTMLInputElement,){
    let email=resetEmail.value;
    if(
      this.isNotEmpty(email)
    )
    this.firebasetsAuth.sendPasswordResetEmail(
      {
        email:email,
        onComplete:(complete) =>{
          alert(`Reset email sent to ${email}`);

        },
      }
    )
  }


  onLoginClick(
    loginEmail:HTMLInputElement,
    loginPassword:HTMLInputElement,
  ){
    let email=loginEmail.value;
    let password =loginPassword.value;


    if(
      this.isNotEmpty(email) &&
      this.isNotEmpty(password)
    )
    this.firebasetsAuth.signInWith(
      {
        email:email,
        password:password,
        onComplete:(complete) =>{
          alert('Logged in');

        },
        onFail: (err) =>{
          alert('Faild to login')
        }
      }
    )
  }

  
  onRegisterClick(
    registerEmail:HTMLInputElement,
    registerPassword:HTMLInputElement,
    registerConfirmPassword:HTMLInputElement,
  ){
    let email=registerEmail.value;
    let password =registerPassword.value;
    let confirmPassword =registerConfirmPassword.value;


    if(
      this.isNotEmpty(email) &&
      this.isNotEmpty(password) &&
      this.isNotEmpty(confirmPassword) &&
      this.isMatch(password,confirmPassword)
    )
    this.firebasetsAuth.createAccountWith(
      {
        email:email,
        password:password,
        onComplete:(complete) =>{
          alert('Account Created');
          registerEmail.value = '';
          registerPassword.value = '';
          registerConfirmPassword.value = '';

        },
        onFail: (err) =>{
          alert('Faild to create account')
        }
      }
    )
  }
  //value not empty
  isNotEmpty(text:string){
    return text != null && text.length > 0;
  }
  //strings match
  isMatch(text:string, comparedWith:string){
    return text == comparedWith;
  }
  //click create account to bring up create account form
  createAccountClick(){
    this.state = AuthenticatorCompState.REGISTER;
  }
  //click login to bring up login form

  loginClick(){
    this.state = AuthenticatorCompState.LOGIN;

  }
    //click forgot password to bring up reset form

  forgotPasswordClick(){
    this.state = AuthenticatorCompState.FORGOT_PASSWORD;

  }

  isLoggedinState(){
    return this.state == AuthenticatorCompState.LOGIN;

  }
  isRegisteredState(){
    return this.state == AuthenticatorCompState.REGISTER;

  }
  isForgotPasswordState(){
    return this.state == AuthenticatorCompState.FORGOT_PASSWORD;

  }
}
export enum  AuthenticatorCompState{
  LOGIN,
  REGISTER,
  FORGOT_PASSWORD
}