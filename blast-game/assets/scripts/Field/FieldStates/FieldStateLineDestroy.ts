import { BoosterTypes } from '../../Booster/BoosterTypes';
import Events from '../../Enums/Events';
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


        switch (this.getDestroyType()) {
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

        if (this.field.boosterManager.activeBoosterPayload) this.field.boosterManager.useActiveBooster();

        await this.field.waitTimer(0.25);// wait remove tiles
        cc.systemEvent.emit(Events.STEP_COMPLETED.toString());
        this.field.setState(new FieldStateFallTiles(this.field));
    }

    private async removeLine(line: Tile[], pos: number): Promise<void> {
        let iteration = 0;
        let iterationTime = 0.025;
        iteration = Math.round(Math.max(pos, line.length - pos)) + 1;

        for (let i = 0; i < iteration; i++) {
            if (i === 0) {
                this.field.fieldCreator.removeTiles([line[pos]]);
            } else {
                const firstSide = line[pos + i];
                const secondSide = line[pos - i];

                if (firstSide) this.field.fieldCreator.removeTiles([firstSide]);
                if (secondSide) this.field.fieldCreator.removeTiles([secondSide]);
            }
            await this.field.waitTimer(iterationTime);// wait remove tiles
        }
    }

    private getDestroyType(): LineDestroy {
        if (
            (this.field.boosterManager.activeBoosterPayload
                && this.field.boosterManager.activeBoosterPayload.type === BoosterTypes.VerticalLineDestroy)
            || (this.field.focusTile.config.typeDestroy as LineDestroy) === LineDestroy.Vertical
        ) return LineDestroy.Vertical;

        if (
            (this.field.boosterManager.activeBoosterPayload
                && this.field.boosterManager.activeBoosterPayload.type === BoosterTypes.HorizontalLineDestroy)
            || (this.field.focusTile.config.typeDestroy as LineDestroy) === LineDestroy.Horizontal
        ) return LineDestroy.Horizontal;

        return LineDestroy.Horizontal;
    }
}
