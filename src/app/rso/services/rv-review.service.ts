import { RvReview } from './../models/rv-review';
import { ApiEndpoints } from './api-endpoints';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from "../../../environments/environment";

@Injectable({
  providedIn: "root",
})
export class RvReviewService {
  constructor(
    private http: HttpClient
  ) { }

  baseUrl = environment.apiUrl;

  public getRvReviewsFilter(filter: string): Promise<any> {
    const url: string = `${this.baseUrl}${ApiEndpoints.rvReviews}/reviews?${filter}`;
    return this.http
      .get(url)
      .toPromise()
      .then((odgovor) => odgovor as any);
  }

  public deleteReview(rvReviewId: number): Promise<any> {
    const url: string = `${this.baseUrl}${ApiEndpoints.rvReviews}/reviews/${rvReviewId}`;

    return this.http
      .delete(url)
      .toPromise()
      .catch(this.catchException);
  }

  public createReview(review: RvReview): Promise<RvReview> {
    const url: string = `${this.baseUrl}${ApiEndpoints.rvReviews}/reviews`;
    return this.http
      .post(url, review)
      .toPromise()
      .then((odgovor) => odgovor as RvReview)
      .catch((napaka) => {
        return Promise.reject(napaka);
      });
  }

  private catchException(napaka: any): Promise<any> {
    console.error(
      "Prišlo je do napake",
      napaka.error["sporočilo"] || napaka.error.errmsg || napaka
    );
    return Promise.reject(
      napaka.error["sporočilo"] || napaka.error.errmsg || napaka
    );
  }
}