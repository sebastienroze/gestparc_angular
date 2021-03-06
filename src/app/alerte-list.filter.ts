import { Pipe, PipeTransform } from '@angular/core';
@Pipe({
    name: 'filterAlerteList'
})

export class FilterAlerteListPipe implements PipeTransform {
    transform(items: any[], searchText: string): any[] {
        if (!items) return [];
        if (!searchText) return items;
        searchText = searchText.toLowerCase();
        return items.filter(it => {
            return Object.values(it).toString().toLowerCase().includes(searchText);
        });
    }
}