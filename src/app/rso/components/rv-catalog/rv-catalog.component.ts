import { NONE_TYPE } from '@angular/compiler/src/output/output_ast';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Rv } from '../../models/rv';
import { AuthenticationService } from '../../services/authentication.service';
import { RvCatalogService } from '../../services/rv-catalog.service';

declare var jQuery: any;

@Component({
  selector: 'app-rv-catalog',
  templateUrl: './rv-catalog.component.html',
  styleUrls: ['./rv-catalog.component.css']
})
export class RvCatalogComponent implements OnInit {
  @ViewChild("createRvModal", { static: false }) createRvModal: ElementRef;

  constructor(
      private authenticationService: AuthenticationService,
      private rvCatalogService: RvCatalogService
  ) { }

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
    num_of_reviews: ""
  };


  private getRvs(): void {
    this.rvCatalogService.getRvs().then((rvs) => {
        console.log(rvs);
        this.rvs = rvs;
    });
}

  public createRv():void {
    this.newRv.user_id = this.authenticationService.appUser.user_id;
    this.newRv.rating = 0
    this.newRv.num_of_reviews = 0
    this.rvCatalogService
        .createRv(this.newRv)
        .then((rv) => {
            console.log(rv);
            this.rvs.push(rv);
            jQuery(this.createRvModal.nativeElement).modal("hide");
        })
        .catch((napaka) => {
            console.log(napaka);
        });
  }

  private showCreateModal() {
    jQuery(this.createRvModal.nativeElement).modal("show");
  }

  private closeModal() {
    jQuery(this.createRvModal.nativeElement).modal("hide");
  }

  public isLoggedIn(): boolean {
    console.log("PRIJAVA " + this.authenticationService.isLoggedIn());
    return this.authenticationService.isLoggedIn();
}

  ngOnInit() {
    this.getRvs()
  }

}

