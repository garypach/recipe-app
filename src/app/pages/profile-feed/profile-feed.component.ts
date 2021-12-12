import { Component, OnInit,ViewEncapsulation } from '@angular/core';
import { FirebaseTSFirestore, Limit, OrderBy, Where } from 'firebasets/firebasetsFirestore/firebaseTSFirestore';
import { FirebaseTSAuth } from 'firebasets/firebasetsAuth/firebaseTSAuth';
import { CreatRecipeComponent } from 'src/app/tools/creat-recipe/creat-recipe.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-profile-feed',
  templateUrl: './profile-feed.component.html',
  styleUrls: ['./profile-feed.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class ProfileFeedComponent implements OnInit {
  auth = new FirebaseTSAuth();
  firestore = new FirebaseTSFirestore();
  userHasProfile = true;
  userDocument : UserDocument;
  posts: profilePostData [] = [];
  recipes: profileRecipeData [] = [];

  //check if user is signed in
  constructor(private dialog: MatDialog) {
    this.auth.listenToSignInStateChanges(
      user => {
       this.auth.checkSignInState({
         whenSignedIn:user=>{
          this.getUserProfile();
          this.getPosts();
          this.getRecipes();

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
  onCreatePostClick(){
    this.dialog.open(CreatRecipeComponent);
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
    getRecipes(){

      this.firestore.getCollection(
      {
      path: ["Recipes"],
      where: [
      new Where("creatorId","==",  this.auth.getAuth().currentUser.uid),
      new OrderBy("timestamp", "desc"),
      new Limit(10)
      ],
      onComplete: (result) => {
        result.docs.forEach(
               doc => {
                 let post = <profileRecipeData>doc.data();
                 this.recipes.push(post);
               }
       );
   },
      onFail: err => {
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
  postId:string;
  type:string;
}
export interface profileRecipeData {
  comment: string;
  creatorId: string;
  imageUrl: string;
  username:string;
  allergens:string;
  postId:string;
  type:string;
}

export interface UserDocument {
  publicName: string;
  description: string;
}
