import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { OrdersComponent } from './orders/orders.component';

@Injectable()
export class SharedService {

    constructor(private http: HttpClient) { }

    getOrders(email: string) {
        return this.http.get<any>('api/checkout/orders/' + email).pipe(
            map(data => {
                let orders = [];
                data.orders.forEach(order => {
                    orders.push({
                        items: order.items,
                        payment_method: order.payment_method,
                        total: order.total,
                        fullname: order.user.fullname,
                        email: order.user.email,
                        quantity: order.items[0].quantity,
                        id: order._id,
                        createdAt: order.createdAt,
                        data: 'Base Price: '+order.items[0].basePrice +
                         '; Paper Type: '+ this.getValueForType(order, "paperType") +
                         '; Paper Color: '+ this.getValueForType(order, "paperColor") +
                         '; Cover Theme: '+ this.getValueForType(order, "coverTheme") +
                         '; Cover text: '+ this.getValueForType(order, "coverText") + ';'
                    });
                });
                return orders;
            })
        );
    }

    getValueForType(order: any, type: string) {
        let textData = ''
        order.items[0].customizations.forEach(cust => {
            if(cust.type==type) {
                textData = cust.name + (cust.price?('($'+ cust.price+')'):'');
                return textData;
            }
        });
        return textData;
    }

    updateOrders(orders) {
        return this.http.put<any>('api/checkout/orders', orders)
    }

    deleteOrder(orderId: string) {
        return this.http.delete<any>('api/checkout/orders/' + orderId)
    }

    deleteAllOrders() {
        return this.http.delete<any>('api/checkout/orders')
    }
}
