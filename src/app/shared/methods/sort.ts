import { KeyValue } from '@angular/common';
import { TableColumn } from '../interfaces/table-column';

export function sortByKey(
  a: KeyValue<any, any>,
  b: KeyValue<any, any>
): number {
  const a_val = a.key;
  const b_val = b.key;
  if (a_val < b_val) return -1;
  if (a_val > b_val) return 1;
  return 0;
}

export function sortByDate(a: any, b: any): number {
  const a_val = a.date;
  const b_val = b.date;
  if (a_val < b_val) return -1;
  if (a_val > b_val) return 1;
  return 0;
}

export function sortByTime(a: any, b: any): number {
  const a_val = a.time;
  const b_val = b.time;
  if (a_val < b_val) return -1;
  if (a_val > b_val) return 1;
  return 0;
}

export function sortByName(a: any, b: any): number {
  const a_val = a.name.toLocaleLowerCase();
  const b_val = b.name.toLocaleLowerCase();
  if (a_val < b_val) return -1;
  if (a_val > b_val) return 1;
  return 0;
}

export function sortByColumns(columns: TableColumn[]): Function {
  return function (a: any, b: any) {
    let a_val = '';
    let b_val = '';
    for (let i in columns) {
      a_val += a[columns[i].field];
      b_val += b[columns[i].field];
    }
    a_val = a_val.toLocaleLowerCase();
    b_val = b_val.toLocaleLowerCase();
    if (a_val < b_val) return -1;
    if (a_val > b_val) return 1;
    return 0;
  };
}
