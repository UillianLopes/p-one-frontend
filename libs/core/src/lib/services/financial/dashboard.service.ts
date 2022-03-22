import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

@Injectable()
export class DashboardService {
  constructor(private readonly _httpClient: HttpClient) {}

  public getBalancesOvertime(): Observable<any> {
    return of();
  }
}
