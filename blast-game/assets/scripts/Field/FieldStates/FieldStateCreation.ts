import Tile from '../../Tile/Tile';
import FieldState from './FieldState';
import FiledStateWaiting from './FiledStateWaiting';

export default class FieldStateCreation extends FieldState {
    tapToTile(tile: Tile): void { }

    async enterToState(): Promise<void> {
        this.field.fieldCreator.crateField();
        await this.field.waitTimer(0.5);
        this.field.fieldInput.enable();
        
        this.field.setState(new FiledStateWaiting(this.field));
    }
}

