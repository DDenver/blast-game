import Tile from '../../Tile/Tile';
import TileColorDestroy from '../../Tile/TileColorDestroy';
import FieldState from './FieldState';
import FieldStateFallTiles from './FieldStateFallTiles';
import FiledStateWaiting from './FiledStateWaiting';

export default class FieldStateDestroyByColor extends FieldState {
    tapToTile(tile: Tile): void { }

    enterToState(): void {
        const siblings = this.field.getSiblingsByColor(this.field.focusTile as TileColorDestroy);
        console.log(siblings, 'siblings');

        this.field.removeTiles([...siblings, this.field.focusTile]);
        this.field.focusTile = null;

        this.field.setState(new FieldStateFallTiles(this.field));
    }
}
