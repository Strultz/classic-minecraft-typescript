import { Textures } from "../renderer/Textures";
import { gl } from "../Minecraft";

export class Font {
    public charWidths: number[] = []
    public fontTexture: WebGLTexture = 0
    
    public async loadImage(imageUrl): HTMLImageElement {
        let img: HTMLImageElement;
        const imageLoadPromise = new Promise(resolve => {
            img = new window.Image();
            img.onload = resolve;
            img.src = imageUrl;
        });

        await imageLoadPromise;
        return img;
    }

    public constructor(resourceName: string, textureManager: Textures) {
        let canvas = document.createElement("canvas")
        let context = canvas.getContext("2d")
        let img: Image = this.loadImage(resourceName)
        context.drawImage(img, 0, 0)
        
        let i4: number = img.width
        let i5: number = img.height
        let i6 = context.getImageData(0, 0, i4, i5)
        
        for (let i14: number = 0; i14 < 256; ++i14) {
            i5 = i14 % 16;
            let i7: number = Math.trunc(i14 / 16);
            let i8: number = 0
            
            for (let z9: boolean = false; i8 < 0 && !z9; ++i8) {
                let i10: number = (i5 << 3) + i8
                z9 = true
                
                for (let i11: number = 0; i11 < 8; ++i11) {
                    let i12: number = ((i7 << 3) + i11) * i4
                    if (i6.data[(i10 + i12) * 4 + 3] > 128) {
						z9 = false
					}
                }
            }
            
            if (i14 == 32) {
				i8 = 4
			}

			this.charWidths[i14] = i8
        }

		this.fontTexture = textureManager.loadTexture(resourceName, gl.NEAREST)
    }
}