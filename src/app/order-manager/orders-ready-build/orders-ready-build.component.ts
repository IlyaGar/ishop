import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-orders-ready-build',
  templateUrl: './orders-ready-build.component.html',
  styleUrls: ['./orders-ready-build.component.scss']
})
export class OrdersReadyBuildComponent implements OnInit {

  status = 'gs';

  constructor() { }

  ngOnInit(): void {
  }

}
