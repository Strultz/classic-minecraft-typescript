import { gl, shader } from "../Minecraft"

export class Tesselator {
    private array: number[] = []
    private vertices: number = 0
    private u: number = 0
    private v: number = 0
    private color: number = 0
    private len: number = 3
    private p: number = 0
    private buffer: WebGLBuffer = null
    public static instance: Tesselator = new Tesselator()

    private constructor() {
    }

    public static drawBuffer(buffer: WebGLBuffer, vertices: number): void {
        const bytesPerFloat = 4

        gl.bindBuffer(gl.ARRAY_BUFFER, buffer)
        // Texture UV
        gl.vertexAttribPointer(0, 2, gl.FLOAT, false, bytesPerFloat * 6, 0)
        gl.enableVertexAttribArray(0)
        // Color RGBA
        gl.vertexAttribPointer(1, 4, gl.UNSIGNED_BYTE, false, bytesPerFloat * 6, bytesPerFloat * 2)
        gl.enableVertexAttribArray(1)
        // Vertex XYZ
        gl.vertexAttribPointer(2, 3, gl.FLOAT, false, bytesPerFloat * 6, bytesPerFloat * 3)
        gl.enableVertexAttribArray(2)

        gl.drawArrays(gl.TRIANGLES, 0, vertices)
    }

    public flush(): number {
        if (this.vertices > 0) {
            gl.bindBuffer(gl.ARRAY_BUFFER, this.buffer)
            gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(this.array), gl.STATIC_DRAW)
        }
        let tmpVertices = this.vertices
        this.clear()
        return tmpVertices;
    }

    private clear(): void {
        this.vertices = 0
        this.p = 0
        this.array = []
    }

    public init(buffer: WebGLBuffer): void {
        this.clear()
        this.buffer = buffer
    }

    public tex(u: number, v: number): void {
        this.u = u
        this.v = v
    }

    public color_i_a(r: number, g: number, b: number, a: number): void {
        if (r > 255)
        {
            r = 255
        }

        if (g > 255)
        {
            g = 255
        }

        if (b > 255)
        {
            b = 255
        }

        if (a > 255)
        {
            a = 255
        }

        if (r < 0)
        {
            r = 0
        }

        if (g < 0)
        {
            g = 0
        }

        if (b < 0)
        {
            b = 0
        }

        if (a < 0)
        {
            a = 0
        }
        
        let uInt32 = new Uint32Array([0x11223344]);
        let uInt8 = new Uint8Array(uInt32.buffer);
     
        if(uInt8[0] === 0x44) {
            this.color = a << 24 | b << 16 | g << 8 | r
        } else {
            this.color = r << 24 | g << 16 | b << 8 | a
        }
        
        console.log(this.color)
    }

    public color_f_a(r: number, g: number, b: number, a: number): void {
        this.color_i_a(Math.trunc(r * 255), Math.trunc(g * 255), Math.trunc(b * 255), Math.trunc(a * 255))
    }

    public color_f(r: number, g: number, b: number): void {
        this.color_f_a(r, g, b, 1.0)
    }

    public vertexUV(x: number, y: number, z: number, u: number, v: number): void {
        this.tex(u, v)
        this.vertex(x, y, z)
    }

    public vertex(x: number, y: number, z: number): void {
        this.array.push(this.u)
        this.array.push(this.v)
        this.array.push(this.color)
        this.array.push(x)
        this.array.push(y)
        this.array.push(z)
        this.vertices++
    }

    public color_i(c: number): void {
        const r: number = (c >> 16) & 0xff
        const g: number = (c >> 8) & 0xff
        const b: number = c & 0xff
        this.color_i_a(r, g, b, 255)
    }
    
    // Replicating removed gl 1.1 functionality
    public static alphaFunc(av: number): void { // glAlphaFunc
        gl.uniform1f(shader.getUniformLocation("alphaThreshold"), av)
    }
    
    public static setUseTex(tex: boolean): void { // glDisable(GL_TEXTURE_2D)
        gl.uniform1i(shader.getUniformLocation("useTex"), tex ? 0 : 1)
    }
    
    public static setUseFog(fog: boolean): void { // glDisable(GL_FOG)
        gl.uniform1i(shader.getUniformLocation("useFog"), fog ? 0 : 1)
    }
}