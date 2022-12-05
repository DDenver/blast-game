import Events from '../../Enums/Events';
import Tile from '../../Tile/Tile';
import FieldState from './FieldState';
import FiledStateWaiting from './FiledStateWaiting';

export default class FieldStateSwap extends FieldState {
    async tapToTile(tile: Tile): Promise<void> {
        await tile.focus();
        await this.field.fieldCreator.swapTiles(tile, this.field.focusTile);

        this.field.focusTile = null;

        this.field.boosterManager.useActiveBooster();
        cc.systemEvent.emit(Events.STEP_COMPLETED.toString());
        this.field.setState(new FiledStateWaiting(this.field));
    }

    async enterToState(): Promise<void> {
        await this.field.focusTile.focus();
    }
}
