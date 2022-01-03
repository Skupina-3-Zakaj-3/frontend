import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { AuthenticationService } from "../../services/authentication.service";
// import { AvtentikacijaService } from '../../storitve/avtentikacija.service';

@Component({
    selector: "app-prijava",
    templateUrl: "./prijava.component.html",
    styleUrls: ["./prijava.component.css"],
})
export class PrijavaComponent implements OnInit {
    constructor(
        private usmerjevalnik: Router,
        private authenticationService: AuthenticationService
    ) {}

    ngOnInit() {}

    izvediPrijavo() {
        this.authenticationService.googlePrijava();
        this.usmerjevalnik.navigateByUrl("/reservations");
    }
}
