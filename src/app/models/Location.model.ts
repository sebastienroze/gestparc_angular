import { Cadre } from "./Cadre.model";
import { Materiel } from "./Materiel.model";
import { TypeMateriel } from "./TypeMateriel.model";
import { User } from "./User.model";

export class Location {
        constructor(
                public id: number,
                public etat: number,
                public cadre : Cadre,
                public date_debut: Date,
                public date_retour: Date,
                public typeMateriel: TypeMateriel,
                public materiel: Materiel,
                public utilisateur: User,
        ) { }
}
