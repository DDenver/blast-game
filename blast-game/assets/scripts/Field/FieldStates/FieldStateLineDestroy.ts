import Tile from '../../Tile/Tile';
import { LineDestroy } from '../../Tile/TileConstants';
import FieldUtils from '../FieldUtils';
import FieldState from './FieldState';
import FieldStateFallTiles from './FieldStateFallTiles';

export default class FieldStateLineDestroy extends FieldState {
    tapToTile(tile: Tile): void { }

    async enterToState(): Promise<void> {
        let line;
        const posOnMap = FieldUtils.instance.getPositionOnMap(this.field.focusTile.getPosition());

        switch (this.field.focusTile.config.typeDestroy as LineDestroy) {
            case LineDestroy.Horizontal:
                line = this.field.fieldCreator.getRow(posOnMap.y);
                await this.removeLine(line, posOnMap.x);
                break;
            case LineDestroy.Vertical:
                line = this.field.fieldCreator.getCol(posOnMap.x);
                await this.removeLine(line, posOnMap.y);
                break;
        }

        this.field.focusTile = null;

        await this.field.waitTimer(0.25);// wait remove tiles
        this.field.setState(new FieldStateFallTiles(this.field));
    }

    private async removeLine(line: Tile[], pos: number): Promise<void> {
        let iteration = 0;
        let iterationTime = 0.01;
        iteration = Math.round(Math.max(pos, line.length - pos)) + 1;
        
        for (let i = 0; i < iteration; i++) {
            if (i === 0) {
                this.field.fieldCreator.removeTile(line[pos]);
            } else {
                const firstSide = line[pos + i];
                const secondSide = line[pos - i];

                if (firstSide) this.field.fieldCreator.removeTile(firstSide);
                if (secondSide) this.field.fieldCreator.removeTile(secondSide);
            }
            await this.field.waitTimer(iterationTime * i);// wait remove tiles
        }
    }
}