import { ChangeDetectorRef, Component } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'bf-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Blueface';
  asdk: string = 'on';

  constructor(
    private translate: TranslateService,
    private _changeDetectorRef: ChangeDetectorRef
  ) {
    translate.addLangs(['en', 'fr', 'tr']);
    translate.setDefaultLang('en');
    translate.use('en');
  }

  useLanguage(language: string): void {
    this.translate.use(language).subscribe(result => console.log(result));
    this._changeDetectorRef.detectChanges();
  }
}
