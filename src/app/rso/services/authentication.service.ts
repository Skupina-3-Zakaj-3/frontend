import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { catchError, tap } from "rxjs/operators";
import { environment } from "../../../environments/environment";
import { User } from "../models/user";
import { ApiEndpoints } from "./api-endpoints";

@Injectable({
    providedIn: "root",
})
export class AuthenticationService {
    baseUrl = environment.apiUrl;
    constructor(private http: HttpClient) {}
    private _appUser: User;
    get appUser() {
        return this._appUser;
    }

    googlePrijava() {
        window.open(
            `${this.baseUrl}${ApiEndpoints.authentication}/auth/google`,
            "mywindow",
            "location=1,status=1,scrollbars=1, width=800,height=800"
        );
        let listener = window.addEventListener("message", (message) => {
            this.setSession(message.data.access_token);
            this._appUser = {
                name: message.data.name,
                surname: message.data.surname,
                email: message.data.email,
            };
            console.log(this._appUser);
        });
    }

    private setSession(access_token: string) {
        localStorage.setItem("access_token", access_token);
    }

    logout() {
        localStorage.removeItem("access_token");
        this._appUser = null;
    }

    public isLoggedIn() {
        return localStorage.getItem("access_token") != null && this._appUser;
    }
}
