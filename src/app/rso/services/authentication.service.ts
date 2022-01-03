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
        if (!this._appUser) this.readUserFromLocalStorage();
        return this._appUser;
    }

    googlePrijava() {
        window.open(
            `${this.baseUrl}${ApiEndpoints.authentication}/auth/google`,
            "mywindow",
            "location=1,status=1,scrollbars=1, width=800,height=800"
        );

        return new Promise((resolve, reject) => {
            window.addEventListener("message", (message) => {
                this.setSession(
                    message.data.access_token,
                    message.data.email,
                    message.data.userId,
                    message.data.name,
                    message.data.surname
                );
                this.readUserFromLocalStorage();
                resolve(null);
            });
        });
    }

    private setSession(
        access_token: string,
        email: string,
        userId: string,
        name: string,
        surname: string
    ) {
        localStorage.setItem("access_token", access_token);
        localStorage.setItem("user_email", email);
        localStorage.setItem("user_id", userId);
        localStorage.setItem("user_name", name);
        localStorage.setItem("user_surname", surname);
    }

    logout() {
        localStorage.clear();
        this._appUser = null;
    }

    readUserFromLocalStorage() {
        this._appUser = {
            name: localStorage.getItem("user_name"),
            surname: localStorage.getItem("user_surname"),
            email: localStorage.getItem("user_email"),
            user_id: Number(localStorage.getItem("user_id")),
        };
    }
    public isLoggedIn() {
        return localStorage.getItem("access_token") != null;
    }
}
