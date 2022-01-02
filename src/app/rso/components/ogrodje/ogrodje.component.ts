import { Component, OnInit, ElementRef, ViewChild } from "@angular/core";
import { Router } from "@angular/router";
import { AuthenticationService } from "../../services/authentication.service";

declare var jQuery: any;

@Component({
    selector: "app-ogrodje",
    templateUrl: "./ogrodje.component.html",
    styleUrls: ["./ogrodje.component.css"],
})
export class OgrodjeComponent implements OnInit {
    constructor(
        private usmerjevalnik: Router,
        private authenticationService: AuthenticationService
    ) {}

    ngOnInit() {}

    public jePrijavljen(): boolean {
        return this.authenticationService.isLoggedIn();
    }

    public getAppUser() {
        return this.authenticationService.appUser;
    }

    odjava() {
        this.authenticationService.logout();
    }
}
