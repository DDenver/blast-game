import Tile from '../../Tile/Tile';

export default interface IFieldState {
    tapToTile(tile: Tile): void;
    enterToState(): void
}
