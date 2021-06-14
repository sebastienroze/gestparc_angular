import { Pipe, PipeTransform } from '@angular/core';
@Pipe({
    name: 'filterReparationList'
})

export class FilterReparationListPipe implements PipeTransform {
    transform(items: any[], searchText: string): any[] {
        if (!items) return [];
        if (!searchText) return items;
        searchText = searchText.toLowerCase();
        return items.filter(it => {
            if (it.etat != null) {
                if (this.getEtatReparation(it.etat).toLowerCase().includes(searchText)) {
                    return true;
                }
            }
            if (it.materiel != null) {
                if (it.materiel.reference.toLowerCase().includes(searchText)) {
                    return true;
                }
            }  
            console.log(it)          
            if ((it.date_envoi != null) && it.date_envoi.toString().includes(searchText)) return true;
            if ((it.date_retour != null) && it.date_retour.toString().includes(searchText)) return true;

            return Object.values(it).toString().toLowerCase().includes(searchText);
        });
    }
  

    public getEtatReparation(etat): string {
        return ["En attente", "Réparée"][etat];
    }      


}