import Tile from '../../Tile/Tile';
import FieldState from './FieldState';
import FiledStateWaiting from './FiledStateWaiting';

export default class FieldStateFallTiles extends FieldState {
    tapToTile(tile: Tile): void { }

    async enterToState(): Promise<void> {
        await this.field.updateMap();

        this.field.setState(new FiledStateWaiting(this.field));
    }
}
