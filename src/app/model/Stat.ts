export class Stat {
    id: number;
    completedTotal: number;
    uncompletedTotal: number;


    constructor(id: number, completedTotal?: number, uncompletedTotal?: number) {
        this.id = id;
        this.completedTotal = completedTotal;
        this.uncompletedTotal = uncompletedTotal;
    }
}
