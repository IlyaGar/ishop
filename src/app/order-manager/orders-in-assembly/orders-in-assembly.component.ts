import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-orders-in-assembly',
  templateUrl: './orders-in-assembly.component.html',
  styleUrls: ['./orders-in-assembly.component.scss']
})
export class OrdersInAssemblyComponent implements OnInit {

  status = 'rs';
  
  constructor() { }

  ngOnInit(): void {
  }

}
