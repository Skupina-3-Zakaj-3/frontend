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

  @ViewChild('izbrisiModal', { static: false }) izbrisiModal: ElementRef;
  @ViewChild('ustvariParkModal', { static: false }) ustvariParkModal: ElementRef;

  constructor(
    private authenticationService: AuthenticationService,
    private rvParkService: RvParkService,
  ) { }

  public parks: RvPark[];
  public newPark: any = {
    name: "",
    description: "",
    user_id: "",
    cost_per_day: "",
    location: ""
  };

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
    console.log("PRIJAVA " + this.authenticationService.isLoggedIn());
    return this.authenticationService.isLoggedIn();
  }

  private makeReservation(park: RvPark) {
    console.log(this.authenticationService.appUser);
  }

  public deletePark(park: RvPark) {
    console.log(park);
    this.rvParkService
      .deletePark(park.rv_park_id)
      .then(() => {
        // window.location.reload();
        for (var i = 0; i < this.parks.length; i++) {
          if (this.parks[i].rv_park_id === park.rv_park_id) {
            this.parks.splice(i, 1);
            break;
          }
        }
      });
  }

  private kreirajParkModal() {
    jQuery(this.ustvariParkModal.nativeElement).modal('show');
  }

  public zapriModalnoOkno(): void {
    // window.location.reload();
    jQuery(this.ustvariParkModal.nativeElement).modal('hide');
  }

  private kreirajPark() {
    this.newPark.user_id = 1;//this.authenticationService.appUser.user_id;
    this.rvParkService
      .createPark(this.newPark)
      .then((park) => {
        console.log(park);
        this.parks.push(park);
        jQuery(this.ustvariParkModal.nativeElement).modal('hide');
      })
      .catch((napaka) => {
        console.log(napaka);
      })
  }

  public resetFields(): void {
    this.newPark.name = "";
    this.newPark.description = "";
    this.newPark.cost_per_day = "";
    this.newPark.location = "";
    this.newPark.user_id = "";
  }
}
