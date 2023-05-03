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
        }, 
		{
            text: "Menu", 
            route: "/Manage/Menu",
            tags: ["manage"],
        },
		{
            text: "Reports", 
            route: "/Manage/Reports",
            tags: ["manage"],
        },
	]
]

export default MANAGE_ROUTE_DRAWER_LAYOUT