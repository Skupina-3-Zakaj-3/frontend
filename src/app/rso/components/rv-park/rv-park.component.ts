import { RvParkService } from "./../../services/rv-park.service";
import { RvPark } from "./../../models/rv-park";
import { Component, OnInit, ElementRef, ViewChild, Input } from "@angular/core";
import { AuthenticationService } from "../../services/authentication.service";

declare var jQuery: any;

@Component({
    selector: "app-rv-park",
    templateUrl: "./rv-park.component.html",
    styleUrls: ["./rv-park.component.css"],
})
export class RvParkComponent implements OnInit {
    @ViewChild("izbrisiModal", { static: false }) izbrisiModal: ElementRef;
    @ViewChild("ustvariParkModal", { static: false }) ustvariParkModal: ElementRef;
    @ViewChild("reserveParkModal", { static: false }) reserveParkModal: ElementRef;

    constructor(
        private authenticationService: AuthenticationService,
        private rvParkService: RvParkService
    ) {}

    public parks: RvPark[];
    public newPark: any = {
        name: "",
        description: "",
        user_id: "",
        cost_per_day: "",
        location: "",
    };

    public newReservation: any = {
        parkId: 0,
        startDate: null,
        endDate: null,
    };

    formErrorMessage: string = null;


    private getRvParks(): void {
        this.rvParkService.getRvParks().then((parks) => {
            this.parks = parks;
        });
    }

    ngOnInit() {
        this.getRvParks();
        let currentDate: Date = new Date();
        this.newReservation.startDate = new Date(
            currentDate.getFullYear(),
            currentDate.getMonth(),
            currentDate.getDate()
        );
        currentDate.setDate(currentDate.getDate() + 7);
        this.newReservation.endDate = new Date(
            currentDate.getFullYear(),
            currentDate.getMonth(),
            currentDate.getDate()
        );
    }

    public isLoggedIn(): boolean {
        return this.authenticationService.isLoggedIn();
    }

    public makeReservation(park: RvPark) {
        console.log(this.authenticationService.appUser);
    }

    public deletePark(park: RvPark) {
        this.rvParkService.deletePark(park.rv_park_id).then(() => {
            // window.location.reload();
            for (var i = 0; i < this.parks.length; i++) {
                if (this.parks[i].rv_park_id === park.rv_park_id) {
                    this.parks.splice(i, 1);
                    break;
                }
            }
        });
    }

    async reservePark() {
        console.log(this.newReservation.rv_park_id)
        if (this.newReservation.startDate > this.newReservation.endDate) {
            this.formErrorMessage =
                "Datum začetka najema ne more biti večji od datuma vrnitve RV-ja!";
            return;
        } else if (this.newReservation.endDate < this.newReservation.startDate) {
            this.formErrorMessage = "Datum vrnitve RV-ja ne more biti manjša od datuma najema!";
            return;
        } else if (this.newReservation.endDate == this.newReservation.startDate) {
            this.formErrorMessage = "Datum ne smeta biti enaka!";
            return;
        }
        try {
            await this.rvParkService
                .reservePark(
                    this.newReservation.parkId,
                    this.authenticationService.appUser.user_id,
                    this.newReservation.startDate,
                    this.newReservation.endDate
                )
                .toPromise();
            this.closeReserveParkModal();
        } catch (error) {
            console.error(error);
            this.formErrorMessage = "Rezervacija je bila neuspešna!";
        }
    }

    public kreirajPark() {
        this.newPark.user_id = this.authenticationService.appUser.user_id;
        this.rvParkService
            .createPark(this.newPark)
            .then((park) => {
                console.log(park);
                this.parks.push(park);
                jQuery(this.ustvariParkModal.nativeElement).modal("hide");
            })
            .catch((napaka) => {
                console.log(napaka);
            });
    }

    public kreirajParkModal() {
        jQuery(this.ustvariParkModal.nativeElement).modal("show");
    }
    

    public zapriModalnoOkno(): void {
        // window.location.reload();
        jQuery(this.ustvariParkModal.nativeElement).modal("hide");
    }


    showReserveParkModal(park:RvPark) {
        jQuery(this.reserveParkModal.nativeElement).modal("show");
    }
    closeReserveParkModal() {
        this.formErrorMessage = "";
        jQuery(this.reserveParkModal.nativeElement).modal("hide");
    }

    public resetFields(): void {
        this.newPark.name = "";
        this.newPark.description = "";
        this.newPark.cost_per_day = "";
        this.newPark.location = "";
        this.newPark.user_id = "";
    }
}
