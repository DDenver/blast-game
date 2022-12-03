import Tile from '../../Tile/Tile';
import TileColorDestroy from '../../Tile/TileColorDestroy';
import FieldState from './FieldState';
import FieldStateFallTiles from './FieldStateFallTiles';
import FiledStateWaiting from './FiledStateWaiting';

export default class FieldStateDestroyByColor extends FieldState {
    tapToTile(tile: Tile): void { }

    async enterToState(): Promise<void> {
        const siblings = this.field.getSiblingsByColor(this.field.focusTile as TileColorDestroy);

        // if (siblings.length === 0) 

        this.field.removeTiles(siblings);
        this.field.focusTile = null;
        await this.field.waitTimer(0.25);// wait remove tiles

        this.field.setState(new FieldStateFallTiles(this.field));
    }
}
