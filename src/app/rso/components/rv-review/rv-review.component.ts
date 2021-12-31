import { RvReviewService } from './../../services/rv-review.service';
import { RvReview } from './../../models/rv-review';
import { Component, OnInit, ElementRef, ViewChild, Input } from '@angular/core';
import { AuthenticationService } from '../../services/authentication.service';

declare var jQuery: any;

@Component({
  selector: 'app-rv-review',
  templateUrl: './rv-review.component.html',
  styleUrls: ['./rv-review.component.css']
})
export class RvReviewComponent implements OnInit {

  @ViewChild('izbrisiModal', { static: false }) izbrisiModal: ElementRef;
  @ViewChild('ustvariReviewModal', { static: false }) ustvariReviewModal: ElementRef;

  constructor(
    private authenticationService: AuthenticationService,
    private rvReviewService: RvReviewService,
  ) { }

  public reviews: RvReview[];
  public newReview: any = {
    comment: "",
    score: "",
    user_id: "",
    rv_id: "",
    review_date: ""
  };

  private getRvReviews(): void {
    this.rvReviewService
      .getRvReviews()
      .then(reviews => {
        console.log(reviews);
        this.reviews = reviews;
      });
  }

  ngOnInit() {
    this.getRvReviews();
  }

  public isLoggedIn(): boolean {
    return this.authenticationService.isLoggedIn();
  }

  public deleteReview(review: RvReview) {
    console.log(review);
    this.rvReviewService
      .deleteReview(review.rv_review_id)
      .then(() => {
        // window.location.reload();
        for (var i = 0; i < this.reviews.length; i++) {
          if (this.reviews[i].rv_review_id === review.rv_review_id) {
            this.reviews.splice(i, 1);
            break;
          }
        }
      });
  }

  private kreirajReviewModal() {
    jQuery(this.ustvariReviewModal.nativeElement).modal('show');
  }

  public zapriModalnoOkno(): void {
    // window.location.reload();
    jQuery(this.ustvariReviewModal.nativeElement).modal('hide');
  }

  private kreirajReview() {
    this.newReview.user_id = 1;//this.authenticationService.appUser.user_id;
    this.rvReviewService
      .createReview(this.newReview)
      .then((review) => {
        console.log(review);
        this.reviews.push(review);
        jQuery(this.ustvariReviewModal.nativeElement).modal('hide');
      })
      .catch((napaka) => {
        console.log(napaka);
      })
  }

  public resetFields(): void {
    this.newReview.name = "";
    this.newReview.description = "";
    this.newReview.cost_per_day = "";
    this.newReview.location = "";
    this.newReview.user_id = "";
  }
}
