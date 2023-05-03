const MANAGE_ROUTE_DRAWER_LAYOUT = [
	[
        {
            text: "Home", 
            route: "/"
        }
    ],
	[
        {
            text: "Order", 
            route: "/Order/Customer"
        }, 
        {
            text: "Serve",
            route: "/Order/Server",
            tags: ["server"],
        },
        {
            text: "Manage", 
            route: "/Manage",
            tags: ["manage"],
        }
    ],
	[  
		{
            text: "Inventory", 
            route: "/Manage/Inventory",
            tags: ["manage"],
            showWhenRouteStartsWith: "/Manage",
        }, 
		{
            text: "Menu", 
            route: "/Manage/Menu",
            tags: ["manage"],
            showWhenRouteStartsWith: "/Manage",
        },
		{
            text: "Reports", 
            route: "/Manage/Reports",
            tags: ["manage"],
            showWhenRouteStartsWith: "/Manage",
        },
	]
]

export default MANAGE_ROUTE_DRAWER_LAYOUT