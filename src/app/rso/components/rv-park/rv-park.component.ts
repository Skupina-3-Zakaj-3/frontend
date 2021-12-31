import { RvParkService } from './../../services/rv-park.service';
import { RvPark } from './../../models/rv-park';
import { Component, OnInit, ElementRef, ViewChild, Input } from '@angular/core';
import { AuthenticationService } from '../../services/authentication.service';

declare var jQuery: any;

@Component({
  selector: 'app-rv-park',
  templateUrl: './rv-park.component.html',
  styleUrls: ['./rv-park.component.css']
})
export class RvParkComponent implements OnInit {

  constructor(
    private authenticationService: AuthenticationService,
    private rvParkService: RvParkService,
  ) { }

  public parks: RvPark[];

  private getRvParks(): void {
    this.rvParkService
      .getRvParks()
      .then(parks => {
        console.log(parks);
        this.parks = parks;
      });
  }

  ngOnInit() {
    this.getRvParks();
  }

  public isLoggedIn(): boolean {
    return true;
    // return this.authenticationService.isLoggedIn();
  }

  private makeReservation(park: RvPark) {
    console.log(park);
  }

  private delete(park: RvPark) {
    console.log(park);
  }

}
