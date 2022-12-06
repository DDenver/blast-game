import Events from '../Enums/Events';
import { LevelTileConfig } from '../Level/LevelTileConfig';
import Utilities from '../Plugins/Utilities';
import Tile from './Tile';
import TileAreaDestroy, { TileAreaConfig } from './TileAreaDestroy';
import TileColorDestroy, { TileColorConfig } from './TileColorDestroy';
import { AreaDestroy, ColorDestroy, LineDestroy, TileAbilityTypes } from './TileConstants';
import TileLineDestroy, { TileLineConfig } from './TileLineDestroy';
import TilesPool from './TilesPool';

const { ccclass, property } = cc._decorator;

@ccclass
export default class TilesCreator extends cc.Component {
    @property(cc.Prefab) tileColorPrefab: cc.Prefab = null;
    @property(cc.Prefab) tileLinePrefab: cc.Prefab = null;
    @property(cc.Prefab) tileAreaPrefab: cc.Prefab = null;

    @property(TileColorConfig) tileColorConig: TileColorConfig[] = [];
    @property(TileLineConfig) tileLineConig: TileLineConfig[] = [];
    @property(TileAreaConfig) tileAreaConig: TileAreaConfig[] = [];

    private tileColorPool: TilesPool<TileColorDestroy>;
    private tileLinePool: TilesPool<TileLineDestroy>;
    private tileAreaPool: TilesPool<TileAreaDestroy>;

    public init(parentNode: cc.Node, tilesConig: LevelTileConfig[], colorTilesCount: number): void {
        this.tileAreaConig.forEach(tac => {
            tac.radius = tilesConig.find(c => c.typeDestroy === tac.typeDestroy).radius
        });

        this.tileColorPool = new TilesPool(parentNode, this.tileColorPrefab, TileColorDestroy.name, colorTilesCount);
        this.tileLinePool = new TilesPool(parentNode, this.tileLinePrefab, TileLineDestroy.name);
        this.tileAreaPool = new TilesPool(parentNode, this.tileAreaPrefab, TileAreaDestroy.name);

        cc.systemEvent.on(Events.TILE_REMOVED.toString(), this.tileRemove, this);
    }

    public getTileColorDestroy(
        isRandom: boolean,
        type: ColorDestroy = ColorDestroy.Blue
    ): TileColorDestroy {
        const tile = this.tileColorPool.getTile();
        type = isRandom ? ColorDestroy[Utilities.getRandomEnumKey(ColorDestroy)] : type;
        const config = this.tileColorConig.find(t => t.typeDestroy === type);

        tile.init(config);

        return tile;
    }

    public getTileLineDestroy(
        isRandom: boolean,
        type: LineDestroy = LineDestroy.Horizontal
    ): TileLineDestroy {
        const tile = this.tileLinePool.getTile();
        type = isRandom ? LineDestroy[Utilities.getRandomEnumKey(LineDestroy)] : type;
        const config = this.tileLineConig.find(t => t.typeDestroy === type);

        tile.init(config);

        return tile;
    }

    public getTileAreaDestroy(
        isRandom: boolean,
        type: AreaDestroy = AreaDestroy.Default
    ): TileAreaDestroy {

        const tile = this.tileAreaPool.getTile();
        type = isRandom ? AreaDestroy[Utilities.getRandomEnumKey(AreaDestroy)] : type;
        const config = this.tileAreaConig.find(t => t.typeDestroy === type);

        tile.init(config);

        return tile;
    }

    private tileRemove<T extends Tile>(tile: T): void {
        if (tile instanceof TileColorDestroy) {
            this.tileColorPool.addTile(tile);
        } else if (tile instanceof TileLineDestroy) {
            this.tileLinePool.addTile(tile);
        } else if (tile instanceof TileAreaDestroy) {
            this.tileAreaPool.addTile(tile);
        }
    }
}
