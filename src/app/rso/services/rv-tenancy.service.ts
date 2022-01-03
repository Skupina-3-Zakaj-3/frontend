import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { map } from "rxjs/operators";
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
        const url = `${this.baseUrl}${ApiEndpoints.rvTenancies}/rv-reservations/rvs${query}`;

        return this.http.get(url).pipe(map((res) => res as any[]));
    }

    getUserParkReservations(userId: number) {
        const url = `${this.baseUrl}${ApiEndpoints.parkTenancies}/rv-park-tenancies/users/${userId}`;
        // const url = `http://localhost:8088/v1/rv-park-tenancies/users/${userId}`

        return this.http.get(url).pipe(map((res) => res as any[]));
    }
}
