import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FirebaseTSAuth } from 'firebasets/firebasetsAuth/firebaseTSAuth';
import { FirebaseTSFirestore } from 'firebasets/firebasetsFirestore/firebaseTSFirestore';
import { AppComponent } from 'src/app/app.component';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
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
          HeaderComponent.userDocument  = null;
        },
        whenChanged:user=>{

        },
       })
      }
    )
  }

  ngOnInit(): void {
  }

  getUsername(){
    try{
      return HeaderComponent.userDocument.publicName
    }
    catch(err){
      return ''
    }
  }
  public static getUserDocument(){
    return HeaderComponent.userDocument;
  }
  getUserProfile(){
    this.firestore.listenToDocument(
    {
    name: "Getting Document",
    path: [ "Users", this.auth.getAuth().currentUser!.uid ],
    onUpdate: (result) => {
      HeaderComponent.userDocument = <UserDocument>result.data();
      this.userHasProfile = result.exists; 
      HeaderComponent.userDocument.userId = this.auth.getAuth().currentUser!.uid
  
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
  userId: string;
}
