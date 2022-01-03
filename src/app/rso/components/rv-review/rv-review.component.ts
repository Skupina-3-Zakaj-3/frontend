import { RvReviewService } from "./../../services/rv-review.service";
import { RvReview } from "./../../models/rv-review";
import {
    Component,
    OnInit,
    ElementRef,
    ViewChild,
    Input,
    OnChanges,
    AfterViewInit,
    SimpleChanges,
} from "@angular/core";
import { AuthenticationService } from "../../services/authentication.service";
import { Rv } from "../../models/rv";

declare var jQuery: any;

@Component({
    selector: "app-rv-review",
    templateUrl: "./rv-review.component.html",
    styleUrls: ["./rv-review.component.css"],
})
export class RvReviewComponent implements OnInit, OnChanges {
    @ViewChild("izbrisiModal", { static: false }) izbrisiModal: ElementRef;
    @ViewChild("addReviewModal", { static: false }) addReviewModal: ElementRef;
    @Input() selectedRv: Rv;

    constructor(
        private authenticationService: AuthenticationService,
        private rvReviewService: RvReviewService
    ) {}

    public reviews: RvReview[];
    public newReview: any = {
        comment: "",
        score: "",
        user_id: "",
        rv_id: "",
    };

    private getRvReviews(): void {
        if (this.selectedRv) {
            var filter = `filter=rv_id:EQ:${this.selectedRv.rv_id}`;
            this.rvReviewService.getRvReviewsFilter(filter).then((reviews) => {
                this.reviews = reviews;
            });
        }
    }

    ngOnInit() {}

    ngOnChanges(changes: SimpleChanges): void {
        this.getRvReviews();
    }

    public isLoggedIn(): boolean {
        return this.authenticationService.isLoggedIn();
    }

    public deleteReview(review: RvReview) {
        this.rvReviewService.deleteReview(review.rv_review_id).then(() => {
            // window.location.reload();
            for (var i = 0; i < this.reviews.length; i++) {
                if (this.reviews[i].rv_review_id === review.rv_review_id) {
                    this.reviews.splice(i, 1);
                    break;
                }
            }
        });
    }

    public createReview() {
        this.newReview.user_id = this.authenticationService.appUser.user_id;
        this.newReview.rv_id = this.selectedRv.rv_id;
        this.rvReviewService
            .createReview(this.newReview)
            .then((review) => {
                this.reviews.push(review);
                this.resetFields();
                window.location.reload();
            })
            .catch((napaka) => {
                console.log(napaka);
            });
    }

    public fieldsNotEmpty() {
        if (
            this.newReview.comment != "" &&
            this.newReview.score != "" &&
            this.newReview.score != null
        ) {
            return true;
        }
        return false;
    }

    public openAddReviewModal() {
        jQuery(this.addReviewModal.nativeElement).modal("show");
    }

    public closeAddReviewModal(): void {
        window.location.reload();
        jQuery(this.addReviewModal.nativeElement).modal("hide");
    }

    public resetFields(): void {
        this.newReview.name = "";
        this.newReview.description = "";
        this.newReview.cost_per_day = "";
        this.newReview.location = "";
        this.newReview.user_id = "";
    }
}
