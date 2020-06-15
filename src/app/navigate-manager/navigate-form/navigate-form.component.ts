import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { Location } from "@angular/common";

@Component({
  selector: 'app-navigate-form',
  templateUrl: './navigate-form.component.html',
  styleUrls: ['./navigate-form.component.scss']
})
export class NavigateFormComponent implements OnInit {

  showFiller = false;
  isToggle = false;

  @ViewChild('drawer', { static: true }) drawer: any;

  constructor(
    private location: Location,
  ) { }

  ngOnInit(): void {
    this.toggleSidenave();
  }

  toggleSidenave() : void {
    this.drawer.toggle();
    this.isToggle = true;
  }

  isPathActiv(path: string) {
    return (path === this.location.path()) ? true : false;
  }
}
