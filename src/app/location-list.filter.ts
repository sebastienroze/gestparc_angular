import { Pipe, PipeTransform } from '@angular/core';
@Pipe({
    name: 'filterLocationList'
})

export class FilterLocationListPipe implements PipeTransform {
    transform(items: any[], searchText: string): any[] {
        if (!items) return [];
        if (!searchText) return items;
        searchText = searchText.toLowerCase();
        return items.filter(it => {
            if (it.typeMateriel != null) {
                if (it.typeMateriel.description.toLowerCase().includes(searchText)) {
                    return true;
                }
            }
            if (it.etat != null) {
                if (this.getEtatLocation(it.etat).toLowerCase().includes(searchText)) {
                    return true;
                }
            }
            return Object.values(it).toString().toLowerCase().includes(searchText);
        });
    }

    public getEtatLocation(etat): string {
        return ["Demande", "Validé", "En pret", "Finalisée"][etat];
    }      
}