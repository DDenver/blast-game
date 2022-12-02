import Tile from '../Tile/Tile';
import TilesCreator from '../Tile/TilesCreator';
import FieldCreator from './FieldCreator';
import FieldInput from './FieldInput';
import FieldState from './FieldStates/FieldState';
import FieldUtils from './FieldUtils';

const { ccclass, property } = cc._decorator;

@ccclass()
export default class Field extends cc.Component {
    @property(TilesCreator) tilesCreator: TilesCreator = null;

    public fieldInput: FieldInput;
    public fieldCreator: FieldCreator;

    private state: FieldState;

    onLoad() {
        this.init();
        console.log('Field');
    }

    start() {
    }

    public init(): void {
        new FieldUtils(this);
        this.fieldCreator = new FieldCreator(this);
        this.fieldInput = new FieldInput(this);

        this.fieldCreator.crateField();
        // this.fieldInput.enable();
    }

    public setState(state: FieldState): void {
        this.state = state;

        this.state.enterToState();
    }

    public tapToTile(tile: Tile): void {
        this.state.tapToTile(tile);
    }

    // update (dt) {}
}
