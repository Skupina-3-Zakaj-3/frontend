import { Component, OnInit } from "@angular/core";
import { RvPark } from "../../models/rv-park";
import { RvReservation } from "../../models/rv-reservation";
import { AuthenticationService } from "../../services/authentication.service";
import { RvParkService } from "../../services/rv-park.service";
import { RvTenancyService } from "../../services/rv-tenancy.service";

@Component({
    selector: "app-reservations",
    templateUrl: "./reservations.component.html",
    styleUrls: ["./reservations.component.css"],
})
export class ReservationsComponent implements OnInit {
    rvsWithReservations: any[];
    rvParksWithReservations: any[];
    constructor(
        private rvTenancyService: RvTenancyService,
        private authenticationService: AuthenticationService
    ) {}

    vrstaRezervacije = VrstaRezervacije.rv;

    ngOnInit() {
        this.getRvReservations();
        this.getParkReservations()
    }

    private getRvReservations(): void {
        this.rvTenancyService
            .getUserReservations(this.authenticationService.appUser.user_id)
            .subscribe((res) => {
                this.rvsWithReservations = res;
            });
    }

    private getParkReservations(): void {
        this.rvTenancyService
            .getUserParkReservations(this.authenticationService.appUser.user_id)
            .subscribe((res) => {
                this.rvParksWithReservations = res;
            });
    }
}

export enum VrstaRezervacije {
    rv,
    rvPark,
}
