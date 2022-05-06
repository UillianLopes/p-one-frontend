import { HttpClient } from '@angular/common/http';
import { TranslateLoader } from '@ngx-translate/core';
import { forkJoin, Observable } from 'rxjs';
import { map } from 'rxjs/operators';

export class CustomTranslateLoader implements TranslateLoader {
  constructor(
    private readonly _httpClient: HttpClient,
    private readonly configs: { prefix: string; suffix: string }[]
  ) {}
  getTranslation(lang: string): Observable<any> {
    return forkJoin([
      ...this.configs.map(({ prefix, suffix }) =>
        this._httpClient.get<any>(`${prefix}${lang}${suffix}`)
      ),
    ]).pipe(
      map((a) => ({ '@PONE': { ...a.reduce((a, b) => ({ ...a, ...b })) } }))
    );
  }
}
