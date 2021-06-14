import { Location } from "./Location.model";
import { Reparation } from "./Reparation.model";

export class Alerte {
        constructor(
                public texte: string,
                public location: Location,
                public reparation : Reparation,
                ) {  }        
}
