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
import { Changer } from '../models/changer';
import { SnackbarService } from 'src/app/common/services/snackbar/snackbar.service';
import { PrintBelpostBarcodeComponent } from '../dialog-windows/print-belpost-barcode/print-belpost-barcode.component';
import { DelPostRequest } from '../models/del-post-request';

export interface BelpostData {
  barcode: string,
  username: string,
  address: string,
  num: string,
}

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.scss']
})
export class OrderComponent implements OnInit {

  @ViewChild('barcodePrint', { static: true }) barcodePrint: any;

  displayedColumns = ['article', 'barcode', 'name', 'count', 'countReady'];
  displayedColumnsPrint = ['article', 'barcode', 'name', 'count', 'countReady', 'vatz', 'cost'];
  dataSource: Array<OrderBody> = [new OrderBody('', '', '', '', '0', '0', '0', false, '', '', '')];
  client: ClientInfo = new ClientInfo('', '', '');
  orderId = '';
  isDataChanged = false;
  belpostBarcodes: Array<string> = [];
  param = ';';
  imgSource = 'https://barcode.tec-it.com/barcode.ashx?data=';
  selectedBarcode = '';
  selectedBarcodeFor = '';
  cancelClicked = false;
  confirmClicked = false;
  belpostData: BelpostData;

  orderBodyAnsw: OrderBodyAnsw = new OrderBodyAnsw('', '', '', false, '', new ClientInfo('', '', ''), [new OrderBody('', '', '', '', '0', '0', '0', false, '', '', '')]);
  countReadyСhange: number;
  belPostAnsw: BelPostAnsw = null;
  splitElement = ';';

  messageNoConnect = 'Нет соединения, попробуйте позже.';
  action = 'Ok';
  styleNoConnect = 'red-snackbar';

  constructor(
    public dialog: MatDialog,
    private router: Router,
    private titleService: Title,
    private route: ActivatedRoute,
    private orderService: OrderService,
    private tokenService: TokenService,
    private snackbarService: SnackbarService,
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

  selectBarcode(barcode) {
    this.selectedBarcode = barcode;
    console.log(this.selectedBarcode);
  }

  unSelectBarcode() {
    this.selectedBarcode = '';
    console.log('------');
  }

  // onClickIcon(barcode) {
  //   this.selectedBarcodeFor = barcode;
  // }

  onCancel() {
    this.selectedBarcodeFor = '';
    this.belpostData = null;
  }

  onDelete(barcode) {
    this.selectedBarcodeFor = '';
    this.belpostData = null;
    let delPostRequest = new DelPostRequest(this.tokenService.getToken(), this.orderBodyAnsw.sub_num, barcode);
    this.orderService.orderDeleteBelpostBarcode(delPostRequest).subscribe(response => {
      if(response.status === 'true') {
        this.snackbarService.openSnackBar('Штрихкод Белпочты удален', this.action,);
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
      else this.snackbarService.openSnackBar('Операция не выполнена', this.action, this.styleNoConnect);
    },
    error => { 
      console.log(error);
      this.snackbarService.openSnackBar(this.messageNoConnect, this.action, this.styleNoConnect);
    });
  }

  getData(response: OrderBodyAnsw) {
    this.orderBodyAnsw = response;
    this.client = this.orderBodyAnsw.aboutClient;
    this.dataSource = this.orderBodyAnsw.body;
    this.getBelpostBarcodes(this.orderBodyAnsw.postCode);
  }

  getBelpostBarcodes(value: string) {
    if(value)
      this.belpostBarcodes = value.split(this.param).filter(i => i);
    else
      this.belpostBarcodes = [];
  }

  onInputNewCount(event: string, element: OrderBody) : void {
    if(event.length >= 0) {
      element.count_g = event;
      element.changed = true;
      this.isDataChanged = this.checkDataChanged();
      if(+element.count_g > +element.count_e)
        element.count_g = element.count_e;
      if(!element.count_g)
        element.count_g = '0';
    } 
  }

  onFocusout(element) {
    if(+element.count_g > +element.count_e)
      element.count_g = element.count_e;
    if(!element.count_g)
      element.count_g = '0';
  }

  onClearCount(element: OrderBody) : void {
    element.count_gСhange = element.count_g;
    element.changed = false;
    this.isDataChanged = this.checkDataChanged();
  }

  onSaveChanges() : void {
    // this.dataSource.map(element => {
    //   if(element.count_gСhange)
    //     element.count_g = element.count_gСhange ? element.count_gСhange.toString() : '0';
    //   delete element.count_gСhange;
    //   delete element.changed;
    // });

    this.dataSource.map(element => {
      if(element.count_g > element.count_e)
        element.count_g = element.count_e;
      delete element.count_gСhange;
      delete element.changed;
    });

    let order = new Changer(this.tokenService.getToken(), this.orderBodyAnsw);

    this.orderService.orderSaveChange(order).subscribe(response => {
      if(response.status === '200 OK') {
        this.snackbarService.openSnackBar('Количество изменено', this.action);
      }
    },
    error => { 
      console.log(error);
      this.snackbarService.openSnackBar(this.messageNoConnect, this.action, this.styleNoConnect);
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
            });
          }
        },
        error => { 
          console.log(error);
        });
      }
    });
  }

  onPrintBelpost(code: string) {
    this.belpostData = { barcode: code, username: this.orderBodyAnsw.aboutClient.fIO, address: this.orderBodyAnsw.aboutClient.adress, num: this.orderBodyAnsw.num }
    // const dialogRef = this.dialog.open(PrintBelpostBarcodeComponent, {
    //   width: "60%",
    //   data: { barcode: code, username: 'KKK', address: 'asdasfas', num: this.orderBodyAnsw.num },
    // });
    // dialogRef.afterClosed().subscribe(result => {
    //   if(result) {

    //   }
    // });
  }
}