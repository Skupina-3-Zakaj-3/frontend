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

}