import Utilities from '../Plugins/Utilities';
import Field from './Field';

export default class FieldUtils {
    public static instance: FieldUtils = null;

    private _fieldSize: cc.Size = new cc.Size(3, 3);
    public get fieldSize(): cc.Size {
        return this._fieldSize;
    }

    private _tileScale: number = 1;
    public get tileScale(): number {
        return this._tileScale;
    }

    private field: Field;

    private tileSize: cc.Size = new cc.Size(171, 192);
    private tileScaledSize: cc.Size = new cc.Size(171, 192);
    private offset: cc.Vec2 = cc.Vec2.ZERO;
    private fieldWorldSize: cc.Size = cc.Size.ZERO;
    private startPoint: cc.Vec2 = cc.Vec2.ONE;

    constructor(field: Field) {
        if (FieldUtils.instance !== null) {
            return FieldUtils.instance;
        }

        FieldUtils.instance = this;

        this.field = field;

        this.conputeFieldParams();
    }

    public getTouchOnMap(touchPos: cc.Vec2): cc.Vec2 {
        const localNodePos = this.field.node.convertToNodeSpaceAR(touchPos);

        return this.getPositionOnMap(localNodePos);
    }

    public getPositionOnMap(localNodePos: cc.Vec2): cc.Vec2 {
        const deltaX = localNodePos.x - this.startPoint.x;
        const deltaY = localNodePos.y - this.startPoint.y;

        const posOnMap = new cc.Vec2(
            Math.round(deltaX / (this.tileScaledSize.width + this.offset.x)),
            -Math.round(deltaY / (this.tileScaledSize.height + this.offset.y))
        )

        const nearPoin = this.getMapToWorldPos(posOnMap);
        const distanceX = localNodePos.x - nearPoin.x;
        const distanceY = localNodePos.y - nearPoin.y;

        if (
            (distanceX <= this.tileScaledSize.width / 2)
            && (distanceY <= this.tileScaledSize.height / 2)
        ) {
            return posOnMap
        } else return null;
    }

    public getMapToWorldPos(mapPos: cc.Vec2): cc.Vec2 {
        const posX = mapPos.x * (this.tileScaledSize.width + this.offset.x);
        const posY = mapPos.y * (this.tileScaledSize.height + this.offset.y);

        return new cc.Vec2(this.startPoint.x + posX, this.startPoint.y - posY);
    }

    private conputeFieldParams(): void {
        this.fieldWorldSize = this.field.node.getContentSize();

        const scaleX = (this.fieldWorldSize.width / (this.fieldSize.width * this.tileSize.width));
        const scaleY = (this.fieldWorldSize.height / (this.fieldSize.height * this.tileSize.height));
        const minScale = Math.min(scaleX, scaleY);
        this._tileScale = minScale;

        this.tileScaledSize = Utilities.multiplySizeByScalar(this.tileSize, minScale);

        const offsetX = (this.fieldWorldSize.width - (this.tileScaledSize.width * this.fieldSize.width)) / (this.fieldSize.width + 1);
        const offsetY = (this.fieldWorldSize.height - (this.tileScaledSize.height * this.fieldSize.height)) / (this.fieldSize.height + 1);
        this.offset = new cc.Vec2(offsetX, offsetY);

        const startPointX = -this.fieldWorldSize.width / 2 + offsetX + this.tileScaledSize.width / 2;
        const startPointY = this.fieldWorldSize.height / 2 - offsetY - this.tileScaledSize.height / 2;
        this.startPoint = new cc.Vec2(startPointX, startPointY);
    }
}
