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
        if (!coords) return null;

        return this.map[coords.x][coords.y];
    }
}
