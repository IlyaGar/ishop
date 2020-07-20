import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-empty-form',
  templateUrl: './empty-form.component.html',
  styleUrls: ['./empty-form.component.scss']
})
export class EmptyFormComponent implements OnInit {

  url: string;

  constructor(private router: Router) { 
    this.url = this.router.getCurrentNavigation().extras.state.url;
  }

  ngOnInit(): void {
    this.router.navigate([this.url]);
  }
}
