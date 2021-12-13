import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { FirebaseTSAuth } from 'firebasets/firebasetsAuth/firebaseTSAuth';
import { FirebaseTSFirestore } from 'firebasets/firebasetsFirestore/firebaseTSFirestore';

@Component({
  selector: 'app-updateusername',
  templateUrl: './updateusername.component.html',
  styleUrls: ['./updateusername.component.scss']
})
export class UpdateusernameComponent implements OnInit {
  firestore = new FirebaseTSFirestore();
  auth = new FirebaseTSAuth();


  constructor(private dialog: MatDialogRef<UpdateusernameComponent>) { }

  ngOnInit(): void {
  }
  onUpdateUserNameClick(nameInput: HTMLTextAreaElement){
    let name = nameInput.value
    this.firestore.update({
      path: [ "Users", this.auth.getAuth().currentUser.uid ],
      data:{
        publicName: name
      },
      onComplete: () => {
        // Code gets executed when it was successful.
        this.dialog.close()
     },
    })
  }
 
}
