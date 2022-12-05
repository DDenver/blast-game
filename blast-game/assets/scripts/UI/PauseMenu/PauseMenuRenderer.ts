const {ccclass, property} = cc._decorator;

@ccclass
export default class PauseMenuRenderer extends cc.Component {

    @property(cc.Node) pauseModal: cc.Node = null;
    private duration: number = 0.1;

    onLoad(){
        this.pauseModal.active = false;
        this.pauseModal.opacity = 0;
    }

    public async showModal(): Promise<void> {
        this.pauseModal.active = true;
        this.playAnimation(this.pauseModal, 255);
    }

    public async hideModal(): Promise<void> {
        await this.playAnimation(this.pauseModal, 0);
        this.pauseModal.active = false;
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
