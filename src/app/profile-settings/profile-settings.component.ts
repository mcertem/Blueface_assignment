import { Component, OnInit } from '@angular/core';
import { IProfile, ProfileService } from './profile.service';

enum SaveStatus {
  NOTSTARTED,
  SAVING,
  SUCCESSFUL,
  ERROR
}

@Component({
  selector: 'bf-profile-settings',
  templateUrl: './profile-settings.component.html',
  styleUrls: ['./profile-settings.component.css']
})
export class ProfileSettingsComponent implements OnInit {

  public title = 'Profile';
  public user: IProfile;
  public isProfileLoading: boolean;
  public SaveStatusEnum = SaveStatus;
  public saveStatus: SaveStatus = SaveStatus.NOTSTARTED;

  constructor(private profile: ProfileService) { }
  
  ngOnInit() {    
    this.getProfile();
   }
  
  saveProfile() { 
    this.saveStatus = SaveStatus.SAVING;
    this.profile.setName(this.user.firstName, this.user.lastName).then(
      resolve => this.saveStatus = SaveStatus.SUCCESSFUL,
      reject => this.saveStatus = SaveStatus.ERROR
    );
  }

  getProfile() {
    this.isProfileLoading = true;
    this.profile.getProfileUser().then(
      resolve => { 
        this.user = resolve;
        this.isProfileLoading = false;
      },
      reject => this.getProfile()
    );
  }

  onFirstNameFieldChange(event) {
    this.saveStatus = SaveStatus.NOTSTARTED;
    this.user.firstName = event.srcElement.value;
  }

  onLastNameFieldChange(event) {
    this.saveStatus = SaveStatus.NOTSTARTED;
    this.user.lastName = event.srcElement.value;
  }

}
