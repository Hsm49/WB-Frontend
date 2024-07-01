import { Component, OnInit } from '@angular/core';
import { OrderState } from 'src/app/common/order-state';
import { OrderService } from 'src/app/services/order.service';
import { SessionStorageService } from 'src/app/services/session-storage.service';

@Component({
  selector: 'app-payment-success',
  templateUrl: './payment-success.component.html',
  styleUrls: ['./payment-success.component.css']
})
export class PaymentSuccessComponent implements OnInit {

  constructor(
    private orderService:OrderService,
    private sessionStorage:SessionStorageService
  ){

  }

  ngOnInit(): void {
    console.log(this.sessionStorage.getItem('order'));
    let order = JSON.parse(this.sessionStorage.getItem('order') || '{}');

    let formData = new FormData();
    formData.append('id', order.id);
    formData.append('state', OrderState.CONFIRMED.toString());

    this.orderService.updateOrder(formData).subscribe(
      data => { 
        console.log(data);
        console.log('PaymentSuccessComponent:', this.sessionStorage.getItem('token'));
        this.sessionStorage.removeItem('token');
        console.log('PaymentSuccessComponent eliminado:', this.sessionStorage.getItem('token'));
      }
    );
  }
}
