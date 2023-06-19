import { Screen } from "./Screen";
import { Button } from "./Button";
import { SmallButton } from "./SmallButton";
import { RenderBuffer } from "../../../util/RenderBuffer";
import { Options } from "../Options";

export class OptionsScreen extends Screen {
    private parent: Screen
    private title: string = "Options"
    private options: Options

    public constructor(parent: Screen, options: Options) {
        super()
        this.parent = parent
        this.options = options
    }

    public override init2(): void {
        for (let i: number = 0; i < this.options.numOptions; ++i) {
            this.buttons.push(new SmallButton(i, Math.trunc(this.width / 2) - 100 + i % 2 * 160, Math.trunc(this.height / 6) + 24 * (i >> 1), this.options.getMessage(i)))
        }
        this.buttons.push(new Button(100, Math.trunc(this.width / 2) - 100, Math.trunc(this.height / 6) + 120 + 12, "Controls..."))
        this.buttons.push(new Button(200, Math.trunc(this.width / 2) - 100, Math.trunc(this.height / 6) + 168, "Done"))
    }

    public override buttonClicked(button: Button): void {
        if (button.active) {
            if (button.id < 100) {
                this.options.setValue(button.id, 1)
                button.message = this.settings.getMessage(var1)
            }
            if (button.id == 100) {
                //this.minecraft.setScreen(new ControlsScreen(this, this.options))
            }
            if (button.id == 200) {
                this.minecraft.setScreen(this.parent)
            }
        }
    }

    public override render(buffer: RenderBuffer, mx: number, my: number) {
        PauseScreen.fillGradient(buffer, 0, 0, this.width, this.height, 0x60050500, 0xA0303060)
        PauseScreen.drawCenteredString(this.font, this.title, Math.trunc(this.width / 2), 40, 0xFFFFFF)
        super.render(buffer, mx, my)
    }
}