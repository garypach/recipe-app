import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { CreatePostComponent } from 'src/app/tools/create-post/create-post.component';
import { FirebaseTSFirestore, Limit, OrderBy } from 'firebasets/firebasetsFirestore/firebaseTSFirestore';

@Component({
  selector: 'app-post-feed',
  templateUrl: './post-feed.component.html',
  styleUrls: ['./post-feed.component.scss']
})
export class PostFeedComponent implements OnInit {
  firestore = new FirebaseTSFirestore();
  posts: PostData [] = [];
  constructor(private dialog: MatDialog) { }

  ngOnInit(): void {
    this.getPosts();
    this.getRecipes();
  }

  onCreatePostClick(){
    this.dialog.open(CreatePostComponent);
  }
  shuffle(array) {
    for (let i = array.length - 1; i > 0; i--) {
      let j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
  }
  getRecipes(){

    this.firestore.getCollection(
    {
    path: ["Recipes"],
    where: [
    new OrderBy("timestamp", "desc"),
    new Limit(10)
    ],
    onComplete: (result) => {
      result.docs.forEach(
             doc => {
               let post = <PostData>doc.data();
               this.posts.push(post);
             }
     );
     this.shuffle(this.posts);
 },
    onFail: err => {
    }
    }
    );}
  // get collection of all posts
  getPosts(){
    this.firestore.getCollection(
    {
    path: ["Posts"],
    where: [
    new OrderBy("timestamp", "desc"),
    new Limit(10)
    ],
    //push each post object into postdata array
    onComplete: (result) => {
      result.docs.forEach(
             doc => {
               let post = <PostData>doc.data();
               this.posts.push(post);
             }
     );
 },
    onFail: err => {
    }
    }
    );}
}
export interface PostData {
  comment: string;
  creatorId: string;
  imageUrl: string;
  username:string;
  postId:string;
  allergens:string;
  type:string;

}

