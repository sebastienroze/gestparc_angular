import { Materiel } from "./Materiel.model";

export class Reparation {
        constructor(
                public id: number,
                public etat: number,
                public materiel: Materiel,
                public date_envoi:Date,
                public date_retour:Date,
                public etatEntrant: string,
                public etatCasse: string,
                public etatRepare: string,
                ) {  }        
}
