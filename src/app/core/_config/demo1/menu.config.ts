export class MenuConfig {
	public defaults: any = {
		header: {
			self: {},
			'items': []
		},
		aside: {
			self: {},
			items: [
				{
					title: 'Dashboard',
					root: true,
					icon: 'flaticon2-architecture-and-city',
					page: 'dashboard',
					translate: 'MENU.DASHBOARD',
					bullet: 'dot',
				},
				{
					title: 'User management',
					root: true,
					bullet: 'dot',
					icon: 'flaticon2-expand',
					submenu: [
						{
							title: 'Human assets',
							page: 'users/staffs',
							root: true,
							bullet: 'dot',
						},
						{
							title: 'All users',
							page: 'users/users',
							root: true,
							bullet: 'dot',
						},
						{
							title: 'User roles',
							page: 'users/roles',
							root: true,
							bullet: 'dot',
						},
					]
				},

				// asset form element
				{
					title: 'Assets',
					root: true,
					icon: 'flaticon-folder',
					page: 'assets',
					translate: 'MENU.DASHBOARD',
					bullet: 'dot',
				},
				{
					title: 'Computations',
					page: 'computations',
					root: true,
					bullet: 'dot',
					icon: 'flaticon-users',
					submenu: [
						{
							title: 'Recurring expenditure',
							page: 'computations/recurring-expenditure',
							root: true,
							bullet: 'dot',
							icon: 'flaticon-users',
						},
						{
							title: 'Capital expenditure',
							page: 'computations/capital-expenditure',
							root: true,
							bullet: 'dot',
							icon: 'flaticon-chat-1',
						},
						{
							title: 'Expenses/TurnoverRatio',
							page: 'computations/expenses-turnover',
							root: true,
							bullet: 'dot',
							icon: 'flaticon-graphic-2',
						},
						{
							title: 'ICT/ maturity score',
							page: 'computations',
							bullet: 'dot',
							icon: 'flaticon2-digital-marketing',
							root: true,
						}
					]
				},
				{
					title: 'Access logs',
					root: true,
					bullet: 'dot',
					icon: 'flaticon-graphic-2',
					page: 'logs'
				},
				{
					title: 'Organization Settings',
					page: 'organizations',
					root: true,
					bullet: 'dot',
					icon: 'flaticon-signs-1',
				},
				{
					title: 'Socials',
					page: 'socials',
					root: true,
					bullet: 'dot',
					icon: 'flaticon2-browser-2',
				}
			]
		},
	};

	public get configs(): any {
		return this.defaults;
	}
}
