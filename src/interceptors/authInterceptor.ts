import {
  HttpInterceptorFn,
  HttpRequest,
  HttpHandlerFn,
  HttpEvent,
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { BrowserStorageService } from 'src/app/services/browser-storage-service';
import { inject } from '@angular/core';
import { LocalStorageKey } from 'src/app/models/LocalStorageKey';

export const authInterceptor: HttpInterceptorFn = (
  req: HttpRequest<unknown>,
  next: HttpHandlerFn,
): Observable<HttpEvent<unknown>> => {
  //----> Get the auth from local storage.
  const localStorageService = inject(BrowserStorageService)

  //----> Clone the request to add credentials (cookies/sessions) and headers
  const clonedRequest = req.clone({
    withCredentials: true, // Enables sending cookies
    setHeaders: {
      Authorization: `Bearer ${localStorageService.get(LocalStorageKey.authKey) || ''}`, // Example token
    },
  });

  return next(clonedRequest);
};
