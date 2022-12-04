import BoosterManager from '../Booster/BoosterManager';
import IBoosterManager from '../Booster/Interface/IBoosterManager';
import Tile from '../Tile/Tile';
import TileColorDestroy from '../Tile/TileColorDestroy';
import { AreaDestroy, LineDestroy, TileAbilityTypes } from '../Tile/TileConstants';
import TilesCreator from '../Tile/TilesCreator';
import FieldCreator from './FieldCreator';
import FieldInput from './FieldInput';
import FieldState from './FieldStates/FieldState';
import FieldStateCreation from './FieldStates/FieldStateCreation';
import FieldUtils from './FieldUtils';

const { ccclass, property } = cc._decorator;

@ccclass()
export default class Field extends cc.Component {
    @property(TilesCreator) tilesCreator: TilesCreator = null;
    @property(BoosterManager) boosterManager: IBoosterManager = null;
    @property(cc.Node) renderer: cc.Node = null;

    public fieldInput: FieldInput;
    public fieldCreator: FieldCreator;

    public focusTile: Tile = null;

    private state: FieldState;

    onLoad() {
        this.init();
    }

    start() {
    }

    public init(): void {
        new FieldUtils(this);
        this.fieldCreator = new FieldCreator(this);
        this.fieldInput = new FieldInput(this);

        this.setState(new FieldStateCreation(this));
    }

    public setState(state: FieldState): void {
        if (state === this.state) return;

        this.state = state;

        this.state.enterToState();
    }

    public tapToTile(tile: Tile): void {
        this.state.tapToTile(tile);
    }

    public async waitTimer(time: number): Promise<void> {
        return new Promise((res) => this.scheduleOnce(() => res(), time));
    }

    public getSiblingsByColor(tile: TileColorDestroy): TileColorDestroy[] {
        const siblings = [];
        const needCheck = [tile];

        while (needCheck.length > 0) {
            const currentTile = needCheck.pop();
            const neighbors = this.fieldCreator.getNeighbors(currentTile);

            neighbors.forEach((neighbor) => {
                if (
                    neighbor instanceof TileColorDestroy
                    && neighbor.config.typeDestroy === tile.config.typeDestroy
                ) {
                    needCheck.push(neighbor);
                    siblings.push(neighbor);
                    neighbor.needMatch = true;
                }
            })
        }


        return siblings;
    }

    public removeTiles(tiles: Tile[]): void {
        this.fieldCreator.removeTiles(tiles);
    }

    public async updateMap(): Promise<void> {
        await this.fieldCreator.updateMap();
    }

    public addUpgradedTile(
        posOnMap: cc.Vec2,
        ability: TileAbilityTypes,
        typeDestroy: LineDestroy | AreaDestroy
    ): void {
        this.fieldCreator.addTileOnMap(posOnMap, ability, typeDestroy);
    }

    public checkToMix(): boolean {
        const allTiles = this.fieldCreator.getAllTiles();

            for (let i = 0; i < allTiles.length; i++) {
            const tile = allTiles[i];
            const neighbors = this.fieldCreator.getNeighbors(tile);
                const hasSameColor = neighbors.some(n => this.checkSameColor(tile, n) || !(n instanceof TileColorDestroy));

            if (hasSameColor) return false;
        }

        return true;
    };

    private checkSameColor(firstTile: Tile, secondTile: Tile): boolean {
        return (
            firstTile instanceof TileColorDestroy
            && secondTile instanceof TileColorDestroy
            && firstTile.config.typeDestroy === secondTile.config.typeDestroy
        );
    }

    // update (dt) {}
}
