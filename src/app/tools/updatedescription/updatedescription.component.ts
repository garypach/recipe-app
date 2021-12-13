import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { FirebaseTSAuth } from 'firebasets/firebasetsAuth/firebaseTSAuth';
import { FirebaseTSFirestore } from 'firebasets/firebasetsFirestore/firebaseTSFirestore';

@Component({
  selector: 'app-updatedescription',
  templateUrl: './updatedescription.component.html',
  styleUrls: ['./updatedescription.component.scss']
})
export class UpdatedescriptionComponent implements OnInit {
  firestore = new FirebaseTSFirestore();
  auth = new FirebaseTSAuth();
  constructor(private dialog: MatDialogRef<UpdatedescriptionComponent>) { }

  ngOnInit(): void {
  }
  onUpdateDescriptionClick(descriptionInput: HTMLTextAreaElement){
    let desc = descriptionInput.value
    this.firestore.update({
      path: [ "Users", this.auth.getAuth().currentUser.uid ],
      data:{
        description:desc
      },
      onComplete: () => {
        // Code gets executed when it was successful.
        this.dialog.close()
     },
    })
  }

}
