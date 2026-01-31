import {Injectable, inject} from '@angular/core';
import {Router} from '@angular/router';
import {AuthService} from './auth-service';
import { toSignal } from '@angular/core/rxjs-interop';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class ApiHttpClientService<T> {
  private httpClient = inject(HttpClient)

  public get<U>(url: string) {
    return toSignal(this.httpClient.get<U>(url));
  }

  public post<U>(url: string, data: T) {
    return toSignal(this.httpClient.post<U>(url, data));
  }

  public patch<U>(url: string, data: T) {
    return toSignal(this.httpClient.patch<U>(url, data));
  }

  public delete<U>(url: string) {
    return toSignal(this.httpClient.delete<U>(url));
  }

}
