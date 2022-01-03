import { NONE_TYPE } from "@angular/compiler/src/output/output_ast";
import { Component, ElementRef, OnInit, ViewChild } from "@angular/core";
import { Rv } from "../../models/rv";
import { AuthenticationService } from "../../services/authentication.service";
import { RvCatalogService } from "../../services/rv-catalog.service";

declare var jQuery: any;

@Component({
    selector: "app-rv-catalog",
    templateUrl: "./rv-catalog.component.html",
    styleUrls: ["./rv-catalog.component.css"],
})
export class RvCatalogComponent implements OnInit {
    @ViewChild("createRvModal", { static: false }) createRvModal: ElementRef;
    @ViewChild("reserveRvModal", { static: false }) reserveRvModal: ElementRef;
    @ViewChild("reviewModal", { static: false }) reviewModal: ElementRef;

    constructor(
        private authenticationService: AuthenticationService,
        private rvCatalogService: RvCatalogService
    ) {}

    public rvs: Rv[];
    public newRv: any = {
        rv_id: null,
        user_id: null,
        capacity: null,
        manufacturer: "",
        year: null,
        description: "",
        rating: "",
        cost_per_day: "",
        num_of_reviews: "",
    };
    public selectedRv: Rv;

    public newReservation: any = {
        rvId: 0,
        startDate: null,
        endDate: null,
    };
    formErrorMessage: string = null;
    private getRvs(): void {
        this.rvCatalogService.getRvs().then((rvs) => {
            this.rvs = rvs;
        });
    }

    public createRv(): void {
        this.newRv.user_id = this.authenticationService.appUser.user_id;
        this.newRv.rating = 0;
        this.newRv.num_of_reviews = 0;
        this.rvCatalogService
            .createRv(this.newRv)
            .then((rv) => {
                this.rvs.push(rv);
                jQuery(this.createRvModal.nativeElement).modal("hide");
            })
            .catch((napaka) => {
                console.log(napaka);
            });
    }

    async reserveRv() {
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
            await this.rvCatalogService
                .reserveRv(
                    this.newReservation.rvId,
                    this.authenticationService.appUser.user_id,
                    this.newReservation.startDate,
                    this.newReservation.endDate
                )
                .toPromise();
            this.closeReserveRvModal();
        } catch (error) {
            console.error(error);
            this.formErrorMessage = "Rezervacija je bila neuspešna!";
        }
    }

    public isLoggedIn(): boolean {
        return this.authenticationService.isLoggedIn();
    }

    public openReviewModal(rv: Rv) {
        this.selectedRv = rv;
        jQuery(this.reviewModal.nativeElement).modal("show");
    }

    public closeReviewModal(): void {
        // window.location.reload();
        jQuery(this.reviewModal.nativeElement).modal("hide");
    }
    showCreateRvModal() {
        jQuery(this.createRvModal.nativeElement).modal("show");
    }

    closeCreateRvModal() {
        jQuery(this.createRvModal.nativeElement).modal("hide");
    }

    showReserveRvModal() {
        jQuery(this.reserveRvModal.nativeElement).modal("show");
    }
    closeReserveRvModal() {
        this.formErrorMessage = "";
        jQuery(this.reserveRvModal.nativeElement).modal("hide");
    }

    ngOnInit() {
        this.getRvs();
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
}
