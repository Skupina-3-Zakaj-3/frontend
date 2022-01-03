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
    public rvReservations: RvReservation[];
    constructor(
        private rvTenancyService: RvTenancyService,
        private authenticationService: AuthenticationService
    ) {}

    ngOnInit() {
        this.getRvReservations();
    }

    private getRvReservations(): void {
        this.rvTenancyService
            .getUserReservations(1 /* this.authenticationService.appUser.user_id */)
            .subscribe((res) => {
                this.rvReservations = res;
            });
    }
}
