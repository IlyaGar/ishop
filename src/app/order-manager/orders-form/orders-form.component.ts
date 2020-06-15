import { Component, OnInit, Input } from '@angular/core';
import { OrderSearchService } from 'src/app/common/services/order-search/order-search.service';

@Component({
  selector: 'app-orders-form',
  templateUrl: './orders-form.component.html',
  styleUrls: ['./orders-form.component.scss']
})
export class OrdersFormComponent implements OnInit {

  @Input() data: string;
  tabIndex: number;
  searchNumOrder: string = '';

  constructor(
    private orderSearchService: OrderSearchService,
  ) { }

  ngOnInit(): void {
  }

  selectedTab($event) {
    this.tabIndex = $event.index;
  }

  onInputSearchData($event) {
    this.searchNumOrder = $event;
  }

  onClearNumOrder() {
    this.searchNumOrder = '';
    this.orderSearchService.searchEvent(this.searchNumOrder);
  }

  onSearchOrder() {
    this.orderSearchService.searchEvent(this.searchNumOrder);
  }

  // onDropSearching() {
  //   this.onClearNumOrder();
  //   this.orderSearchService.searchEvent(this.searchNumOrder);
  // }
}
