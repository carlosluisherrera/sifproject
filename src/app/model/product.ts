export class Product {
    id:number;
    code:number;
    description:string;
    quantity:number;
    checked:boolean;
    quantity_on_system:number;
    slot_count:number;
    added_amount:number;
    lastOfFirstOfNuLote:number;
    is_die_cut:boolean;
    last_counting_date:string;
    price:number;
    avg_price:number;
    utility:number;
    unity_cost:number;
    barcode:string;
    category_code:string;
    category:string;
    tag_print:boolean;
    quantity_difference:number;
    phase: number;
    checked_by?:string;
    checked_time?:string;
    approved?:boolean;
}