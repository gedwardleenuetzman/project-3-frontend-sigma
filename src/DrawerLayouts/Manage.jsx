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
            tags: ["manager"],
        }
    ],
	[  
		{
            text: "Inventory", 
            route: "/Manage/Inventory",
            tags: ["manager"],
            showWhenRouteStartsWith: "/Manage",
        }, 
		{
            text: "Menu", 
            route: "/Manage/Menu",
            tags: ["manager"],
            showWhenRouteStartsWith: "/Manage",
        },
		{
            text: "Reports", 
            route: "/Manage/Reports",
            tags: ["manager"],
            showWhenRouteStartsWith: "/Manage",
        },
	]
]

export default MANAGE_ROUTE_DRAWER_LAYOUT