import { Component, OnInit } from '@angular/core';
import { IProfile, ProfileService } from './profile.service';

@Component({
  selector: 'bf-profile-settings',
  templateUrl: './profile-settings.component.html',
  styleUrls: ['./profile-settings.component.css']
})
export class ProfileSettingsComponent implements OnInit {

  public title = 'Profile';
  public user: IProfile;
  public profileLoading: boolean;

  constructor(private profile: ProfileService) { }
  
  ngOnInit() {    
    this.getProfile();
   }
  
  saveProfile() { }

  getProfile() {
    this.profileLoading = true;
    this.profile.getProfileUser().then(
      resolve => { 
        this.user = resolve;
        this.profileLoading = false;
      },
      reject => this.getProfile()
    );
  }

}
