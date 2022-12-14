import FieldUtils from '../Field/FieldUtils';
import Tile from './Tile';

export default class TilesPool<T extends Tile> {
    public defaulSize: number;

    private pool: T[] = [];

    private defaultPos: cc.Vec2;
    private componentName: string;
    private parentNode: cc.Node;
    private prefab: cc.Prefab;

    constructor(
        parentNode: cc.Node,
        prefab: cc.Prefab,
        componentName: string,
        defaulSize: number = 10,
        defaultPos: cc.Vec2 = new cc.Vec2(-5555, -5555),
    ) {
        this.parentNode = parentNode;
        this.prefab = prefab;
        this.componentName = componentName;
        this.defaulSize = defaulSize;
        this.defaultPos = defaultPos;

        const initElemnts = [];

        for (let i = 0; i < this.defaulSize; i++) {
            initElemnts.push(this.getTile());
        }
        
        initElemnts.forEach(el => this.addTile(el))
    }

    public getTile(): T {
        let tile: T;

        if (this.pool.length > 0) {
            tile = this.pool.pop();
            tile.reset();
        } else {
            const tileNode = cc.instantiate(this.prefab);
            tileNode.setParent(this.parentNode);

            tile = tileNode.getComponent(this.componentName);
            tile.setPosition(this.defaultPos);
        }

        if (FieldUtils.instance) tile.setScale(FieldUtils.instance.tileScale);

        return tile;
    }

    public addTile(tile: T): void {
        tile.setPosition(this.defaultPos);

        this.pool.push(tile);
    }

}
