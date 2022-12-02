import Tile from '../Tile/Tile';
import Field from './Field';
import FieldUtils from './FieldUtils';

export default class FieldCreator {
    public field: Field;

    private map: Tile[][] = [];

    constructor(field) {
        this.field = field;
    }

    public crateField(): void {
        for (let y = 0; y < FieldUtils.instance.fieldSize.height; y++) {
            this.map.push([]);
            for (let x = 0; x < FieldUtils.instance.fieldSize.width; x++) {
                const tile = this.field.tilesCreator.getTileColorDestroy(true);
                const tileWordPos = FieldUtils.instance.getMapToWorldPos(new cc.Vec2(x, y));
                tile.setPosition(tileWordPos);
                tile.show();

                this.map[y].push(tile);
            }
        }
    }

    public getTileByCoords(coords: cc.Vec2): Tile {
        if (!coords
            || coords.x < 0
            || coords.y < 0
            || coords.x >= FieldUtils.instance.fieldSize.width
            || coords.y >= FieldUtils.instance.fieldSize.height
        ) return null;

        return this.map[coords.y][coords.x];
    }

    public getNeighbors(tile: Tile): Tile[] {
        const ownPos = FieldUtils.instance.getPositionOnMap(tile.getPosition());
        const checkPos = [new cc.Vec2(0, 1), new cc.Vec2(1, 0), new cc.Vec2(0, -1), new cc.Vec2(-1, 0)];
        const neighbors = [];

        checkPos.forEach(pos => {
            const neighbor = this.getTileByCoords(ownPos.clone().add(pos));

            if (neighbor && !neighbor.needMatch) neighbors.push(neighbor);
        })

        return neighbors;
    }

    public removeTiles(tiles: Tile[]): void {
        tiles.forEach(tile => {
            const pos = FieldUtils.instance.getPositionOnMap(tile.getPosition());
            this.map[pos.y][pos.x] = null;
            tile.remove();
        });
    }

    public async updateMap(): Promise<void> {

    }
}
