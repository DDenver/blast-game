export interface IScoreStorageData {
    steps: number,
    level: number,
    score: number,

}

export default class ScoreStorage {
    private static _instance: ScoreStorage = null;
    public static get instance(): ScoreStorage {
        return this._instance;
    }
    private readonly storageName: string = 'blastGame';

    constructor() {
        if (ScoreStorage.instance !== null) {
            return ScoreStorage.instance;
        }

        ScoreStorage._instance = this;
        
        if (!this.get()) this.save({ steps: 0, level: 0, score: 0 });
    }

    public save(data: IScoreStorageData): void {
        localStorage.setItem(this.storageName, JSON.stringify(data));
    }

    public get(): IScoreStorageData {
        const data = localStorage.getItem(this.storageName);

        return JSON.parse(data);
    }
}
