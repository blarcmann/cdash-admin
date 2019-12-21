import { Component, OnInit } from '@angular/core';
import { Observable, BehaviorSubject } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';
import { VendorModel, VendorsService } from '../../../../../core/vendors';
import { LayoutUtilsService, MessageType } from '../../../../../core/_base/crud';
import { MatDialog, MatDialogConfig } from '@angular/material';
import { PurchaseOrderComponent } from '../purchase-order/purchase-order.component';
import { MatTableDataSource } from '@angular/material/table';

@Component({
	selector: 'kt-vendor',
	templateUrl: './vendor.component.html',
	styleUrls: ['./vendor.component.scss']
})
export class VendorComponent implements OnInit {
	loading$: Observable<boolean>;
	loadingSubject = new BehaviorSubject<boolean>(true);
	proceedingOption: string;
	vendorId: string;
	vendorDetails: any;
	pageTitle = 'Please wait...';
	goods = [];
	good = '';
	quantity = 1;
	POcolumns: any = ['Purchase ID', 'Subject', 'Body', 'Shipping Address'];
	poList;
	dataSourcePO: any;
	constructor(
		private route: ActivatedRoute,
		private vendorsService: VendorsService,
		private layoutUtilsService: LayoutUtilsService,
		private router: Router,
		private dialog: MatDialog) { }

	ngOnInit() {
		this.loading$ = this.loadingSubject.asObservable();
		this.loadingSubject.next(true);
		this.vendorId = this.route.snapshot.params['id'];
		this.getPurchaseOrders(this.vendorId);
		this.vendorsService.getVendorById(this.vendorId).subscribe(
			singleVendor => {
				this.vendorDetails = singleVendor['success'];
				console.log('this vendor details oninit', this.vendorDetails);
				this.loadingSubject.next(false);
				this.goods = this.vendorDetails.goods;
				localStorage.setItem('vendorId', this.vendorDetails._id);
				localStorage.setItem('vendorEmail', this.vendorDetails.email);
				localStorage.setItem('vendorGoods', this.vendorDetails.goods);
				this.pageTitle = `${this.vendorDetails.name} - ${this.vendorDetails.industry}`;
			},
			error => {
				console.log('error occured', error);
				this.loadingSubject.next(false);
			}
		);
		console.log('id returned', this.route.snapshot.params['id']);
	}

	onDelete() {
		const _title: string = 'Delete Vendor';
		const _description: string = 'Are you sure to permanently delete this Vendor?';
		const _waitDesciption: string = 'Deleting Vendor';
		const _deleteMessage = `Vendor has been deleted`;
		const _errorDelete = 'Seems and Error Occured, Retry';

		const dialogRef = this.layoutUtilsService.deleteElement(_title, _description, _waitDesciption);
		dialogRef.afterClosed().subscribe(res => {
			console.log(res);
			if (!res) {
				return;
			}
			this.vendorsService.deleteVendor(this.vendorId).subscribe(
				deleted => {
					console.log('deleted', deleted);
					this.layoutUtilsService.showActionNotification(_deleteMessage, MessageType.Delete);
					this.router.navigate(['/strada/vendors/vendors']);
				},
				error => {
					console.log('error', error);
					this.layoutUtilsService.showActionNotification(_errorDelete, MessageType.Delete);
				}
			);
		});
	}

	addNewGood() {
		let goodsObj: any = {};
		console.log('pushed', this.good);
		if (this.good === '' || this.quantity < 1) {
			return;
		}
		let goood = this.good;
		console.log('goood', goood);
		goodsObj[goood] = this.quantity;
		console.log('goodsObj', goodsObj);
		let totalGoods = {...goodsObj};
		this.goods.push(totalGoods);
		let vendorGoods: any = this.goods;
		localStorage.setItem('vendorGoods', vendorGoods);
		this.good = '';
		this.quantity = 1;
		console.log('goods', this.goods);
	}

	addVendorGood() {
		this.loadingSubject.next(true);
		if (this.good === '') {
			return;
		}
		this.goods.push(this.good);
		const goods = this.goods;
		this.vendorsService.updateVendor({goods}, this.vendorId).subscribe(
			data => {
				console.log('success reponse', data);
				this.loadingSubject.next(false);
			},
			error => {
				this.loadingSubject.next(true);
				console.log('Error response', error);
				const title = 'Please Retry';
				const message = 'Good is not Added to Vendor. Retry';
				this.layoutUtilsService.showActionNotification(message, MessageType.Create, 10000, true, true);
			});
		this.good = '';
		let vendorGoods: any = this.goods;
		localStorage.setItem('vendorGoods', vendorGoods);
	}
	removeGood(id) {
		this.goods.splice(id, 1);
		console.log(id);
	}

	togglePurchaseOrder() {
		const dialogConfig = new MatDialogConfig();
		dialogConfig.disableClose = false;
		dialogConfig.width = '500px';
		const dialogRef = this.dialog.open(PurchaseOrderComponent, dialogConfig);
		dialogRef.afterClosed().subscribe(
		);
	}

	getPurchaseOrders(vendorId) {
		this.vendorsService.getPOs(vendorId).subscribe(
			salesPO => {
				this.poList = salesPO['success'];
				this.dataSourcePO = new MatTableDataSource<any>(this.poList);
				console.log('PO list PO list', salesPO);
				this.loadingSubject.next(false);
			},
			error => {
				const message = 'Sorry, Could not retrieve Purchase Orders';
				this.layoutUtilsService.showActionNotification(message, MessageType.Create, 10000, true, true);
				console.log('error occured', error);
				this.loadingSubject.next(false);
			}
		);
	}

}
