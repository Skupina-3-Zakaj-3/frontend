import { Component, OnInit } from "@angular/core";
import { RvPark } from "../../models/rv-park";
import { AuthenticationService } from "../../services/authentication.service";
import { RvParkService } from "../../services/rv-park.service";

@Component({
    selector: "app-reservations",
    templateUrl: "./reservations.component.html",
    styleUrls: ["./reservations.component.css"],
})
export class ReservationsComponent implements OnInit {
    public parks: RvPark[];
    constructor(
        private rvParkService: RvParkService,
        private authenticationService: AuthenticationService
    ) {}

    ngOnInit() {
        this.getRvParks();
    }

    private getRvParks(): void {
        this.rvParkService.getRvParks().then((parks) => {
            console.log(parks);
            this.parks = parks;
        });
    }
}
