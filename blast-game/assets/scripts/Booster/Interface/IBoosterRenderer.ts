export default interface IBoosterRenderer {
    init(icon: cc.SpriteFrame, count: number): void,
    setCount(count: number): void,
    activate(): void,
    deactivate(): void,
}