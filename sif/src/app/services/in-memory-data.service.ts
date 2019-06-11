import { Injectable } from '@angular/core';
import { InMemoryDbService } from 'angular-in-memory-web-api';
import { User } from '../model/user';
import { Product } from '../model/product';

@Injectable({
  providedIn: 'root'
})
export class InMemoryDataService implements InMemoryDbService {

  constructor() { }

  createDb(){
    const products = [
      {
          id:1,
          code:5939,
          description:"ABAXON COM L.P. X0,5mg X30",
          quantity: 18,
          checked:  false, 
          quantity_on_system: 18,
          slot_count: 1,
          added_amount:18,
          lastOfFirstOfNuLote:27,
          is_die_cut:	true,
          last_counting_date:	"3/16/2019 10:00",
          price:43000,
          avg_price:43000,
          utility:1306.388264,
          unity_cost:	32.89,
          barcode:	"7730698004198",
          category_code:	"214",
          category:	"PSICOTROPICOS",
          tag_print:	false,
          quantity_difference: 0,
          phase: 1
      },
      {
          id:2,
          code:7090,
          description:"KETAZOL CREM X30 GR",
          quantity: 15,
          checked:  false, 
          quantity_on_system: 15,
          slot_count: 1,
          added_amount:15,
          lastOfFirstOfNuLote:151,
          is_die_cut:	false,
          last_counting_date:	"3/16/2019 10:00",
          price:27689.47,
          avg_price:27689.47,
          utility:2191.357086,
          unity_cost:	12.63,
          barcode:	"7592349429602",
          category_code:	"2",
          category:	"MEDICINAS",
          tag_print:	false,
          quantity_difference: 0,
          phase: 1
      },
      {
          id:3,
          code:8153,
          description:"PANTOPRAZOL TAB 40mg X7 CALOX",
          quantity: 146,
          checked:  false, 
          quantity_on_system: 146,
          slot_count: 1,
          added_amount:146,
          lastOfFirstOfNuLote:102,
          is_die_cut:	false,
          last_counting_date:	"3/16/2019 10:00",
          price:20933.56,
          avg_price:20933.56,
          utility:7958.528517,
          unity_cost:	2.63,
          barcode:	"7591519005783",
          category_code:	"2",
          category:	"MEDICINAS",
          tag_print:	false,
          quantity_difference: 0,
          phase: 1
      },
      {
          id:4,
          code:92187,
          description:"TERAGRIP 24 HORAS TAB 650MG FRACCION",
          quantity: 86,
          checked:  false, 
          quantity_on_system: 86,
          slot_count: 1,
          added_amount:86,
          lastOfFirstOfNuLote:154,
          is_die_cut:	true,
          last_counting_date:	"3/16/2019 10:00",
          price:26291.95,
          avg_price:26291.95,
          utility:13.91039681,
          unity_cost:	1763.33,
          barcode:	"7591821802414",
          category_code:	"212600",
          category:	"O.T.C.",
          tag_print:	false,
          quantity_difference: 0,
          phase: 1
      }
  ];

  const users = [
    {id:1, nickname:'admin', password:'admin', full_name: 'Admin Admin', level:2 },
    {id:2, nickname:'contribuitor', password:'contribuitor', full_name: 'Contribuitor Contribuitor', level:0 },
    {id:3, nickname:'supervisor', password:'supervisor', full_name: 'Supervisor Supervisor', level:1 },
    {id:4, nickname:'dezmacht', password:'secretpass', full_name: 'Carlos Herrera', level: 2}
];
    return { products, users }
  }

  genId<T extends User | Product>(myTable: T[]): number {
    return myTable.length > 0 ? Math.max(...myTable.map(t => t.id)) + 1 : 11;
  }

}
