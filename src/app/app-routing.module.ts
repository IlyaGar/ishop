import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginPageComponent } from './login-manager/login-page/login-page.component';
import { OrderComponent } from './order-manager/order/order.component';
import { OrderListFormComponent } from './order-manager/order-list-form/order-list-form.component';
import { OrdersReadyBuildComponent } from './order-manager/orders-ready-build/orders-ready-build.component';
import { OrdersUncompletedComponent } from './order-manager/orders-uncompleted/orders-uncompleted.component';
import { OrdersReadyShipmentComponent } from './order-manager/orders-ready-shipment/orders-ready-shipment.component';
import { OrdersCanceledComponent } from './order-manager/orders-canceled/orders-canceled.component';
import { OrdersArchiveComponent } from './order-manager/orders-archive/orders-archive.component';
import { OrdersFormComponent } from './order-manager/orders-form/orders-form.component';

const routes: Routes = [
  { path: '', redirectTo: '/orders/ready-build', pathMatch: 'full' },
  { path: 'login', component: LoginPageComponent },
  { path: 'order/:id', component: OrderComponent },
  { path: 'orders/ready-build', component: OrdersReadyBuildComponent },
  { path: 'orders/uncompleted', component: OrdersUncompletedComponent },
  { path: 'orders/ready-shipment', component: OrdersReadyShipmentComponent },
  { path: 'orders/canceled', component: OrdersCanceledComponent },
  { path: 'orders/archive', component: OrdersArchiveComponent },
  { path: 'orders', component: OrdersFormComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
