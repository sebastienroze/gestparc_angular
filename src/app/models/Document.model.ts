import { Materiel } from "./Materiel.model";
import { Reparation } from "./Reparation.model";
import { Retour } from "./Retour.model";

export class Document {
        constructor(
                public id: number,
                public nom: string,
                public extension: string,
                public materiel : Materiel,
                public reparation : Reparation,
                public retour : Retour,
                public originalFilename :String,
                ) {  }        
}
