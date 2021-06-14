import { Pipe, PipeTransform } from '@angular/core';
@Pipe({
    name: 'filterMaterielList'
})

export class FilterMaterielListPipe implements PipeTransform {
    transform(items: any[], searchText: string): any[] {
        if (!items) return [];
        if (!searchText) return items;
        searchText = searchText.toLowerCase();
        return items.filter(it => {
           console.log(Object.values(it).toString().toLowerCase());
            if (it.typeMateriel != null) {
                if (it.typeMateriel.description.toLowerCase().includes(searchText)) {
                    return true;
                }
            }
            return Object.values(it).toString().toLowerCase().includes(searchText);
        });
    }
}