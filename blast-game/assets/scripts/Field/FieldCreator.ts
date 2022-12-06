import EasingType from '../Enums/EasingType';
import Events from '../Enums/Events';
import Tile from '../Tile/Tile';
import { AreaDestroy, LineDestroy, TileAbilityTypes } from '../Tile/TileConstants';
import Field from './Field';
import FieldUtils from './FieldUtils';

export default class FieldCreator {
    public field: Field;

    private map: Tile[][] = [];

    constructor(field) {
        this.field = field;
    }

    public crateField(): void {
        this.map = [];

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

    public getAllTiles(): Tile[] {
        const tiles = [];

        for (let i = 0; i < this.map.length; i++) {
            tiles.push(...this.map[i]);
        }

        return tiles;
    }

    public getRow(rowIndex: number): Tile[] {
        return [...this.map[rowIndex]];
    }

    public getCol(colIndex: number): Tile[] {
        const col = [];

        for (let i = 0; i < FieldUtils.instance.fieldSize.height; i++) {
            col.push(this.map[i][colIndex]);
        }

        return col;
    }

    public removeTiles(tiles: Tile[]): void {
        cc.systemEvent.emit(Events.UPDATE_SCORE.toString(), tiles.length);
        
        tiles.forEach(tile => {
            this.removeTile(tile);
        });
    }

    public async updateMap(): Promise<void> {
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

                    const fallTime = Math.min(counter * this.field.fallSpeed, this.field.fallTimeLimit);
                    maxFallTime = Math.max(fallTime, maxFallTime);
                    this.fallTile(tile, new cc.Vec2(x, newMapPos), fallTime, this.field.easingFall);
                };
            }

            for (let i = 1; i <= counter; i++) {
                const newTile = this.field.tilesCreator.getTileColorDestroy(true);
                const tileWordPos = FieldUtils.instance.getMapToWorldPos(new cc.Vec2(x, -(i)));
                newTile.setPosition(tileWordPos);
                newTile.show(false);

                const fallTime = Math.min(counter * this.field.fallSpeed, this.field.fallTimeLimit);
                maxFallTime = Math.max(fallTime, maxFallTime);
                this.fallTile(newTile, new cc.Vec2(x, counter - (i)), fallTime, this.field.easingFall);
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

    public async swapTiles(tileFirst: Tile, tileSecond: Tile): Promise<void> {
        const tileFirstPos = tileFirst.getPosition();
        const tileSecondPos = tileSecond.getPosition();

        const tileFirstOnMap = FieldUtils.instance.getPositionOnMap(tileFirstPos);
        const tileSecondOnMap = FieldUtils.instance.getPositionOnMap(tileSecondPos);

        this.map[tileFirstOnMap.y][tileFirstOnMap.x] = tileSecond;
        this.map[tileSecondOnMap.y][tileSecondOnMap.x] = tileFirst;

        tileFirst.swap(tileSecondPos);
        await tileSecond.swap(tileFirstPos);
    }

    private fallTile(tile: Tile, mapPos: cc.Vec2, time: number, easing: EasingType): void {
        const worldPos = FieldUtils.instance.getMapToWorldPos(mapPos);
        tile.fallDown(worldPos, time, easing);
        this.map[mapPos.y][mapPos.x] = tile;
    }

    private removeTile(tile: Tile): void {
        if (!tile) return;
        
        const pos = FieldUtils.instance.getPositionOnMap(tile.getPosition());
        this.map[pos.y][pos.x] = null;
        tile.remove();
    }
}
