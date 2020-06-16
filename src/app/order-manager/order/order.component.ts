import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { SubOrder } from '../models/sub-order';
import { Router, ActivatedRoute } from '@angular/router';
import { OrderBodyReq } from '../models/order-body-req';
import { OrderService } from '../services/order/order.service';
import { TokenService } from 'src/app/common/services/token/token.service';
import { OrderBodyAnsw } from '../models/order-body-answ';
import { element } from 'protractor';
import { ClientInfo } from '../models/client-info';
import { OrderBody } from '../models/order-body';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.scss']
})
export class OrderComponent implements OnInit {

  imgSource = 'https://barcode.tec-it.com/barcode.ashx?data=';
  displayedColumns = ['article', 'name', 'barcode', 'count', 'countReady'];
  displayedColumnsPrint = ['article', 'name', 'barcode', 'count', 'countReady', 'cost'];
  dataSource: Array<OrderBody> = [new OrderBody('', '', '', '', 0, 0, 0, false, 0)];
  client: ClientInfo = new ClientInfo('', '', '');
  orderId = '';
  isDataChanged = false;

  orderBodyAnsw: OrderBodyAnsw = new OrderBodyAnsw('', '', '', new ClientInfo('', '', ''), [new OrderBody('', '', '', '', 0, 0, 0, false, 0)]);
  countReadyСhange: number;

  constructor(
    private router: Router,
    private titleService: Title,
    private route: ActivatedRoute,
    private orderService: OrderService,
    private tokenService: TokenService,
  ) {
    this.orderId = route.snapshot.params['id'];
   }

  ngOnInit(): void {
    this.titleService.setTitle(this.titleService.getTitle() + ' №' + this.orderId ); 
    let orderBodyReq = new OrderBodyReq(this.tokenService.getToken(), this.orderId)
    this.orderService.getSuborder(orderBodyReq).subscribe(response => {
      if(response) {
        // this.orderBodyAnsw = response;
        // this.client = this.orderBodyAnsw.aboutClient;
        // this.dataSource = this.orderBodyAnsw.body;
        this.getData(response);
      }
    },
    error => { 
      console.log(error);
    });
  }

  getData(response: OrderBodyAnsw) {
    this.orderBodyAnsw = response;
    this.client = this.orderBodyAnsw.aboutClient;
    this.dataSource = this.orderBodyAnsw.body;
    this.imgSource = this.imgSource + this.orderBodyAnsw.sub_num;
  }

  onInputNewCount(event: string, element: OrderBody) : void{
    element.count_gСhange = +event;
    element.changed = true;
    this.isDataChanged = this.checkDataChanged();
  }

  onClearCount(element: OrderBody) : void {
    element.count_gСhange = element.count_g;
    element.changed = false;
    this.isDataChanged = this.checkDataChanged();
  }

  onSaveChanges() : void {
    this.dataSource.map(element => {
      element.count_g = element.count_gСhange;
    });
  }

  checkDataChanged() : boolean {
    let result = this.dataSource.filter(d => d.changed === true);
    return result.length > 0
  }
}