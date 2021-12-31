import { RvPark } from './../models/rv-park';
import { ApiEndpoints } from './api-endpoints';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from "../../../environments/environment";

@Injectable({
  providedIn: "root",
})
export class RvParkService {
  constructor(
    private http: HttpClient
  ) { }

  baseUrl = environment.apiUrl;

  public getRvParks(): Promise<any> {
    const url: string = `${this.baseUrl}${ApiEndpoints.rvParks}/parks`;
    return this.http
      .get(url)
      .toPromise()
      .then((odgovor) => odgovor as any);
  }

  public deletePark(rvParkId: number): Promise<any> {
    const url: string = `${this.baseUrl}${ApiEndpoints.rvParks}/parks/${rvParkId}`;

    return this.http
      .delete(url)
      .toPromise()
      .catch(this.catchException);
  }

  public createPark(park: RvPark): Promise<RvPark> {
    const url: string = `${this.baseUrl}${ApiEndpoints.rvParks}/parks`;
    return this.http
      .post(url, park)
      .toPromise()
      .then((odgovor) => odgovor as RvPark)
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