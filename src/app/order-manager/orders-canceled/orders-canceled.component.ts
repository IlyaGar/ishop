import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-orders-canceled',
  templateUrl: './orders-canceled.component.html',
  styleUrls: ['./orders-canceled.component.scss']
})
export class OrdersCanceledComponent implements OnInit {

  status = 'os';

  constructor() { }

  ngOnInit(): void {
  }

}
