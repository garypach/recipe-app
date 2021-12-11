import { Component, Inject, Input, OnInit } from '@angular/core';
import { FirebaseTSApp } from 'firebasets/firebasetsApp/firebaseTSApp';
import { FirebaseTSFirestore } from 'firebasets/firebasetsFirestore/firebaseTSFirestore';
import { PostData } from 'src/app/pages/post-feed/post-feed.component';
import { HeaderComponent } from 'src/app/shared/header/header.component';
@Component({
  selector: 'app-posts',
  templateUrl: './posts.component.html',
  styleUrls: ['./posts.component.scss']
})
export class PostsComponent implements OnInit {
  @Input() postData?: PostData;
  likeData:any = [];
  creatorName?:string;
  firestore = new FirebaseTSFirestore();
  
  constructor() { }

  ngOnInit(): void {
    this.getCreatorInfo();
  }

  onLikeClick(){

    console.log('like')
    let likeDocId = this.firestore.genDocId();
    let isInLikes = false;
    //load likes
    this.firestore.getCollection({
      path:[this.postData.type,this.postData.postId,"Likes"],
      where:[],
      onComplete:result =>{
        result.docs.forEach(
          doc => {
            let likes = doc.data();
            if(likes.creatorId === (HeaderComponent.getUserDocument().userId)){
              isInLikes = true;
              console.log('included')
              this.firestore.delete(
                {
                  path: [this.postData.type,this.postData.postId,"Likes",likes.likeDocId],
                  onComplete: () => {
                     // Code gets executed when it was successful.
                     alert("Data deleted!");
                  },
                  onFail: err => {
                     // Code gets executed when it fails.
                     alert(err.message);
                  }
                }
               );
            }          })  
            if(isInLikes === false){
              this.firestore.create(
                {
                  path: [this.postData.type, this.postData.postId, "Likes", likeDocId],
                  data:{
                    creatorId: HeaderComponent.getUserDocument().userId,
                    creatorName:  HeaderComponent.getUserDocument().publicName,
                    timestamp: FirebaseTSApp.getFirestoreTimestamp(),
                    likeDocId: likeDocId
                  },
                  onComplete:(docId) =>{
                    alert('liked')
                    console.log('likes')
                    this.likeData =[];
                  }
                }
              )
            }

      },
    })
    //check if userid is in any likes document
    //if yes delete document
    //else create like
    // if(this.likeData.includes(HeaderComponent.getUserDocument().userId)){
    //   console.log('included')
    //   this.firestore.delete(
    //     {
    //       path: ['Posts',this.postData.postId,"Likes",this.likeData.likeDocId],
    //       onComplete: () => {
    //          // Code gets executed when it was successful.
    //          alert("Data deleted!");
    //          this.likeData =[];
    //       },
    //       onFail: err => {
    //          // Code gets executed when it fails.
    //          alert(err.message);
    //          this.likeData =[];
    //       }
    //     }
    //    );
    // }
   
  }
  getCreatorInfo(){
    this.firestore.getDocument({
      path:['Users',this.postData!.creatorId],
      onComplete:result =>{
        let userDocument = result.data();
        this.creatorName = userDocument!.publicName;

      }
    })
  }

}
