import { ApiEndpoints } from './api-endpoints';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from "../../../environments/environment";

@Injectable({
  providedIn: "root",
})
export class WeatherService {
  constructor(
    private http: HttpClient
  ) { }

  baseUrl = environment.apiUrl;

  public getWeather(newWeather: any): Promise<any> {
    var url: string = `${this.baseUrl}${ApiEndpoints.weather}/weather`;
    if (newWeather.locationName.length > 0)
      url += `?q=${newWeather.locationName}`;

    return this.http
      .get(url)
      .toPromise()
      .then((odgovor) => odgovor as any)
      .catch(this.catchException);
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