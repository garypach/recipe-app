import { Component, Input, OnInit } from '@angular/core';
import { FirebaseTSFirestore } from 'firebasets/firebasetsFirestore/firebaseTSFirestore';
import { FirebaseTSAuth } from 'firebasets/firebasetsAuth/firebaseTSAuth';
@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],

})
export class ProfileComponent implements OnInit {
  @Input() show?: boolean;

  fireStore: FirebaseTSFirestore;
  auth: FirebaseTSAuth;
  constructor() {
    this.fireStore = new FirebaseTSFirestore();
    this.auth = new FirebaseTSAuth();
  }

  ngOnInit(): void {
  }

//create user collection in firebase cloud firestore

  onContinueClick(
    nameInput: HTMLInputElement,
    descriptionInput: HTMLTextAreaElement) {
    let name = nameInput.value;
    let description = descriptionInput.value;
    this.fireStore.create(
      {
        //authenticate user and only add data to authenticated user
        path: ["Users", this.auth.getAuth().currentUser!.uid],
        data: {
          publicName: name,
          description: description
        },
        //reset input values on complete
        onComplete: (docId) => {
          alert("Profile Created");
          nameInput.value = "";
          descriptionInput.value = "";
        },

        onFail: (err) => { }
      }
    )
  };
}