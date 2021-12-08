import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FirebaseTSAuth } from 'firebasets/firebasetsAuth/firebaseTSAuth';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  auth = new FirebaseTSAuth();

  constructor(private router: Router) { }

  ngOnInit(): void {
  }
  onLogoutClick(){
    this.router.navigate(['/'])
    return this.auth.signOut();
  }
  loggedIn(){
    return this.auth.isSignedIn();
  }

}
