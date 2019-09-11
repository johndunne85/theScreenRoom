import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, tap, map } from 'rxjs/operators';
 import { IComments } from './comments';

import { IProduct } from './product';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json'})
};

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  // If using Stackblitz, replace the url with this line
  // because Stackblitz can't find the api folder.
  // private productUrl = 'assets/products/products.json';
   private productUrl = 'api/products/products.json';
   private commentsUrl = 'server/api/v1/comments';

  comm : IComments[] = []

  constructor(private http: HttpClient) { }

  getProducts(): Observable<IProduct[]> {

    return this.http.get<IProduct[]>(this.productUrl)
      .pipe(
        tap(data => console.log('All: ' + JSON.stringify(data))),
        catchError(this.handleError)
      );
  }

  getComments(): Observable<IComments[]>{
    return this.http.get<IComments[]>(this.commentsUrl).pipe(
      tap(data => console.log('All: '+ JSON.stringify(data))),
      catchError(this.handleError)
    );
  }

  postComment(mycomment){
    let body = JSON.stringify(mycomment);
    return this.http.post(this.commentsUrl, body, httpOptions);
  }


  getProduct(id: number): Observable<IProduct | undefined> {
    return this.getProducts()
      .pipe(
        map((products: IProduct[]) => products.find(p => p.id === id))
      );
  }

  private handleError(err: HttpErrorResponse) {
    // in a real world app, we may send the server to some remote logging infrastructure
    // instead of just logging it to the console
    let errorMessage = '';
    if (err.error instanceof ErrorEvent) {
      // A client-side or network error occurred. Handle it accordingly.
      errorMessage = `An error occurred: ${err.error.message}`;
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong,
      errorMessage = `Server returned code: ${err.status}, error message is: ${err.message}`;
    }
    console.error(errorMessage);
    return throwError(errorMessage);
  }

}
