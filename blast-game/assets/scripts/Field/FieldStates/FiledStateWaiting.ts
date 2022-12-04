import { BoosterTypes } from '../../Booster/BoosterTypes';
import Tile from '../../Tile/Tile';
import { TileAbilityTypes } from '../../Tile/TileConstants';
import FieldState from './FieldState';
import FieldStateAreaDestroy from './FieldStateAreaDestroy';
import FieldStateDestroyByColor from './FieldStateDestroyByColor';
import FieldStateLineDestroy from './FieldStateLineDestroy';
import FieldStateSwap from './FieldStateSwap';

export default class FiledStateWaiting extends FieldState {
    tapToTile(tile: Tile): void {
        this.field.focusTile = tile;

        if (
            !this.field.boosterManager.activeBoosterPayload
            || this.field.boosterManager.activeBoosterPayload.type === BoosterTypes.None
        ) {
            switch (tile.config.ability) {
                case TileAbilityTypes.AreaDestroy:
                    this.field.setState(new FieldStateAreaDestroy(this.field));
                    break;
                case TileAbilityTypes.LineDestroy:
                    this.field.setState(new FieldStateLineDestroy(this.field));
                    break;
                case TileAbilityTypes.ColorDestroy:
                default:
                    this.field.setState(new FieldStateDestroyByColor(this.field));
                    break;
            }
        } else {
            switch (this.field.boosterManager.activeBoosterPayload.type) {
                case BoosterTypes.VerticalLineDestroy:
                case BoosterTypes.HorizontalLineDestroy:
                    this.field.setState(new FieldStateLineDestroy(this.field));
                    break;
                case BoosterTypes.Boomb:
                case BoosterTypes.MegaBoomb:
                    this.field.setState(new FieldStateAreaDestroy(this.field));
                    break;
                case BoosterTypes.Swap:
                    this.field.setState(new FieldStateSwap(this.field));
                    break;
            }
        }
    }

    enterToState(): void { }
}
