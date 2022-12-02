import Tile from './Tile';

export default class TilesPool<T extends Tile> {
    public defaulSize: number;

    private pool: T[] = [];

    private defaultPos: cc.Vec2;
    private component: string;
    private parentNode: cc.Node;
    private prefab: cc.Prefab;

    constructor(
        parentNode: cc.Node,
        prefab: cc.Prefab,
        component: string,
        defaulSize: number = 10,
        defaultPos: cc.Vec2 = new cc.Vec2(-5555, -5555),
    ) {
        this.parentNode = parentNode;
        this.prefab = prefab;
        this.component = component;
        this.defaulSize = defaulSize;
        this.defaultPos = defaultPos;
    }

    public getTile(): T {
        if (this.pool.length > 0) {
            const tile = this.pool.pop();
            tile.reset();

            return tile;
        } else {
            const tileNode = cc.instantiate(this.prefab);
            tileNode.setParent(this.parentNode);

            const tile = tileNode.getComponent(this.component);

            return tile;
        }
    }

    public addTile(tile: T): void {
        tile.setPosition(this.defaultPos);

        this.pool.push(tile);
    }

}
