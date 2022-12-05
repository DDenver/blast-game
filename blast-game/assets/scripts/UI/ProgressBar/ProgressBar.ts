import Utilities from '../../Plugins/Utilities';
import IProgressBarInitData from './IProgressBarInitData';
import ProgressBarRenderer from './ProgressBarRenderer';

const { ccclass, property } = cc._decorator;

@ccclass
export default class ProgressBar extends cc.Component {

    private renderer: ProgressBarRenderer = null;
    private goal: number = 100;
    private currentProgress: number = 0;
    private callback: () => void = null;
    private isGoalComplete: boolean = false;

    onLoad() {
        this.renderer = this.node.getComponent(ProgressBarRenderer);
    }

    public init(data: IProgressBarInitData): void {
        this.goal = data.goal;
        this.callback = data.callback;
        this.currentProgress = 0;
        this.isGoalComplete = false;

        this.updateProgress(0);
    }

    public updateProgress(v: number): void {
        if (this.isGoalComplete) return;
        
        this.currentProgress = Utilities.clamp(this.currentProgress + v, 0, this.goal);
        this.renderer.setProgress(this.currentProgress / this.goal);

        if (this.currentProgress === this.goal) {
            this.callback();
            this.isGoalComplete = true;
        };
    }
}
