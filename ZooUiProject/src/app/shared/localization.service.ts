import { Injectable } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

@Injectable({
  providedIn: 'root'
})
export class LocalizationService {

  constructor(private translateService: TranslateService) { }

  getLocalization() {
    return localStorage.getItem('localization');
  }

  setLocalization(locale: string) {
    localStorage.setItem('localization', locale);
  }

  useCurrentLocalization() {
    const locale = localStorage.getItem('localization');
    this.translateService.use(locale);
  }

  localeUA() {
    const locale = 'ua';
    localStorage.setItem('localization', locale);
    this.translateService.use(locale);
  }

  localeEN() {
    const locale = 'en';
    localStorage.setItem('localization', locale);
    this.translateService.use(locale);
  }
}
