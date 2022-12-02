import Tile from '../../Tile/Tile';
import FieldState from './FieldState';

export default class FiledStateWaiting extends FieldState {
    tapToTile(tile: Tile): void {
        console.log(tile);
        
    }
    enterToState(): void { }
}
