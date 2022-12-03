import Tile from '../../Tile/Tile';
import TileColorDestroy from '../../Tile/TileColorDestroy';
import { AreaDestroy, TileAbilityTypes } from '../../Tile/TileConstants';
import FieldUtils from '../FieldUtils';
import FieldState from './FieldState';
import FieldStateFallTiles from './FieldStateFallTiles';
import FiledStateWaiting from './FiledStateWaiting';

export default class FieldStateDestroyByColor extends FieldState {
    tapToTile(tile: Tile): void { }

    async enterToState(): Promise<void> {
        const matchingCountForUpgrade = 4; // todo add to LevelConfig

        const siblings = this.field.getSiblingsByColor(this.field.focusTile as TileColorDestroy);

        if (siblings.length <= (this.field.focusTile as TileColorDestroy).config.matchCount - 1) {
            await this.field.focusTile.cantMatching();
            this.field.focusTile = null;
        } else if (siblings.length >= matchingCountForUpgrade) {
            await this.upgradeTile(siblings);
        } else {
            await this.removeTiles(siblings);
        }


        this.field.setState(new FieldStateFallTiles(this.field));
    }

    private async upgradeTile(siblings: Tile[]): Promise<void> {
        let tileAbility;
        let typeDestroy;
        const matchingCount = siblings.length;

        if (matchingCount === 4) {
            tileAbility = TileAbilityTypes.LineDestroy;
        } else if (matchingCount > 4 && matchingCount <= 6) {
            tileAbility = TileAbilityTypes.AreaDestroy;
            typeDestroy = AreaDestroy.Default;
        } else if (matchingCount > 6) {
            tileAbility = TileAbilityTypes.AreaDestroy;
            typeDestroy = AreaDestroy.All;
        }

        const posOnMap = FieldUtils.instance.getPositionOnMap(this.field.focusTile.getPosition());
        await this.removeTiles(siblings);

        this.field.addUpgradedTile(posOnMap, tileAbility, typeDestroy);
    }

    private async removeTiles(tiles: Tile[]): Promise<void> {
        this.field.removeTiles(tiles);
        this.field.focusTile = null;
        await this.field.waitTimer(0.25);// wait remove tiles
    }
}
