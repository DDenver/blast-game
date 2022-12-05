const { ccclass, property } = cc._decorator;

@ccclass
export default class MainMenuRenderer extends cc.Component {

    @property(cc.Node) modalMenu: cc.Node = null;
    @property(cc.Node) modalAchievements: cc.Node = null;
    @property(cc.Label) labelLevel: cc.Label = null;
    @property(cc.Label) labelSteps: cc.Label = null;
    @property(cc.Label) labelScore: cc.Label = null;

    private duration: number = 0.1;

    public async showMenu(): Promise<void> {
        await this.playAnimation(this.modalAchievements, 0);
        await this.playAnimation(this.modalMenu, 255);
    }

    public async showAchievements(level: number, steps: number, score: number): Promise<void> {
        this.labelLevel.string = '' + level;
        this.labelSteps.string = '' + steps;
        this.labelScore.string = '' + score;

        await this.playAnimation(this.modalMenu, 0);
        await this.playAnimation(this.modalAchievements, 255);
    }

    private async playAnimation(target: cc.Node, opacity: number): Promise<void> {
        return new Promise(res => {
            cc.tween<cc.Node>(target).to(this.duration,
                { opacity },
            )
                .call(() => res())
                .start();
        })
    }

}
