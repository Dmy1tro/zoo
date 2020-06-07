import { Component, OnInit } from '@angular/core';
import { LocalizationService } from './shared/localization.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  constructor(private localizationService: LocalizationService) {}

  ngOnInit() {
    if (!this.localizationService.getLocalization()) {
      this.localizationService.setLocalization('en');
    }

    this.localizationService.useCurrentLocalization();
  }
}
