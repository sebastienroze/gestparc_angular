import { Materiel } from "./Materiel.model";
import { Retour } from "./Retour.model";

export class Historique {
        constructor(
                public id: number,
                public date: Date,
                public etat: string,
                public materiel: Materiel,
                public location: Location,
                public retour: Retour,
        ) { }
}
