import { Component, OnInit } from '@angular/core'
import { MatTableDataSource } from '@angular/material/table';
import { SharedService } from '../shared.service';
import { ActivatedRoute, Router } from '@angular/router';

// User Interface
export interface Orders {
    fullname: String;
    email: String;
    roles: String;
    createdAt: String;
    isActive: boolean;
    _id: String;
    hashedPassword: String;
}

@Component({
    selector: 'app-manage-admin',
    templateUrl: './orders.component.html',
    styleUrls: ['./orders.component.scss']
})

export class OrdersComponent implements OnInit {

    displayedColumns: string[] = ['fullname', 'email', 'payment_method', 'quantity','createdAt', 'data', 'total', 'delete'];
    dataSource;
    orders: any[] = [];

    constructor(private sharedService: SharedService,
        private route: ActivatedRoute,
        private router: Router) {
    }
    ngOnInit() {
        this.route
            .queryParams
            .subscribe(params => {
                if (!params['email']) {
                    this.router.navigate(['/admin/manage']);
                } else {
                    this.sharedService.getOrders(params['email'])
                        .subscribe((data) => {
                            if (!data) {
                                return;
                            }
                            this.orders = data;
                            this.dataSource = new MatTableDataSource<Orders>(this.orders);
                        });
                }
            });
    }

    deleteallrecords(): void{
        if (confirm("Are you sure to delete all the purchase history?")){
            this.sharedService.deleteAllOrders()
                        .subscribe((data) => {
                            if (!data) {
                                return;
                            }
                            this.router.navigate(['/customer']);
                        });
        }        
    }   

    deleteOrder(element) {
        if (confirm("Are you sure to delete this order?")){
            this.sharedService.deleteOrder(element.id)
                        .subscribe((data) => {
                            if (!data) {
                                return;
                            }
                            this.router.navigate(['/customer']);
                        });
        }    
    }
}