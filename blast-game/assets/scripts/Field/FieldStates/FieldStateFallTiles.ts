import Tile from '../../Tile/Tile';
import FieldState from './FieldState';
import FieldStateMixTiles from './FieldStateMixTiles';
import FiledStateWaiting from './FiledStateWaiting';

export default class FieldStateFallTiles extends FieldState {
    tapToTile(tile: Tile): void { }

    async enterToState(): Promise<void> {
        await this.field.fieldCreator.updateMap();

        if (this.field.checkToMix()) {
            this.field.setState(new FieldStateMixTiles(this.field));
        } else {
            this.field.setState(new FiledStateWaiting(this.field));
        }
    }
}
