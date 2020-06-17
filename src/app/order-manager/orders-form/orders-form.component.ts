import { Component, OnInit, Input } from '@angular/core';
import { OrderSearchService } from 'src/app/common/services/order-search/order-search.service';
import { TimerService } from 'src/app/common/services/timer/timer.service';
import { SnackbarService } from 'src/app/common/services/snackbar/snackbar.service';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-orders-form',
  templateUrl: './orders-form.component.html',
  styleUrls: ['./orders-form.component.scss']
})
export class OrdersFormComponent implements OnInit {

  @Input() data: string;
  tabIndex: number;
  searchNumOrder: string = '';
  timerValue: any = 120;
  intervalId: any;

  constructor(
    private titleService: Title,
    private timerService: TimerService,
    private snackbarService: SnackbarService,
    private orderSearchService: OrderSearchService,
  ) { }

  ngOnInit(): void {
    this.titleService.setTitle('IShop Mile'); 
    this.intervalId = setInterval(() => {
      this.timerValue = this.timerValue - 1;
      if(this.timerValue == 0) {
        this.snackbarService.openSnackBar('Список заказов был обнавлен', 'Ok');
        this.timerService.updateEvent('update');
        this.timerValue = 120;
      }
    }, 1000);
  }

  ngOnDestroy() {
    clearInterval(this.intervalId);
  }

  selectedTab($event) {
    this.tabIndex = $event.index;
    this.timerValue = 120;
  }

  onInputSearchData($event) {
    this.searchNumOrder = $event;
    this.timerValue = 120;
  }

  onClearNumOrder() {
    this.searchNumOrder = '';
    this.orderSearchService.searchEvent(this.searchNumOrder);
  }

  onSearchOrder() {
    this.orderSearchService.searchEvent(this.searchNumOrder);
    this.timerValue = 120;
  }
}
