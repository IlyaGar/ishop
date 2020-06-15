import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-orders-ready-shipment',
  templateUrl: './orders-ready-shipment.component.html',
  styleUrls: ['./orders-ready-shipment.component.scss']
})
export class OrdersReadyShipmentComponent implements OnInit {

  status = 'rs';

  constructor() { }

  ngOnInit(): void {
  }

}
