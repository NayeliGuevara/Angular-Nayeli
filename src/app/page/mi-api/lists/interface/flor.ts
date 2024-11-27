export interface FloresAll {
    flores: Flore[];
}

export interface Flore {
    _id?: string;
    nombre:string;
    color:string;
    caracteristica: string;
    temporada:string;
    __v?: number;
}