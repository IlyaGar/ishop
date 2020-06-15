import { Component, OnInit, ViewChild, Input } from '@angular/core';
import { Router } from '@angular/router';
import { NgScrollbar } from 'ngx-scrollbar';
import { OrderService } from '../services/order/order.service';
import { StoreService } from 'src/app/common/services/store/store.service';
import { TokenService } from 'src/app/common/services/token/token.service';
import { FindOrderReq } from '../models/find-order-req';
import { OrderListAnsw } from '../models/order-list-answ';
import { OrderListReq } from '../models/order-list-req';
import { timer } from 'rxjs';
import { ToCassa } from '../models/to-cassa';
import { PauseOrderReq } from '../models/pause-order-req';
import { SnackbarService } from 'src/app/common/services/snackbar/snackbar.service';


@Component({
  selector: 'app-order-list-form',
  templateUrl: './order-list-form.component.html',
  styleUrls: ['./order-list-form.component.scss']
})
export class OrderListFormComponent implements OnInit {
  
  @Input() data: string;
  @ViewChild(NgScrollbar) scrollbarRef: NgScrollbar;

  orderListAnswAll: Array<OrderListAnsw> = [];
  orderListAnswBrest: Array<OrderListAnsw> = [];
  orderListAnswDolg: Array<OrderListAnsw> = [];
  orderListAnswKamen: Array<OrderListAnsw> = [];
  orderListAnswMolodec: Array<OrderListAnsw> = [];

  arrShop = ['F', 'R', 'Y', 'I'];

  displayedColumns = ['status', 'name', 'client', 'collector', 'place', 'note', 'action'];

  searchNumOrder: string = '';

  scrollHeight = 1350;
  countRecord = 0;

  tabIndex: number;
  idShops: Array<any> = [ { index: 0, id: '%' }, { index: 1, id: '11' }, { index: 2, id: '8' }, { index: 3, id: '22' }, { index: 4, id: '25' } ];

  messageNoConnect = 'Нет соединения, попробуйте позже.';
  action = 'Ok';
  styleNoConnect = 'red-snackbar';

  constructor(
    private router: Router,
    private storeService: StoreService,
    private orderService: OrderService,
    private tokenService: TokenService,
    private snackbarService: SnackbarService,
  ) { }

  ngOnInit(): void {
    if(this.storeService.getSelectedShop()) {
      this.tabIndex = +this.storeService.getSelectedShop();
    }
    let orderListReq = new OrderListReq(this.tokenService.getToken(), this.getIdShop() ?? '%', this.data ?? 'gs', this.countRecord.toString());
    this.orderService.getOrders(orderListReq).subscribe(response => {
      if(response) {
        this.orderListAnswAll = response;
      }
    },
    error => { 
      console.log(error);
      this.snackbarService.openSnackBar(this.messageNoConnect, this.action, this.styleNoConnect);
    });
  }

  ngAfterViewInit() {
    this.scrollbarRef.scrolled.subscribe(e => { console.log(e); this.onScroll(e) });
  }

  onScroll($event) {
    let scrollPercent = $event.currentTarget.scrollTop * 100 / this.scrollHeight;
    if(scrollPercent > 90) {
      this.dynamicLoadScroll();
      this.scrollHeight = this.scrollHeight + 1600;
    }
  }

  dynamicLoadScroll() {
    if(this.orderListAnswAll.length >= this.countRecord) {
      this.countRecord = this.countRecord + 40;
      this.scrollHeight = this.scrollHeight + this.countRecord;
      let orderListReq = new OrderListReq(this.tokenService.getToken(), this.getIdShop() ?? '%', this.data, this.countRecord.toString());
      this.orderService.getOrders(orderListReq).subscribe(response => {
        if(response) {
          this.orderListAnswAll = this.orderListAnswAll.concat(response);
        }
      },
      error => { 
        console.log(error);
        this.snackbarService.openSnackBar(this.messageNoConnect, this.action, this.styleNoConnect);
      });
    }
  }

  onInputSearchData($event) {
    this.searchNumOrder = $event;
  }

  onClearNumOrder() {
    this.searchNumOrder = '';
  }

  onSearchOrder() {
    let findOrderReq = new FindOrderReq(this.tokenService.getToken(), this.searchNumOrder, this.getIdShop());
    this.orderService.orderSearch(findOrderReq).subscribe(response => {
      if(response) {
        this.orderListAnswAll = response;
      }
    },
    error => { 
      console.log(error);
    });
  }

  getIdShop() : string {
    return this.idShops.find(element => element.index === this.tabIndex).id;
  }

  onClickPauseOrGo(element: OrderListAnsw) {
    let pauseOrderReq = new PauseOrderReq(this.tokenService.getToken(), element.order.sub_num);
    this.orderService.orderPause(pauseOrderReq).subscribe(response => {
      if(response.status) {
        if(element.status === 'не принят') 
          element.status = 'ОТЛОЖЕН';
        else
          if(element.status === 'ОТЛОЖЕН') 
            element.status = 'не принят';
      }
    },
    error => { 
      console.log(error);
    });
  }

  onClickShow(id) {
    const url = this.router.serializeUrl(
      this.router.createUrlTree([`/order/${id}`])
    );
    window.open(url, "_blank");
  }

  onClickWriteToCashbox(element: OrderListAnsw) {
    element.order.isCassaPause = true;
    let t = timer(0, 1000).subscribe(vl => { 
      console.log(vl);
      if(vl >= 15) {
        element.order.isCassaPause = false;
        t.unsubscribe();
      }
    });
    let toCassa = new ToCassa(this.tokenService.getToken(), element.order.num, element.order.sub_num);
    this.orderService.orderWriteToCashbox(toCassa).subscribe(response => {
      if(response.status === 'true') {
        this.snackbarService.openSnackBar('Заказ записан в кассу!', this.action);
      }
    },
    error => { 
      console.log(error);
      this.snackbarService.openSnackBar(this.messageNoConnect, this.action, this.styleNoConnect);
    });
  }

  onClickReturnToAssembly(id) {
    this.orderService.orderReturnToAssembly(id).subscribe(response => {

    },
    error => { 
      console.log(error);
    });
  }

  selectedTab($event) {
    this.storeService.setSelectedShop($event.index);
    this.tabIndex = $event.index;
    this.loadDataShop();
  }

  loadDataShop() {
    let orderListReq = new OrderListReq(this.tokenService.getToken(), this.getIdShop(), this.data, this.countRecord.toString());
    this.orderService.getOrders(orderListReq).subscribe(response => {
      if(response) {
        this.orderListAnswAll = response;
      }
    },
    error => { 
      console.log(error);
      this.snackbarService.openSnackBar(this.messageNoConnect, this.action, this.styleNoConnect);
    });
  }

  // onTabClick(event) {
  //   let el = event.srcElement;
  //   const attr = el.attributes.getNamedItem('class');
  //   if (attr.value.indexOf('mat-tab-label-content') >= 0) {
  //     el = el.parentElement;
  //   }
  //   const tabIndex = el.id.substring(el.id.length - 1);
  //   if (parseInt(tabIndex) === this.tabIndex) {
  //     // active tab clicked
  //     console.log(tabIndex);
  //   }
  // }
}
