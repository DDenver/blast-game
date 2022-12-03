import Tile from '../../Tile/Tile';
import { TileAbilityTypes } from '../../Tile/TileConstants';
import FieldState from './FieldState';
import FieldStateDestroyByColor from './FieldStateDestroyByColor';
import FieldStateLineDestroy from './FieldStateLineDestroy';

export default class FiledStateWaiting extends FieldState {
    tapToTile(tile: Tile): void {
        this.field.focusTile = tile;

        switch (tile.config.ability) {
            case TileAbilityTypes.AreaDestroy:
                
                break;
            case TileAbilityTypes.LineDestroy:
                this.field.setState(new FieldStateLineDestroy(this.field));
                break;
            case TileAbilityTypes.ColorDestroy:
            default:
                this.field.setState(new FieldStateDestroyByColor(this.field));
                break;
        }
    }
    
    enterToState(): void { }
}
