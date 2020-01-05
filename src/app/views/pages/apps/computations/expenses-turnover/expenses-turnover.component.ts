// Angular
import { Component, OnInit, OnDestroy } from '@angular/core';
import { Observable, BehaviorSubject } from 'rxjs';
import { Router } from '@angular/router';
// Services and Models
import { AssetsService } from '../../../../../core/assets';
import { FormGroup, FormBuilder } from '@angular/forms';

@Component({
	// tslint:disable-next-line:component-selector
	selector: 'kt-expenses-turnover',
	templateUrl: './expenses-turnover.component.html',
	styleUrls: ['./expenses-turnover.component.scss'],
})
export class ExpensesTurnoverComponent implements OnInit, OnDestroy {
	loading$: Observable<boolean>;
	loadingSubject = new BehaviorSubject<boolean>(true);
	reportDetails: any;
	recurringForm: FormGroup;
	pageTitle = 'Capital expenditure';
	allAssets = [];
	analyticsData;
	selectedCurrency = '₦';
	allUsers;
	expTurnovers;
	naira = '₦';
	passedCurrency = '₦';
	dollar = '$';
	selectedName = 'All assets';
	years = [2020, 2019, 2018, 2017, 2016, 2015, 2014, 2013, 2012, 2011];

	constructor(
		private assetsService: AssetsService,
		private router: Router,
		private fb: FormBuilder) { }

	ngOnInit() {
		this.initAnalytics();
		this.loading$ = this.loadingSubject.asObservable();
		this.loadingSubject.next(true);
		this.getAllAssets();
	}

	getAllAssets() {
		this.loadingSubject.next(true);
		this.assetsService.getAllAssets().subscribe(
			assetsAll => {
				this.allAssets = assetsAll['data'];
				this.loadingSubject.next(false);
			}
		);
	}


	generateTurnover(name, id) {
		let payload = { id };
		this.selectedName = name;
		this.loadingSubject.next(true);
		this.assetsService.getAllAssetsTurnover(payload).subscribe(
			response => {
				this.expTurnovers = response;
				if (this.expTurnovers.expenses[0].currenct === 'naira') {
					this.passedCurrency = '₦';
				} else {
					this.passedCurrency = '$';
				}
				this.loadingSubject.next(false);
			},
			error => {
				console.log('error', error);
			}
		);
	}


	initAnalytics() {
		this.loadingSubject.next(true);
		const payload = null;
		console.log('payload sent', payload);
		this.assetsService.getAllAssetsTurnover(payload).subscribe(
			response => {
				this.expTurnovers = response;
				console.log('analytics oninit', this.expTurnovers);
				this.loadingSubject.next(false);
			},
			error => {
				console.log('error', error);
			}
		);
	}

	ngOnDestroy() { }
}
