const { ccclass, property } = cc._decorator;

@ccclass
export default class ResultMenuRenderer extends cc.Component {

    @property(cc.Node) levelWin: cc.Node = null;
    @property(cc.Label) levelNumberLabel: cc.Label = null;
    @property(cc.Label) stepsLabel: cc.Label = null;
    @property(cc.Label) scoreWinLabel: cc.Label = null;


    @property(cc.Node) levelFail: cc.Node = null;
    @property(cc.Label) scoreFailLabel: cc.Label = null;
    @property(cc.Label) titleFailLabel: cc.Label = null;

    private duration: number = 0.1;

    onLoad() {
        this.levelWin.opacity = 0;
        this.levelWin.active = false;
        this.levelFail.opacity = 0;
        this.levelFail.active = false;
    }

    public showWinModal(steps: number, score: number, level: number): void {
        this.levelNumberLabel.string = `уровень ${level} пройден`;
        this.stepsLabel.string = '' + steps;
        this.scoreWinLabel.string = '' + score;

        this.levelWin.active = true;
        this.levelWin.opacity = 255;
    }

    public showFailModal(isFail: boolean, score: number): void {
        this.titleFailLabel.string = isFail ? 'поражение' : 'результат';
        this.scoreFailLabel.string = '' + score;


        this.levelFail.active = true;
        this.levelFail.opacity = 255;
    }

}
