import { MenuItem } from "primeng/api"

export class StockConstants {

    static getMenuItems() {
        console.log("In getMenuItems method");
        const MENU_ITEMS: MenuItem[] = [
            {
                label: "Home", items: [
                    {label: "Refresh Stock Price", url: "/home/refresh-stock-price"}
                ]
            },
            {
                label: "User", items: [
                    { label: "Users", url: "/home/user-detail" }
                ]
            },
            {
                label: "Stock", items: [
                    { label: "Stock List", url: "/home/stock-list" },
                    { label: "Investment", url: "/home/stock-purchase" }
                ]
            }
        ];
        return MENU_ITEMS;
    }

    static SECTORS = [
        { label: 'Select a Sector',value: null },
        { label: 'FINANCIAL',value: 'Finacial' },
        { label: 'CUSTOMER',value:  'Customer' },
        { label: 'DISCRETIONARY',value:  'Discretionary' },
        { label: 'UTILITIES',value:  'Utilities' },
        { label: 'INFORMATIONAL',value:  'Informational' },
        { label: 'TECHNOLOGIES',value:  'technologies' },
        { label: 'HEALTHCARE',value:  'Healthcare' },
        { label: 'INDUSTRIES',value:  'Industries' },
        { label: 'COMMUNUCATION',value:  'Communication' },
        { label: 'ENERGY',value:  'Energy' }
    ]

    static DATE_FORMAT="yy-mm-dd";
}