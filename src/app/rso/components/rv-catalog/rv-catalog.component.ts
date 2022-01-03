import { Component, OnInit } from '@angular/core';
import { Rv } from '../../models/rv';
import { AuthenticationService } from '../../services/authentication.service';
import { RvCatalogService } from '../../services/rv-catalog.service';

@Component({
  selector: 'app-rv-catalog',
  templateUrl: './rv-catalog.component.html',
  styleUrls: ['./rv-catalog.component.css']
})
export class RvCatalogComponent implements OnInit {

  constructor(
      private authenticationService: AuthenticationService,
      private rvCatalogService: RvCatalogService
  ) { }

  public rvs: Rv[];
  public newRv: any = {
    rv_id: "",
    user_id: "",
    capacity: "",
    manufacturer: "",
    year: "",
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

  ngOnInit() {
    this.getRvs()
  }

}
