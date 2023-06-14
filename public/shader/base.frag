precision highp float;

varying highp vec2 vTextureCoord;
varying highp vec3 vColor;

uniform sampler2D uSampler;
uniform highp float alphaThreshold;
uniform int useTex;

void main(void) {
    highp vec4 texelColor;
    if (useTex == 1) {
        texelColor = texture2D(uSampler, vTextureCoord);
    } else {
        texelColor = vec4(1.0,1.0,1.0,1.0);
    }

    if(texelColor.a <= alphaThreshold)
        discard;

    gl_FragColor = vec4(texelColor.rgb * vColor, 1.0);
}