// Angular
import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable, BehaviorSubject } from 'rxjs';
// Services and Models
import { ClaimModel, ClaimsService } from '../../../../../core/claims';

// material for table
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';

@Component({
	selector: 'kt-leaves-list',
	templateUrl: './leaves-list.component.html',
	styleUrls: ['./leaves-list.component.scss']
})
export class LeavesListComponent implements OnInit, OnDestroy {
	loading$: Observable<boolean>;
	loadingSubject = new BehaviorSubject<boolean>(true);
	leaves: ClaimModel[];
	proceedingColumns: string[] = ['Name', 'Start Date', 'End Date'];
	dataSource: any;
	pageIndex = 0;
	limit = 10;
	resultsLength: number = 0;
	disablePrev = true;
	disableNext: boolean;
	// dataSource = new MatTableDataSource(LEAD_DATA);
	constructor(private claimsService: ClaimsService) { }

	ngOnInit() {
		this.loading$ = this.loadingSubject.asObservable();
		this.loadingSubject.next(true);
		this.claimsService.getClaimsCount(1, 'leave','').subscribe(
			countResult => {
				this.resultsLength = countResult['count'];
				if ( this.resultsLength <= 10) {
					console.log('not up to 10', this.resultsLength);
					this.disableNext = true;
				} else {
					console.log('up to 10', this.resultsLength);
					this.disableNext = false;
				}
			}
		);
		let skip = this.pageIndex * this.limit;
		this.getLeaves(skip, this.limit);
	}

	getLeaves(skip, limit) {
		this.loading$ = this.loadingSubject.asObservable();
		this.loadingSubject.next(true);
		this.claimsService.getClaims(skip, limit, 'leave','').subscribe(
			responseData => {
				this.leaves = responseData['success'];
				this.dataSource = new MatTableDataSource<ClaimModel>(this.leaves);
				this.loadingSubject.next(false);
				console.log('all leaves returned', this.leaves);
			},
			error => {
				console.log('error', error);
			});
	}

	countLeaves() {
		this.claimsService.getClaimsCount(1, 'leave','').subscribe(
			countResult => {
				this.resultsLength = countResult['count'];
				if (this.pageIndex > 0) {
					this.disablePrev = false;
				}
			}
		);
	}

	itemNav() {
		if (((this.pageIndex * 10) + 10) >= this.resultsLength) {
			this.disableNext = true;
			console.log('paste total numbers');
			// return;
		} else {
			this.disableNext = false;
		}
		if (this.pageIndex === 0) {
			this.disablePrev = true;
			console.log('last page');
			// return;
		} else {
			this.disablePrev = false;
		}
	}
	getNext() {
		this.pageIndex = this.pageIndex + 1;
		let skip = this.pageIndex * this.limit;
		this.getLeaves(skip, this.limit);
		this.countLeaves();
		this.itemNav();
	}

	getPrev() {
		this.pageIndex = this.pageIndex - 1;
		let skip = this.pageIndex * this.limit;
		this.getLeaves(skip, this.limit);
		this.countLeaves();
		this.itemNav();
	}

	ngOnDestroy() { }
}

