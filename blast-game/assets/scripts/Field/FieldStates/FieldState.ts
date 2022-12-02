import Field from '../Field';
import IFieldState from './IFiledState';

export default abstract class FieldState implements IFieldState {
    private field: Field;

    constructor(field: Field) {
        this.field = field;
    }

    abstract tapToTile(tile: any): void
    abstract enterToState(): void 
}
