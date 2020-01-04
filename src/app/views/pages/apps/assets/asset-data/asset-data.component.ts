import { Component, OnInit, OnDestroy } from '@angular/core';
import { Observable, BehaviorSubject } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';
import { AssetsService } from '../../../../../core/assets';
import { LayoutUtilsService, MessageType } from '../../../../../core/_base/crud';
import { FormGroup, FormBuilder, FormControl } from '@angular/forms';
import { UserService } from '../../../../../core/users';
import { Location } from '@angular/common';

@Component({
	selector: 'kt-asset-data',
	templateUrl: './asset-data.component.html',
	styleUrls: ['./asset-data.component.scss']
})
// recurrent_month
// recurrent_expenditure_year
// historical_data
export class AssetDataComponent implements OnInit, OnDestroy {
	loading$: Observable<boolean>;
	loadingSubject = new BehaviorSubject<boolean>(true);
	proceedingOption: string;
	assetDataId: string;
	assetDetails: any;
	pageTitle = 'Asset form';
	hasFormErrors = false;
	fSelectedIcon;
	fSelectedLocation;
	fSelectedIndustrial;
	fSelectedSchematics;
	fileNameIcon;
	fileNameLocation;
	fileNameIndustrial;
	fileNameSchematics;
	oldAssetData: FormGroup;
	assetData: any;
	formFields = [];
	localForms = JSON.parse(localStorage.getItem('formElement'));
	localFields = this.localForms.form;
	forms: any = this.localFields;
	dataFormGroup: FormGroup;
	reccurentFormGroup: FormGroup;
	reccurentDollarFormGroup: FormGroup;
	reccurentMonthFormGroup: FormGroup;
	historicalFormGroup: FormGroup;
	historicalDollarFormGroup: FormGroup;
	selected = 'main_form';
	showReccurentMonth = false;
	showReccurentYear = false;
	showHistorical = false;
	editAssetInit = false;
	assetName = '';
	costDollar = '0';
	projected_cost_dollar = '0';
	staffs = [];
	formMap: any;
	myForms: any;
	myformsName: any;
	sForm;
	formTypes;
	currencySelected = 'naira';
	customFields;
	customModels: any;
	constructor(
		private route: ActivatedRoute,
		private fb: FormBuilder,
		private _location: Location,
		private assetsService: AssetsService,
		private layoutUtilsService: LayoutUtilsService,
		private usersService: UserService,
		private router: Router) { }

	ngOnInit() {
		this.getAllStaffs();
		console.clear();
		let group = {};
		this.formMap = {};
		this.myForms = [];
		this.myformsName = [];
		this.localFields.forEach(input_template => {
			group[input_template.id] = new FormControl('');
		});
		this.dataFormGroup = new FormGroup(group);
		console.log('data form groupp', this.dataFormGroup);
		this.localFields.forEach(field => {
			if (field.id === 'recurrent_expenditure_year') {
				this.showReccurentYear = true;
			}
			if (field.id === 'recurrent_expenditure_month') {
				this.showReccurentMonth = true;
			}
			if (field.id === 'historical_cost') {
				this.showHistorical = true;
			}
			if (field.custom === true) {
				this.customFields = [];
				this.customModels = [];
				this.customModels.push(field.id);
				this.customFields.push(
					{ name: field['id'], value: '' }
				);
			}
		});
		this.loading$ = this.loadingSubject.asObservable();
		this.assetDataId = this.route.snapshot.params['id'];
		if (this.assetDataId) {
			this.getAssetDetails();
			this.editAssetInit = true;
		}
		this.emptyReccurentForm();
		this.emptyReccurentMonthForm();
		this.emptyHistoricalCost();
	}

	changeCustom(e, id) {
		console.log(e.target.value, id);
		let allCustoms = this.customFields;
		allCustoms.forEach(custom => {
			if (custom.name === id) {
				custom.value = e.target.value;
			}
		});
		allCustoms = this.customFields;
	}

	goBack() {
		this._location.back();
	}

	getAssetDetails() {
		this.loadingSubject.next(true);
		this.assetsService.getAssetDataById(this.assetDataId).subscribe(
			singleAsset => {
				this.assetDetails = singleAsset['data'];
				console.log('this assetdata details oninit', this.assetDetails);
				this.dataFormGroup.patchValue(this.assetDetails);
				this.assetName = this.assetDetails.name;
				this.costDollar = this.assetDetails.cost_dollar;
				if (this.assetDetails.historical_data.length) {
					this.initHistoricalCost(this.assetDetails.historical_data);
				}
				if (this.assetDetails.recurrent_month.length) {
					this.initReccurentMonthForm(this.assetDetails.recurrent_month);
				}
				if (this.assetDetails.recurrent_year.length) {
					this.initReccurentForm(this.assetDetails.recurrent_year);
				}
				this.editAssetInit = true;
				this.loadingSubject.next(false);
			},
			error => {
				console.log('error occured', error);
				this.loadingSubject.next(false);
			}
		);
	}
	getAllStaffs() {
		this.loading$ = this.loadingSubject.asObservable();
		this.loadingSubject.next(true);
		this.usersService.getStaffs(0, 999).subscribe(
			response => {
				this.staffs = response['data'];
				this.formTypes = response['data'];
				this.loadingSubject.next(false);
			},
			error => {
				console.log('error', error);
			}
		);
	}

	selectMenu(item) {
		return this.selected = item;
	}

	emptyReccurentForm() {
		this.reccurentFormGroup = this.fb.group({
			year12: [''],
			year12_dollar: [''],
			year13: [''],
			year13_dollar: [''],
			year14: [''],
			year14_dollar: [''],
			year15: [''],
			year15_dollar: [''],
			year16: [''],
			year16_dollar: [''],
			year17: [''],
			year17_dollar: [''],
			year18: [''],
			year18_dollar: [''],
			year19: [''],
			year19_dollar: [''],
			year20: [''],
			year20_dollar: [''],
			gross_naira: [''],
			gross_dollar: [''],
			note: ['']
		});
	}


	initReccurentForm(reccurentData) {
		this.reccurentFormGroup = this.fb.group({
			year12: [reccurentData[0].amount || ''],
			year12_dollar: [reccurentData[1].amount || ''],

			year13: [reccurentData[2].amount || ''],
			year13_dollar: [reccurentData[3].amount || ''],

			year14: [reccurentData[4].amount || ''],
			year14_dollar: [reccurentData[5].amount || ''],

			year15: [reccurentData[6].amount || ''],
			year15_dollar: [reccurentData[7].amount || ''],

			year16: [reccurentData[8].amount || ''],
			year16_dollar: [reccurentData[9].amount || ''],

			year17: [reccurentData[10].amount || ''],
			year17_dollar: [reccurentData[11].amount || ''],

			year18: [reccurentData[12].amount || ''],
			year18_dollar: [reccurentData[13].amount || ''],

			year19: [reccurentData[14].amount || ''],
			year19_dollar: [reccurentData[15].amount || ''],

			year20: [reccurentData[16].amount || ''],
			year20_dollar: [reccurentData[17].amount || ''],

			gross_naira: [reccurentData.gross.naira || ''],
			gross_dollar: [reccurentData.gross.dollar || ''],
			note: [reccurentData.note]
		});
	}

	emptyHistoricalCost() {
		this.historicalFormGroup = this.fb.group({
			year12: [''],
			year12_dollar: [''],

			year13: [''],
			year13_dollar: [''],

			year14: [''],
			year14_dollar: [''],

			year15: [''],
			year15_dollar: [''],

			year16: [''],
			year16_dollar: [''],

			year17: [''],
			year17_dollar: [''],

			year18: [''],
			year18_dollar: [''],

			year19: [''],
			year19_dollar: [''],

			year20: [''],
			year20_dollar: [''],

		});
	}

	initHistoricalCost(historicalData) {
		this.historicalFormGroup = this.fb.group({
			year12: [historicalData[0].amount || ''],
			year12_dollar: [historicalData[0].amount || ''],

			year13: [historicalData[1].amount || ''],
			year13_dollar: [historicalData[1].amount || ''],

			year14: [historicalData[2].amount || ''],
			year14_dollar: [historicalData[2].amount || ''],

			year15: [historicalData[3].amount || ''],
			year15_dollar: [historicalData[3].amount || ''],

			year16: [historicalData[4].amount || ''],
			year16_dollar: [historicalData[4].amount || ''],

			year17: [historicalData[5].amount || ''],
			year17_dollar: [historicalData[5].amount || ''],

			year18: [historicalData[6].amount || ''],
			year18_dollar: [historicalData[6].amount || ''],

			year19: [historicalData[7].amount || ''],
			year19_dollar: [historicalData[7].amount || ''],

			year20: [historicalData[8].amount || ''],
			year20_dollar: [historicalData[8].amount || ''],

		});
	}

	emptyReccurentMonthForm() {
		this.reccurentMonthFormGroup = this.fb.group({
			january: [0],
			february: [0],
			march: [0],
			april: [0],
			may: [0],
			june: [0],
			july: [0],
			august: [0],
			september: [0],
			october: [0],
			november: [0],
			december: [0],
		});
	}

	initReccurentMonthForm(reccurentData) {
		this.reccurentMonthFormGroup = this.fb.group({
			january: [reccurentData[1].january || 0],
			february: [reccurentData[2].february || 0],
			march: [reccurentData[3].march || 0],
			april: [reccurentData[4].april || 0],
			may: [reccurentData[5].may || 0],
			june: [reccurentData[6].june || 0],
			july: [reccurentData[7].july || 0],
			august: [reccurentData[8].august || 0],
			september: [reccurentData[9].september || 0],
			october: [reccurentData[10].october || 0],
			november: [reccurentData[11].november || 0],
			december: [reccurentData[12].december || 0],
		});
	}


	onSubmit() {
		this.hasFormErrors = false;
		const controls = this.dataFormGroup.controls;
		this.loadingSubject.next(true);
		/** check form */
		if (this.dataFormGroup.invalid) {
			this.loadingSubject.next(false);
			Object.keys(controls).forEach(controlName =>
				controls[controlName].markAsTouched()
			);
			this.hasFormErrors = true;
			return;
		}
		if (this.editAssetInit) {
			this.updateAssetMainData();
			return;
		} else {
			this.addAssetMainData();
		}
	}

	addReccurentYear(formName) {
		this.loadingSubject.next(true);
		let formData = [
			{
				year: 2012,
				amount: {
					naira: this.reccurentFormGroup.get('year12').value || 0,
					dollar: this.reccurentFormGroup.get('year12_dollar').value || 0
				}
			},
			{
				year: 2013,
				amount: {
					naira: this.reccurentFormGroup.get('year13').value || 0,
					dollar: this.reccurentFormGroup.get('year13_dollar').value || 0
				}
			},
			{
				year: 2014,
				amount: {
					naira: this.reccurentFormGroup.get('year14').value || 0,
					dollar: this.reccurentFormGroup.get('year14_dollar').value || 0
				}
			},
			{
				year: 2015,
				amount: {
					naira: this.reccurentFormGroup.get('year15').value || 0,
					dollar: this.reccurentFormGroup.get('year15_dollar').value || 0
				}
			},
			{
				year: 2016,
				amount: {
					naira: this.reccurentFormGroup.get('year16').value || 0,
					dollar: this.reccurentFormGroup.get('year16_dollar').value || 0
				}
			},
			{
				year: 2017,
				amount: {
					naira: this.reccurentFormGroup.get('year17').value || 0,
					dollar: this.reccurentFormGroup.get('year17_dollar').value || 0
				}
			},
			{
				year: 2018,
				amount: {
					naira: this.reccurentFormGroup.get('year18').value || 0,
					dollar: this.reccurentFormGroup.get('year18_dollar').value || 0
				}
			},
			{
				year: 2019,
				amount: {
					naira: this.reccurentFormGroup.get('year19').value || 0,
					dollar: this.reccurentFormGroup.get('year19_dollar').value || 0
				}
			},
			{
				year: 2020,
				amount: {
					naira: this.reccurentFormGroup.get('year20').value || 0,
					dollar: this.reccurentFormGroup.get('year20_dollar').value || 0
				}
			},
		];
		let gross = {
			naira: this.reccurentFormGroup.get('gross_naira').value || 0,
			dollar: this.reccurentFormGroup.get('gross_dollar').value || 0,
			note: this.reccurentFormGroup.get('note').value,
		};
		const payload = {
			data: formData,
			type: formName,
			currency: 'naira',
			gross: gross,
			asset_data_id: localStorage.getItem('asset_data_id'),
		};
		this.assetsService.addCharts(payload).subscribe(
			data => {
				this.loadingSubject.next(false);
				const message = `Asset chart been successfully updated`;
				this.layoutUtilsService.showActionNotification(message, MessageType.Create, 10000, true, true);
				if (data.status === true && this.showReccurentMonth) {
					this.selected = 'reccurent_month';
				} else if (data.status === true && this.showHistorical) {
					this.selected = 'historical_cost';
				} else {
					this.router.navigate([`/cdash/assets/data/${this.localForms._id}`]);
				}
			},
			error => {
				this.loadingSubject.next(false);
				console.log('Error response', error);
				const title = 'Please Retry';
				const message = 'Sorry, Temporary Error Occured';
				this.layoutUtilsService.showActionNotification(message, MessageType.Create, 10000, true, true);
			});
	}

	addReccurentMonth(formName) {
		this.loadingSubject.next(true);
		const formData = [
			{
				month: 'january',
				amount: this.reccurentMonthFormGroup.get('january').value
			},
			{
				month: 'february',
				amount: this.reccurentMonthFormGroup.get('february').value
			},
			{
				month: 'march',
				amount: this.reccurentMonthFormGroup.get('march').value
			},
			{
				month: 'april',
				amount: this.reccurentMonthFormGroup.get('april').value
			},
			{
				month: 'may',
				amount: this.reccurentMonthFormGroup.get('may').value
			},
			{
				month: 'june',
				amount: this.reccurentMonthFormGroup.get('june').value
			},
			{
				month: 'july',
				amount: this.reccurentMonthFormGroup.get('july').value
			},
			{
				month: 'august',
				amount: this.reccurentMonthFormGroup.get('august').value
			},
			{
				month: 'september',
				amount: this.reccurentMonthFormGroup.get('september').value
			},
			{
				month: 'october',
				amount: this.reccurentMonthFormGroup.get('october').value
			},
			{
				month: 'november',
				amount: this.reccurentMonthFormGroup.get('november').value
			},
			{
				month: 'december',
				amount: this.reccurentMonthFormGroup.get('december').value
			},
		];
		const payload = {
			data: formData,
			type: formName,
			currency: this.currencySelected,
			asset_data_id: localStorage.getItem('asset_data_id'),
		};
		this.assetsService.addCharts(payload).subscribe(
			data => {
				this.loadingSubject.next(false);
				const message = `Asset chart been successfully updated`;
				this.layoutUtilsService.showActionNotification(message, MessageType.Create, 10000, true, true);
				if (data.status === true && this.showHistorical) {
					this.selected = 'historical_cost';
				}
			},
			error => {
				this.loadingSubject.next(false);
				console.log('Error response', error);
				const title = 'Please Retry';
				const message = 'Sorry, Temporary Error Occured';
				this.layoutUtilsService.showActionNotification(message, MessageType.Create, 10000, true, true);
			});
	}

	addHistoricalCost(formName) {
		this.loadingSubject.next(true);
		let formData = [
			{
				year: 2012,
				amount: {
					naira: this.historicalDollarFormGroup.get('year12').value || 0,
					dollar: this.historicalDollarFormGroup.get('year12_dollar').value || 0
				}
			},
			{
				year: 2013,
				amount: {
					naira: this.historicalDollarFormGroup.get('year13').value || 0,
					dollar: this.historicalDollarFormGroup.get('year13_dollar').value || 0
				}
			},
			{
				year: 2014,
				amount: {
					naira: this.historicalDollarFormGroup.get('year14').value || 0,
					dollar: this.historicalDollarFormGroup.get('year14_dollar').value || 0
				}
			},
			{
				year: 2015,
				amount: {
					naira: this.historicalDollarFormGroup.get('year15').value || 0,
					dollar: this.historicalDollarFormGroup.get('year15_dollar').value || 0
				}
			},
			{
				year: 2016,
				amount: {
					naira: this.historicalDollarFormGroup.get('year16').value || 0,
					dollar: this.historicalDollarFormGroup.get('year16_dollar').value || 0
				}
			},
			{
				year: 2017,
				amount: {
					naira: this.historicalDollarFormGroup.get('year17').value || 0,
					dollar: this.historicalDollarFormGroup.get('year17_dollar').value || 0
				}
			},
			{
				year: 2018,
				amount: {
					naira: this.historicalDollarFormGroup.get('year18').value || 0,
					dollar: this.historicalDollarFormGroup.get('year18_dollar').value || 0
				}
			},
			{
				year: 2019,
				amount: {
					naira: this.historicalDollarFormGroup.get('year19').value || 0,
					dollar: this.historicalDollarFormGroup.get('year19_dollar').value || 0
				}
			},
			{
				year: 2020,
				amount: {
					naira: this.historicalDollarFormGroup.get('year20').value || 0,
					dollar: this.historicalDollarFormGroup.get('year20_dollar').value || 0
				}
			},
		];

		const payload = {
			data: formData,
			type: formName,
			currency: 'naira',
			asset_data_id: localStorage.getItem('asset_data_id'),
		};
		this.assetsService.addCharts(payload).subscribe(
			data => {
				this.loadingSubject.next(false);
				const message = `Asset chart been successfully updated`;
				this.layoutUtilsService.showActionNotification(message, MessageType.Create, 10000, true, true);
				this.router.navigate(['/cdash/assets/assets']);
			},
			error => {
				this.loadingSubject.next(false);
				console.log('Error response', error);
				const title = 'Please Retry';
				const message = 'Sorry, Temporary Error Occured';
				this.layoutUtilsService.showActionNotification(message, MessageType.Create, 10000, true, true);
			});
	}

	addAssetMainData() {
		console.log('calling add new');
		this.loadingSubject.next(true);
		let payload = new FormData();
		let forms = this.dataFormGroup.value;
		let cost = {
			naira: this.dataFormGroup.get('cost').value,
			dollar: this.costDollar
		};
		for (let key in forms) {
			payload.append(key, forms[key]);
		}
		if (this.fSelectedIcon) {
			payload.append('icon', this.fSelectedIcon, this.fSelectedIcon.name);
		}
		if (this.fSelectedIndustrial) {
			payload.append('industrial_link', this.fSelectedIndustrial, this.fSelectedIndustrial.name);
		}
		if (this.fSelectedLocation) {
			payload.append('location_of_deployment_image', this.fSelectedLocation, this.fSelectedLocation.name);
		}
		if (this.fSelectedSchematics) {
			payload.append('diagram_schematics', this.fSelectedSchematics, this.fSelectedSchematics.name);
		}
		if (this.customFields) {
			payload.append('custom_data', JSON.stringify(this.customFields));
		}
		if (this.dataFormGroup.get('projected_cost').value) {
			let projected_cost = {
				naira: this.dataFormGroup.get('projected_cost').value,
				dollar: this.projected_cost_dollar
			};
			payload.set('projected_cost', JSON.stringify(projected_cost));
		}
		payload.set('business_owners', this.myForms);
		payload.set('cost', JSON.stringify(cost));
		payload.append('name', this.assetName);
		payload.append('asset_id', this.localForms._id);
		this.assetsService.createAssetData(payload).subscribe(
			data => {
				this.loadingSubject.next(false);
				this.reset();
				const message = `Asset been successfully added`;
				this.layoutUtilsService.showActionNotification(message, MessageType.Create, 10000, true, true);
				if (data.status === true && this.showReccurentYear) {
					this.selected = 'reccurent_year';
				} else if (data.status === true && this.showReccurentMonth) {
					this.selected = 'reccurent_month';
				} else if (data.status === true && this.showHistorical) {
					this.selected = 'historical_cost';
				} else {
					this.router.navigate([`/cdash/assets/data/${this.localForms._id}`]);
				}
				localStorage.setItem('asset_data_id', data.data._id);
			},
			error => {
				this.loadingSubject.next(false);
				console.log('Error response', error);
				const title = 'Please Retry';
				const message = 'Sorry, Temporary Error Occured';
				this.layoutUtilsService.showActionNotification(message, MessageType.Create, 10000, true, true);
			});
	}

	updateAssetMainData() {
		console.log('calling edit');
		this.loadingSubject.next(true);
		let payload = new FormData();
		let forms = this.dataFormGroup.value;
		let cost = {
			naira: this.dataFormGroup.get('cost').value,
			dollar: this.costDollar
		};
		for (let key in forms) {
			payload.append(key, forms[key]);
		}
		if (this.fSelectedIcon) {
			payload.append('icon', this.fSelectedIcon, this.fSelectedIcon.name);
		}
		if (this.fSelectedIndustrial) {
			payload.append('industrial_link', this.fSelectedIndustrial, this.fSelectedIndustrial.name);
		}
		if (this.fSelectedLocation) {
			payload.append('location_of_deployment_image', this.fSelectedLocation, this.fSelectedLocation.name);
		}
		if (this.fSelectedSchematics) {
			payload.append('diagram_schematics', this.fSelectedSchematics, this.fSelectedSchematics.name);
		}
		if (this.customFields) {
			payload.append('custom_data', JSON.stringify(this.customFields));
		}
		if (this.dataFormGroup.get('projected_cost').value) {
			let projected_cost = {
				naira: this.dataFormGroup.get('projected_cost').value,
				dollar: this.projected_cost_dollar
			};
			payload.set('projected_cost', JSON.stringify(projected_cost));
		}
		payload.set('business_owners', this.myForms);
		payload.append('name', this.assetName);
		payload.append('asset_id', this.localForms._id);
		payload.set('cost', JSON.stringify(cost));
		this.assetsService.updateAssetData(payload, this.assetDataId).subscribe(
			data => {
				this.loadingSubject.next(false);
				const message = `Asset been successfully updated`;
				this.layoutUtilsService.showActionNotification(message, MessageType.Create, 10000, true, true);
				if (data.status === true && this.showReccurentYear) {
					this.selected = 'reccurent_year';
				} else if (data.status === true && this.showReccurentMonth) {
					this.selected = 'reccurent_month';
				} else if (data.status === true && this.showHistorical) {
					this.selected = 'historical_cost';
				} else {
					this.router.navigate([`/cdash/assets/data/${this.localForms._id}`]);
				}
			},
			error => {
				this.loadingSubject.next(false);
				console.log('Error response', error);
				const title = 'Please Retry';
				const message = 'Sorry, Temporary Error Occured';
				this.layoutUtilsService.showActionNotification(message, MessageType.Create, 10000, true, true);
			});
	}

	reset() {
		this.assetData = Object.assign({}, this.oldAssetData);
		// this.initAssetForm();
		this.hasFormErrors = false;
		this.dataFormGroup.markAsPristine();
		this.dataFormGroup.markAsUntouched();
		this.dataFormGroup.updateValueAndValidity();
	}

	onFileChange(event, type) {
		if (type === 'diagram') {
			if (event.target.files.length > 0) {
				this.fSelectedSchematics = event.target.files[0];
				console.log('on diagram schematics', this.fSelectedSchematics);
				this.fileNameSchematics = event.target.files[0].name;
			}
		}
		if (type === 'industrial_link') {
			if (event.target.files.length > 0) {
				this.fSelectedIndustrial = event.target.files[0];
				this.fileNameIndustrial = event.target.files[0].name;
				console.log('on diagram schematics', this.fSelectedIndustrial);
			}
		}
		if (type === 'location_of_deployment_image') {
			if (event.target.files.length > 0) {
				this.fSelectedLocation = event.target.files[0];
				this.fileNameLocation = event.target.files[0].name;
				console.log('on diagram schematics', this.fSelectedLocation);
			}
		}
		if (type === 'icon') {
			if (event.target.files.length > 0) {
				this.fSelectedIcon = event.target.files[0];
				this.fileNameIcon = event.target.files[0].name;
				console.log('on diagram schematics', this.fSelectedIcon);
			}
		}
	}

	onAlertClose($event) {
		this.hasFormErrors = false;
	}

	handleFormChange(event) {
		console.log(event.target.value);
		if (event.target.value === '') {
			return;
		}
		this.sForm = event.target.value;
		this.formPush();
	}

	formPush() {
		if (this.formMap[this.sForm] === undefined || this.formMap[this.sForm] === false) {
			for (let i = 0; i < this.formTypes.length; i++) {
				if (this.formTypes[i]._id === this.sForm) {
					this.myformsName.push(this.formTypes[i]);
					this.myForms.push(this.formTypes[i]._id);
				}
			}
			this.formMap[this.sForm] = true;
		}
		console.log('myforms', this.myForms);
		console.log('myforms', this.myformsName);
	}

	formRemove(form) {
		console.log('form', form);
		for (let i = 0; i < this.myForms.length; i++) {
			if (this.myForms[i].id === form.id) {
				console.log(form.id);
				this.myForms.splice(i, 1);
			}
		}
		for (let i = 0; i < this.myformsName.length; i++) {
			if (this.myformsName[i].id === form.id) {
				console.log(form.id);
				this.myformsName.splice(i, 1);
			}
		}
	}

	ngOnDestroy() { }
}
