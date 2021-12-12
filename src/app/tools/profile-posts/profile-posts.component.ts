import { Component, OnInit,Input } from '@angular/core';
import { FirebaseTSAuth } from 'firebasets/firebasetsAuth/firebaseTSAuth';
import { FirebaseTSFirestore } from 'firebasets/firebasetsFirestore/firebaseTSFirestore';
import { FirebaseTSStorage } from 'firebasets/firebasetsStorage/firebaseTSStorage';
import { profilePostData } from 'src/app/pages/profile-feed/profile-feed.component';
import { HeaderComponent } from 'src/app/shared/header/header.component';
@Component({
  selector: 'app-profile-posts',
  templateUrl: './profile-posts.component.html',
  styleUrls: ['./profile-posts.component.scss']
})
export class ProfilePostsComponent implements OnInit {
  @Input() postData: profilePostData;
  auth = new FirebaseTSAuth();
  userId = HeaderComponent.getUserDocument().userId;
  firestore = new FirebaseTSFirestore();
  storage = new FirebaseTSStorage();


  constructor() { }

  ngOnInit(): void {
  }

  onDeletePostClick(){
    this.storage.deleteWithUrl(
       {
         url:this.postData.imageUrl,
         onComplete: () => {
          // Code gets executed when it was successful.
          this.firestore.delete(
            {
              path: [this.postData.type,this.postData.postId],
              onComplete: () => {
                 // Code gets executed when it was successful.
                alert("post deleted")
              }
            }
           )
       },
       onFail: err => {
          // Code gets executed when it fails.
          alert(err.message);
       }
       }
     )
  }

}
