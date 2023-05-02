import MANAGE_ROUTE_DRAWER_LAYOUT from 'src/DrawerLayouts/Manage'

const LAYOUT = [
    [  
		{
            text: "Excess Reports", 
            route: "/Manage/Reports/ExcessReports"
        }, 
		{
            text: "Z Reports", 
            route: "/Manage/Reports/ZReports"
        },
		{
            text: "X Reports", 
            route: "/Manage/Reports/XReports"
        },
        {
            text: "Sales Reports", 
            route: "/Manage/Reports/SalesReports"
        },
	]
]

const MANAGE_REPORTS_ROUTE_DRAWER_LAYOUT = [...MANAGE_ROUTE_DRAWER_LAYOUT, ...LAYOUT]

export default MANAGE_REPORTS_ROUTE_DRAWER_LAYOUT