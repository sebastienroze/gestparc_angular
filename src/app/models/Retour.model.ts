import { Location } from "./Location.model";

export class Retour {
        constructor(
                public id: number,
                public audit: string,
                public etatEntrant: string,
                public etatSortant: string,
                public location : Location,
                ) {  }        
}
