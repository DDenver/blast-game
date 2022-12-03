import Tile from '../../Tile/Tile';
import FieldState from './FieldState';
import FiledStateWaiting from './FiledStateWaiting';

export default class FieldStateMixTiles extends FieldState {
    tapToTile(tile: Tile): void { }

    async enterToState(): Promise<void> {
        this.field.fieldCreator.removeTiles(this.field.fieldCreator.getAllTiles());

        await this.field.waitTimer(0.3);// wait remove tiles

        this.field.fieldCreator.crateField();

        await this.field.waitTimer(0.3);// wait remove tiles

        this.field.setState(new FiledStateWaiting(this.field));
    }
}
