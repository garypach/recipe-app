import { Component, OnInit } from '@angular/core';
import { FirebaseTSFirestore, Limit, OrderBy, Where } from 'firebasets/firebasetsFirestore/firebaseTSFirestore';
import { FirebaseTSAuth } from 'firebasets/firebasetsAuth/firebaseTSAuth';

@Component({
  selector: 'app-profile-feed',
  templateUrl: './profile-feed.component.html',
  styleUrls: ['./profile-feed.component.scss']
})
export class ProfileFeedComponent implements OnInit {
  auth = new FirebaseTSAuth();
  firestore = new FirebaseTSFirestore();
  userHasProfile = true;
  userDocument !: UserDocument;
  posts: profilePostData [] = [];
  //check if user is signed in
  constructor() {
    this.auth.listenToSignInStateChanges(
      user => {
       this.auth.checkSignInState({
         whenSignedIn:user=>{
          this.getUserProfile()
          this.getPosts();

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
  getPosts(){

    this.firestore.getCollection(
    {
    path: ["Posts"],
    where: [
    new Where("creatorId","==",  this.auth.getAuth().currentUser!.uid),
    new OrderBy("timestamp", "desc"),
    new Limit(10)
    ],
    onComplete: (result) => {
      result.docs.forEach(
             doc => {
               let post = <profilePostData>doc.data();
               this.posts.push(post);
             }
     );
 },
    onFail: err => {
    }
    }
    );}
}
export interface profilePostData {
  comment: string;
  creatorId: string;
  imageUrl: string;
  username:string;
}

export interface UserDocument {
  publicName: string;
  description: string;
}
