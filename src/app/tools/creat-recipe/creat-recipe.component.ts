import { Component, OnInit } from '@angular/core';
import { FirebaseTSAuth } from 'firebasets/firebasetsAuth/firebaseTSAuth'
import { FirebaseTSFirestore } from 'firebasets/firebasetsFirestore/firebaseTSFirestore';
import { FirebaseTSStorage } from 'firebasets/firebasetsStorage/firebaseTSStorage'
import { FirebaseTSApp } from 'firebasets/firebasetsApp/firebaseTSApp';
import { MatDialogRef } from '@angular/material/dialog';
@Component({
  selector: 'app-creat-recipe',
  templateUrl: './creat-recipe.component.html',
  styleUrls: ['./creat-recipe.component.scss']
})
export class CreatRecipeComponent implements OnInit {

  selectedImageFile?: File;

  auth = new FirebaseTSAuth();
  firestore = new FirebaseTSFirestore();
  storage = new FirebaseTSStorage();
  userHasProfile = true;
  userDocument !: UserDocument;


  constructor(private dialog: MatDialogRef<CreatRecipeComponent>) { }
  ngOnInit(): void {
  }

  onPostClick(commentInput: HTMLTextAreaElement,allergensInput: HTMLTextAreaElement) {
    let comment = commentInput.value;
    let allergens = allergensInput.value
    if (comment.length <= 0) return;
    if (this.selectedImageFile && allergens != '') {
      this.uploadImagePost(comment,allergens);
    } else {
      alert('missing elements')
    }
  }
  getUserProfile() {
    this.firestore.listenToDocument(
      {
        name: "Getting Document",
        path: ["Users", this.auth.getAuth().currentUser!.uid],
        onUpdate: (result) => {
          this.userDocument = <UserDocument>result.data();
          this.userHasProfile = result.exists;
        }
      }
    );
  }

  uploadImagePost(comment: string, allergens:string) {
    this.getUserProfile()
    let postId = this.firestore.genDocId();
    this.storage.upload(
      {
        uploadName: "upload Image Recipe",
        path: ["Recipes", postId, "image"],
        data: {
          data: this.selectedImageFile
        },
        onComplete: (downloadUrl) => {
          this.firestore.create(
            {
              path: ["Recipes", postId],
              data: {
                comment: comment,
                allergens:allergens,
                creatorId: this.auth.getAuth().currentUser!.uid,
                username: this.userDocument.publicName,
                imageUrl: downloadUrl,
                postId: postId,
                type:"Recipes",
                timestamp: FirebaseTSApp.getFirestoreTimestamp()
              },
            }
          );
          this.dialog.close();
        }
      }
    );
  }

  onPhotoSelected(photoSelector: HTMLInputElement) {
    this.selectedImageFile = photoSelector.files![0];
    if (!this.selectedImageFile) return;
    let fileReader = new FileReader();
    fileReader.readAsDataURL(this.selectedImageFile);
    fileReader.addEventListener(
      "loadend",
      ev => {
        let readableString = fileReader.result!.toString();
        let postPreviewImage = <HTMLImageElement>document.getElementById("post-preview-image");
        postPreviewImage.src = readableString;
      }
    );
  }
}

export interface UserDocument {
  publicName: string;
  description: string;
}

