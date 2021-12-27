import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
// import { AvtentikacijaService } from '../../storitve/avtentikacija.service';


@Component({
  selector: 'app-prijava',
  templateUrl: './prijava.component.html',
  styleUrls: ['./prijava.component.css']
})
export class PrijavaComponent implements OnInit {

  constructor(
    private usmerjevalnik: Router,
  ) { }

  ngOnInit() {
  }
}
