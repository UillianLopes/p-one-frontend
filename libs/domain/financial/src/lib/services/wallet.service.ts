import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { ResponseModel } from '@p-one/core';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

import { FINANCIAL_ENDPOINT } from '../contants';
import {
  CreateWalletRequest,
  DepositRequest,
  ErrorModel,
  UpdateWalletRequest,
  WalletModel,
  WalletOptionModel,
  WithdrawRequest,
} from '../models';
import { TransferRequest } from '../models/requests';

@Injectable()
export class WalletService {
  constructor(
    private readonly _httpClient: HttpClient,
    @Inject(FINANCIAL_ENDPOINT) private readonly _financialEndpoint: string
  ) {}

  public getAllAsOptions(
    params?: Partial<{ currency: string }>
  ): Observable<WalletOptionModel[]> {
    return this._httpClient
      .get<ResponseModel<WalletOptionModel[]>>(
        `${this._financialEndpoint}/Wallet/GetAllAsOptions`,
        {
          params,
        }
      )
      .pipe(
        map(({ data }) => data),
        catchError(({ messages }) => throwError({ messages } as ErrorModel))
      );
  }

  public get(
    params?: Partial<{ currency: string }>
  ): Observable<WalletModel[]> {
    return this._httpClient
      .get<ResponseModel<WalletModel[]>>(`${this._financialEndpoint}/Wallet`, {
        params,
      })
      .pipe(
        map(({ data }) => data),
        catchError(({ messages }) => throwError({ messages } as ErrorModel))
      );
  }

  public create(balance: CreateWalletRequest): Observable<WalletModel> {
    return this._httpClient
      .post<ResponseModel<WalletModel>>(
        `${this._financialEndpoint}/Wallet`,
        balance
      )
      .pipe(
        map(({ data }) => data),
        catchError(({ messages }) => throwError({ messages } as ErrorModel))
      );
  }

  public update(
    balanceId: string,
    wallet: UpdateWalletRequest
  ): Observable<WalletModel> {
    return this._httpClient
      .put<ResponseModel<WalletModel>>(
        `${this._financialEndpoint}/Wallet/${balanceId}`,
        wallet
      )
      .pipe(
        map(({ data }) => data),
        catchError(({ messages }) => throwError({ messages } as ErrorModel))
      );
  }

  public delete(walletId: string): Observable<WalletModel> {
    return this._httpClient
      .delete<ResponseModel<WalletModel>>(
        `${this._financialEndpoint}/Wallet/${walletId}`
      )
      .pipe(
        map(({ data }) => data),
        catchError(({ messages }) => throwError({ messages } as ErrorModel))
      );
  }

  public deleteMultiple(ids: string[]): Observable<WalletModel> {
    return this._httpClient
      .delete<ResponseModel<WalletModel>>(`${this._financialEndpoint}/Wallet`, {
        params: {
          ids: ids,
        },
      })
      .pipe(
        map(({ data }) => data),
        catchError(({ messages }) => throwError({ messages } as ErrorModel))
      );
  }

  public deposit(walletId: string, deposit: DepositRequest): Observable<any> {
    return this._httpClient
      .put<ResponseModel<any>>(
        `${this._financialEndpoint}/Wallet/${walletId}/Deposit`,
        { ...deposit }
      )
      .pipe(
        map(({ data }) => data),
        catchError(({ messages }) => throwError({ messages } as ErrorModel))
      );
  }

  public withdraw(
    walletId: string,
    withdraw: Partial<WithdrawRequest>
  ): Observable<any> {
    return this._httpClient
      .put<ResponseModel<any>>(
        `${this._financialEndpoint}/Wallet/${walletId}/Withdraw`,
        withdraw
      )
      .pipe(
        map(({ data }) => data),
        catchError(({ messages }) => throwError({ messages } as ErrorModel))
      );
  }

  public transfer(transfer: TransferRequest): Observable<any> {
    return this._httpClient
      .put<ResponseModel<any>>(`${this._financialEndpoint}/Wallet/Transfer`, {
        ...transfer,
      })
      .pipe(
        map(({ data }) => data),
        catchError(({ messages }) => throwError({ messages } as ErrorModel))
      );
  }
}
