precision highp float;

varying highp vec2 vTextureCoord;
varying highp vec3 vColor;
varying highp vec3 vPosition;

uniform sampler2D uSampler;
uniform highp float alphaThreshold;
uniform int useTex;

uniform highp vec4 uFogColor;
uniform highp float uFogDensity;

void main(void) {
    highp vec4 texelColor;
    if (useTex == 1) {
        texelColor = texture2D(uSampler, vTextureCoord);
    } else {
        texelColor = vec4(1.0,1.0,1.0,1.0);
    }

    highp vec4 rgba = vec4(texelColor.rgb * vColor, 1.0);

    #define LOG2 1.442695

    highp float fogDistance = length(vPosition);
    highp float fogAmount = 1.0 - exp2(-uFogDensity * uFogDensity * fogDistance * fogDistance * LOG2);
    fogAmount = clamp(fogAmount, 0.0, 1.0);

    if(texelColor.a <= alphaThreshold)
        discard;

    gl_FragColor = mix(rgba, uFogColor, fogAmount);
}