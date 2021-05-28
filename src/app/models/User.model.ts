import { Role } from "./Role.model";

/*
export interface User {
        id: number;
        login: string;
        password: string ;
        listeRole: string[];

}

        public listeRole: string,

*/
export class User {
        public nom : string;
        public prenom : string;
        public cp : string;
        public ville : string;
        public telephone : string;
        public email : string;
    constructor(
        public id: number,
        public login: string,
        public password: string,
        public listeRole: Role[],
        ) {  }
}
