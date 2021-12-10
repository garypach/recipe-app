import { Component, OnInit } from '@angular/core';
import { FirebaseTSAuth } from 'firebasets/firebasetsAuth/firebaseTSAuth'
import { FirebaseTSFirestore } from 'firebasets/firebasetsFirestore/firebaseTSFirestore';
import { FirebaseTSStorage } from 'firebasets/firebasetsStorage/firebaseTSStorage'
import { FirebaseTSApp } from 'firebasets/firebasetsApp/firebaseTSApp';
import { MatDialogRef } from '@angular/material/dialog';
@Component({
  selector: 'app-create-post',
  templateUrl: './create-post.component.html',
  styleUrls: ['./create-post.component.scss']
})
export class CreatePostComponent implements OnInit {

  selectedImageFile?: File;

  auth = new FirebaseTSAuth();
  firestore = new FirebaseTSFirestore();
  storage = new FirebaseTSStorage();
  userHasProfile = true;
  userDocument !: UserDocument;


  constructor(private dialog: MatDialogRef<CreatePostComponent>) { }
  ngOnInit(): void {
  }

  onPostClick(commentInput: HTMLTextAreaElement) {
    let comment = commentInput.value;
    if (comment.length <= 0) return;
    if (this.selectedImageFile) {
      this.uploadImagePost(comment);
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

  uploadImagePost(comment: string) {
    this.getUserProfile()
    let postId = this.firestore.genDocId();
    this.storage.upload(
      {
        uploadName: "upload Image Post",
        path: ["Posts", postId, "image"],
        data: {
          data: this.selectedImageFile
        },
        onComplete: (downloadUrl) => {
          this.firestore.create(
            {
              path: ["Posts", postId],
              data: {
                comment: comment,
                creatorId: this.auth.getAuth().currentUser!.uid,
                username: this.userDocument.publicName,
                imageUrl: downloadUrl,
                postId: postId,
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

