import { Component } from '@angular/core';
import { FirebaseTSAuth } from 'firebasets/firebasetsAuth/firebaseTSAuth';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'recipe';

  auth = new FirebaseTSAuth();

  constructor(){
    this.auth.listenToSignInStateChanges(
      user => {
       this.auth.checkSignInState({
         whenSignedIn:user=>{
          alert('Logged in')
         },
         whenSignedOut:user=>{
          alert('Logged out')

        },
        whenSignedInAndEmailNotVerified:user=>{
          user.emailVerified
        },
        whenSignedInAndEmailVerified:user=>{

        },
        whenChanged:user=>{

        },
       })
      }
    )
  }
  onLogoutClick(){
    return this.auth.signOut();
  }
  loggedIn(){
    return this.auth.isSignedIn();
  }
}
