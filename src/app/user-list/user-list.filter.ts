import { Pipe, PipeTransform } from '@angular/core';
@Pipe({
    name: 'filterUserList'
})
export class FilterUserListPipe implements PipeTransform {
    transform(items: any[], searchText: string): any[] {
        if (!items) return [];
        if (!searchText) return items;
        searchText = searchText.toLowerCase();
        return items.filter(it => {
            it.password = '';
            return Object.values(it).toString().toLowerCase().includes(searchText);
        });
    }
}