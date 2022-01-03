import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { environment } from "../../../environments/environment";
import { Rv } from "../models/rv";
import { ApiEndpoints } from "./api-endpoints";

@Injectable({
    providedIn: "root",
})
export class RvCatalogService {
    constructor(private http: HttpClient) {}

    baseUrl = environment.apiUrl;

    public getRvs(): Promise<any> {
        const url: string = `${this.baseUrl}${ApiEndpoints.rvs}/rvs`;
        // const url = 'http://localhost:8081/v1/rvs'
        return this.http
            .get(url)
            .toPromise()
            .then((odgovor) => odgovor as any);
    }

    // public deletePark(rvParkId: number): Promise<any> {
    //   const url: string = `${this.baseUrl}${ApiEndpoints.rvParks}/parks/${rvParkId}`;

    //   return this.http
    //     .delete(url)
    //     .toPromise()
    //     .catch(this.catchException);
    // }

    public createRv(rv: Rv): Promise<Rv> {
        const url: string = `${this.baseUrl}${ApiEndpoints.rvs}/rvs`;
        // const url = 'http://localhost:8081/v1/rvs'
        return this.http
            .post(url, rv)
            .toPromise()
            .then((odgovor) => odgovor as Rv)
            .catch((napaka) => {
                return Promise.reject(napaka);
            });
    }

    public reserveRv(rvId: number, userId: number, startDate: Date, endDate: Date) {
        const url: string = `${this.baseUrl}${ApiEndpoints.rvTenancies}/rv-reservations`;
        return this.http.post(url, {
            rvId: rvId,
            userId: userId,
            startDate: startDate,
            endDate: endDate,
            rvBillId: 1,
        });
    }

    private catchException(napaka: any): Promise<any> {
        console.error(
            "Prišlo je do napake",
            napaka.error["sporočilo"] || napaka.error.errmsg || napaka
        );
        return Promise.reject(napaka.error["sporočilo"] || napaka.error.errmsg || napaka);
    }
}
