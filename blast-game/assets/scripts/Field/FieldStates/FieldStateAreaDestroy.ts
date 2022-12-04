import { BoosterTypes } from '../../Booster/BoosterTypes';
import Tile from '../../Tile/Tile';
import TileAreaDestroy from '../../Tile/TileAreaDestroy';
import { AreaDestroy } from '../../Tile/TileConstants';
import FieldState from './FieldState';
import FieldStateFallTiles from './FieldStateFallTiles';

export default class FieldStateAreaDestroy extends FieldState {
    tapToTile(tile: Tile): void { }

    async enterToState(): Promise<void> {
        switch (this.getDestroyType()) {
            case AreaDestroy.Default:
                await this.removeArea(this.getRadius());
                break;
            case AreaDestroy.All:
                this.field.fieldCreator.removeTiles(this.field.fieldCreator.getAllTiles());
                break;
        }

        this.field.focusTile = null;

        if (this.field.boosterManager.activeBoosterPayload) this.field.boosterManager.useActiveBooster();

        await this.field.waitTimer(0.25);// wait remove tiles
        this.field.setState(new FieldStateFallTiles(this.field));
    }

    private async removeArea(radius: number): Promise<void> {
        const neighbors = [];

        for (let i = 0; i < radius; i++) {
            const waveTiles = [];

            if (i === 0) {
                waveTiles.push(...this.getNeighbors(this.field.focusTile));
            } else {
                for (let j = 0; j < neighbors[i - 1].length; j++) {
                    waveTiles.push(...this.getNeighbors(neighbors[i - 1][j]));
                }
            }

            neighbors.push(waveTiles);
        }

        for (let i = 0; i < neighbors.length; i++) {
            await this.field.waitTimer(0.005 * i);// wait remove tiles
            this.field.fieldCreator.removeTiles(neighbors[i]);
        }
    }

    private getNeighbors(tile: Tile): Tile[] {
        const neighbors = this.field.fieldCreator.getNeighbors(tile);
        neighbors.forEach(n => n.needMatch = true);

        return neighbors;
    }

    private getDestroyType(): AreaDestroy {
        if (
            (this.field.boosterManager.activeBoosterPayload
                && this.field.boosterManager.activeBoosterPayload.type === BoosterTypes.Boomb)
            || (this.field.focusTile.config.typeDestroy as AreaDestroy) === AreaDestroy.Default
        ) return AreaDestroy.Default;

        if (
            (this.field.boosterManager.activeBoosterPayload
                && this.field.boosterManager.activeBoosterPayload.type === BoosterTypes.MegaBoomb)
            || (this.field.focusTile.config.typeDestroy as AreaDestroy) === AreaDestroy.All
        ) return AreaDestroy.All;

        return AreaDestroy.Default;
    }

    private getRadius(): number {
        return this.field.boosterManager.activeBoosterPayload ?
            this.field.boosterManager.activeBoosterPayload.radius
            : (this.field.focusTile as TileAreaDestroy).config.radius;
    }
}
