import EasingType from '../Enums/EasingType';
import Tile from '../Tile/Tile';
import TileAreaDestroy from '../Tile/TileAreaDestroy';
import { AreaDestroy, LineDestroy, TileAbilityTypes } from '../Tile/TileConstants';
import TileLineDestroy from '../Tile/TileLineDestroy';
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
        const fallSpeed = 0.3; // todo add to fieldConfig
        const easing = EasingType.bounceOut; // todo add to fieldConfig
        const fallTimeLimit = 0.6; // todo add to fieldConfig

        let maxFallTime = 0;

        for (let x = 0; x < FieldUtils.instance.fieldSize.width; x++) {
            let counter = 0;

            for (let y = FieldUtils.instance.fieldSize.height - 1; y >= 0; y--) {
                const tile = this.map[y][x];

                if (!tile) {
                    counter++
                } else {
                    const newMapPos = y + counter;
                    this.map[y][x] = null;

                    const fallTime = Math.min(counter * fallSpeed, fallTimeLimit);
                    maxFallTime = Math.max(fallTime, maxFallTime);
                    this.fallTile(tile, new cc.Vec2(x, newMapPos), fallTime, easing);
                };
            }

            for (let i = 1; i <= counter; i++) {
                const newTile = this.field.tilesCreator.getTileColorDestroy(true);
                const tileWordPos = FieldUtils.instance.getMapToWorldPos(new cc.Vec2(x, -(i)));
                newTile.setPosition(tileWordPos);
                newTile.show(false);

                const fallTime = Math.min(counter * fallSpeed, fallTimeLimit);
                this.fallTile(newTile, new cc.Vec2(x, counter - (i)), fallTime, easing);
            }
        }

        await this.field.waitTimer(maxFallTime);
    }

    public addTileOnMap(
        posOnMap: cc.Vec2,
        ability: TileAbilityTypes,
        typeDestroy: LineDestroy | AreaDestroy
    ): void {
        let tile;
        const isRandom = typeDestroy === null;
        console.log(isRandom, typeDestroy);
        
        switch (ability) {
            case TileAbilityTypes.AreaDestroy:
                tile = this.field.tilesCreator.getTileAreaDestroy(isRandom, typeDestroy as AreaDestroy);

                break;
            case TileAbilityTypes.LineDestroy:
                tile = this.field.tilesCreator.getTileLineDestroy(isRandom, typeDestroy as LineDestroy);
                break;
        }

        tile.setPosition(FieldUtils.instance.getMapToWorldPos(posOnMap));
        tile.show();
        
        this.map[posOnMap.y][posOnMap.x] = tile;
    }

    private fallTile(tile: Tile, mapPos: cc.Vec2, time: number, easing: EasingType): void {
        const worldPos = FieldUtils.instance.getMapToWorldPos(mapPos);
        tile.fallDown(worldPos, time, easing);
        this.map[mapPos.y][mapPos.x] = tile;
    }
}
