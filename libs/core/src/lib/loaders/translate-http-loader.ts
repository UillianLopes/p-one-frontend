import { HttpClient } from '@angular/common/http';
import { TranslateLoader } from '@ngx-translate/core';
import { Observable } from 'rxjs';

export class TranslateHttpLoader implements TranslateLoader {
  constructor(
    private readonly httpClient: HttpClient,
    private readonly prefix?: string,
    private readonly suffix?: string
  ) {}

  getTranslation(lang: string): Observable<any> {
    return this.httpClient.get<any>(`${this.prefix}${lang}${this.suffix}`);
  }
}
