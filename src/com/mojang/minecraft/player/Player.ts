import { Keys } from "syncinput";
import { Entity } from "../Entity";
import { keyboard } from "../Minecraft";
import { Level } from "../level/Level";
import { Input } from "./Input";

export class Player extends Entity {
    public input: Input | null = null

    public constructor(level: Level) {
        super(level)
        this.heightOffset = 1.62
    }

    public override tick(): void {
        this.xo = this.x
        this.yo = this.y
        this.zo = this.z
        if (this.input != null) {
            this.input.tick()
            let xa = this.input.xxa
            let ya = this.input.yya
            let jump = this.input.jumping

            if (keyboard.keyPressed(Keys.R)) {
                this.resetPos()
            }
            if (jump && this.onGround) {
                this.yd = 0.5
            }
            this.moveRelative(xa, ya, this.onGround ? 0.1 : 0.02)
        }
        this.yd = this.yd - 0.08
        this.move(this.xd, this.yd, this.zd)
        this.xd *= 0.91
        this.yd *= 0.98
        this.zd *= 0.91
        if (this.onGround) {
            this.xd *= 0.7
            this.zd *= 0.7
        }
    }

    public releaseAllKeys(): void {
        if (this.input == null) return
        this.input.releaseAllKeys()
    }

    public setKey(key: number, state: boolean): void {
        if (this.input == null) return
        this.input.setKeyState(key, state)
    }
}