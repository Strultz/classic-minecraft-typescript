import { Button } from "./Button";

export class SmallButton extends Button {
    public constructor(id: number, x: number, y: number, message: string) {
        super(id, x, y, message, 150, 20)
    }
}