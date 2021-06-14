import { Materiel } from "./Materiel.model";
import { Reparation } from "./Reparation.model";

export class MaterielDetail {
        constructor(
                public materiel: Materiel,
                public location: Location,
                public reparation: Reparation,
        ) { }
}
