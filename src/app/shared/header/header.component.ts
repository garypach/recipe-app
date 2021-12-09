import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FirebaseTSAuth } from 'firebasets/firebasetsAuth/firebaseTSAuth';
import { FirebaseTSFirestore } from 'firebasets/firebasetsFirestore/firebaseTSFirestore';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  auth = new FirebaseTSAuth();
  firestore = new FirebaseTSFirestore();
  userHasProfile = true;
  userDocument !: UserDocument;
  constructor(private router:Router){
    this.auth.listenToSignInStateChanges(
      user => {
       this.auth.checkSignInState({
         whenSignedIn:user=>{
           this.getUserProfile()
         },
         whenSignedOut:user=>{

        },
        whenChanged:user=>{

        },
       })
      }
    )
  }

  ngOnInit(): void {
  }
  getUserProfile(){
    this.firestore.listenToDocument(
    {
    name: "Getting Document",
    path: [ "Users", this.auth.getAuth().currentUser!.uid ],
    onUpdate: (result) => {
      this.userDocument = <UserDocument>result.data();
      this.userHasProfile = result.exists; 
 }
    }
    );}
  onLogoutClick(){
    this.router.navigate(['/'])
    return this.auth.signOut();
  }
  loggedIn(){
    return this.auth.isSignedIn();
  }

  onProfileIconClick(publicName?:string){
    this.router.navigate(["profile",publicName])
  }

}

export interface UserDocument {
  publicName: string;
  description: string;
}
