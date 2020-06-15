import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-orders-uncompleted',
  templateUrl: './orders-uncompleted.component.html',
  styleUrls: ['./orders-uncompleted.component.scss']
})
export class OrdersUncompletedComponent implements OnInit {

  status = 'ns';

  constructor() { }

  ngOnInit(): void {
  }

}
