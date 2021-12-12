import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FirebaseTSAuth } from 'firebasets/firebasetsAuth/firebaseTSAuth';
import { FirebaseTSFirestore } from 'firebasets/firebasetsFirestore/firebaseTSFirestore';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  auth = new FirebaseTSAuth();
  firestore = new FirebaseTSFirestore();
  userHasProfile = true;
  private static userDocument: UserDocument;

  constructor(private router:Router){
    this.auth.listenToSignInStateChanges(
      user => {
       this.auth.checkSignInState({
         whenSignedIn:user=>{
           this.getUserProfile()
         },
         whenSignedOut:user=>{
          HomeComponent.userDocument = null;
        },
        whenChanged:user=>{

        },
       })
      }
    )
  }

  ngOnInit(): void {
  }
  //allow access to userdocument across entire code
  public static getUserDocument(){
    return HomeComponent.userDocument;
  }
  getUserProfile(){
    this.firestore.listenToDocument(
    {
    name: "Getting Document",
    path: [ "Users", this.auth.getAuth().currentUser!.uid ],
    onUpdate: (result) => {
      HomeComponent.userDocument = <UserDocument>result.data();
      this.userHasProfile = result.exists; 
      HomeComponent.userDocument.userId == this.auth.getAuth().currentUser?.uid
      if(this.userHasProfile){
        this.router.navigate(["postfeed"])
      }
 }
    }
    );}

  onLogoutClick(){
    return this.auth.signOut();
  }
  loggedIn(){
    return this.auth.isSignedIn();
  }

}

export interface UserDocument {
  publicName: string;
  description: string;
  userId: string;
}
