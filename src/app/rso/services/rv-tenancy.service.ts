import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { environment } from "../../../environments/environment";
import { RvReservation } from "../models/rv-reservation";
import { ApiEndpoints } from "./api-endpoints";

@Injectable({
    providedIn: "root",
})
export class RvTenancyService {
    baseUrl = environment.apiUrl;
    constructor(private http: HttpClient) {}
    getUserReservations(userId: number) {
        const query = `?userId=${userId}`;
        const url = `${this.baseUrl}${ApiEndpoints.rvTenancies}/rvs${query}`;
        console.log(url);
        return this.http.get<RvReservation[]>(url);
    }
}
