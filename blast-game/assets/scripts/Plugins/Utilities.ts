
export default class Utilities {

    static randomItem<T>(items: T[]): T {
        return items[Math.floor(Math.random() * items.length)];
    }

    static getRandomInt(min: number, max: number): number {
        min = Math.ceil(min);
        max = Math.floor(max);

        return Math.floor(Math.random() * (max - min + 1)) + min;
    }

    static getRandomFloat(min: number, max: number): number {
        return Math.random() * (max - min + 1) + min;
    }

    static clamp(value: number, min: number, max: number): number {
        return Math.min(Math.max(value, min), max);
    }

    static getRandomElementFromArray<T>(array: T[]): T {
        const index: number = this.getRandomInt(0, array.length - 1);
        return array[index];
    }

    static convertToVec3(x: number | cc.Vec2, y?: number, z?: number): cc.Vec3 {
        if (x instanceof cc.Vec2) {
            return new cc.Vec3(x.x, x.y);
        } else {
            return new cc.Vec3(x, y ? y : 0, z ? z : 0);
        }
    }

    static getEnumKeys(e): string[] {
        const keys = [];

        for (const k in e) {
            keys.push(k);
        }

        return keys;
    }

    static getRandomEnumKey(e): string {
        return Utilities.getRandomElementFromArray(Utilities.getEnumKeys(e));
    }

    static multiplySizeByScalar(s1: cc.Size, v: number): cc.Size {
        return new cc.Size(s1.width * v, s1.height * v);
    }
}
