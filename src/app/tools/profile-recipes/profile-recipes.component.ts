import { Component, OnInit,Input } from '@angular/core';
import { profileRecipeData } from 'src/app/pages/profile-feed/profile-feed.component';
import { FirebaseTSAuth } from 'firebasets/firebasetsAuth/firebaseTSAuth';
import { FirebaseTSFirestore } from 'firebasets/firebasetsFirestore/firebaseTSFirestore';
import { FirebaseTSStorage } from 'firebasets/firebasetsStorage/firebaseTSStorage';
import { HeaderComponent } from 'src/app/shared/header/header.component';
@Component({
  selector: 'app-profile-recipes',
  templateUrl: './profile-recipes.component.html',
  styleUrls: ['./profile-recipes.component.scss']
})
export class ProfileRecipesComponent implements OnInit {
  @Input() recipeData: profileRecipeData;
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
         url:this.recipeData.imageUrl,
         onComplete: () => {
          // Code gets executed when it was successful.
          this.firestore.delete(
            {
              path: [this.recipeData.type,this.recipeData.postId],
              onComplete: () => {
                 // Code gets executed when it was successful.
                alert("recipe deleted")
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
