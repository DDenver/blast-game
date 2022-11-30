
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
        const index: number = this.getRandomInt(0, array.length);
        return array[index];
    }
}
