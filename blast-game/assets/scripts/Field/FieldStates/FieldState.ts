import Tile from '../../Tile/Tile';
import Field from '../Field';
import IFieldState from './IFiledState';

export default abstract class FieldState implements IFieldState {
    protected field: Field;

    constructor(field: Field) {
        this.field = field;
    }

    abstract tapToTile(tile: Tile): void
    abstract enterToState(): void 
}
