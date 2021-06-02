import { TypeMateriel } from "./TypeMateriel.model";

export class Materiel {
        constructor(
                public id: number,
                public nom: string,
                public reference: string,
                public etat: number,
                public typeMateriel: TypeMateriel,
        ) { }
}
