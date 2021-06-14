import { Pipe, PipeTransform } from '@angular/core';
@Pipe({
    name: 'filterRetourList'
})

export class FilterRetourListPipe implements PipeTransform {
    transform(items: any[], searchText: string): any[] {
        if (!items) return [];
        if (!searchText) return items;
        searchText = searchText.toLowerCase();
        return items.filter(it => {
            if (it.location != null) {
                if (it.location.typeMateriel != null) {
                    if (it.location.typeMateriel.description.toLowerCase().includes(searchText)) {
                        return true;
                    }
                }
                if (it.location.materiel != null) {
                    if (it.location.materiel.nom.toLowerCase().includes(searchText)) {
                        return true;
                    }
                    if (it.location.materiel.reference.toLowerCase().includes(searchText)) {
                        return true;
                    }
                }
                if (it.location.date_debut.toString().includes(searchText)) return true;
                if (it.location.date_retour.toString().includes(searchText)) return true;
                if (it.location.utilisateur.login.toString().includes(searchText)) return true;
            }
            return Object.values(it).toString().toLowerCase().includes(searchText);
        });
    }
}