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
import { MatDialog } from '@angular/material/dialog';
import { BelPostReq } from '../models/bel-post-req';
import { BelPostAnsw } from '../models/bel-post-answ';
import { BarcodeInputCountFormComponent } from '../dialog-windows/barcode-input-count-form/barcode-input-count-form.component';
import { timer } from 'rxjs';

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.scss']
})
export class OrderComponent implements OnInit {

  @ViewChild('barcodePrint', { static: true }) barcodePrint: any;

  displayedColumns = ['article', 'barcode', 'name', 'count', 'countReady'];
  displayedColumnsPrint = ['article', 'barcode', 'name', 'count', 'countReady', 'vatz', 'cost'];
  dataSource: Array<OrderBody> = [new OrderBody('', '', '', '', 0, 0, 0, false, '', '', '')];
  client: ClientInfo = new ClientInfo('', '', '');
  orderId = '';
  isDataChanged = false;

  orderBodyAnsw: OrderBodyAnsw = new OrderBodyAnsw('', '', '', new ClientInfo('', '', ''), [new OrderBody('', '', '', '', 0, 0, 0, false, '', '', '')]);
  countReadyСhange: number;
  belPostAnsw: BelPostAnsw = null;
  splitElement = ';';

  constructor(
    public dialog: MatDialog,
    private router: Router,
    private titleService: Title,
    private route: ActivatedRoute,
    private orderService: OrderService,
    private tokenService: TokenService,
  ) {
    this.orderId = route.snapshot.params['id'];
   }

  ngOnInit(): void {
    this.titleService.setTitle(this.titleService.getTitle() + ' №' + this.orderId); 
    let orderBodyReq = new OrderBodyReq(this.tokenService.getToken(), this.orderId)
    this.orderService.getSuborder(orderBodyReq).subscribe(response => {
      if(response) {
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

  openStoragePrintBarcodeDialog() {
    const dialogRef = this.dialog.open(BarcodeInputCountFormComponent, {
      width: "300px",
      data: {  },
    });
    dialogRef.afterClosed().subscribe(result => {
      if(result >= 1 && result <= 4) {
        let belPostReq = new BelPostReq(this.tokenService.getToken(), this.orderBodyAnsw.sub_num, result) 
        this.orderService.getBarcode(belPostReq).subscribe(response => {
          if(response) {
            this.belPostAnsw = response;
            let t = timer(0, 100).subscribe(vl => { 
              console.log(vl);
              if(vl >= 10) {
                this.barcodePrint._elementRef.nativeElement.click();
                t.unsubscribe();
              }
            });
          }
        },
        error => { 
          console.log(error);
        });
      }
    });
  }
}