varying highp vec2 vTextureCoord;
varying highp vec3 vColor;

uniform sampler2D uSampler;
uniform highp float alphaThreshold;

void main(void) {
    highp vec4 texelColor = texture2D(uSampler, vTextureCoord);

    if(texelColor.a <= alphaThreshold)
        discard;

    gl_FragColor = vec4(texelColor.rgb * vColor, 1.0);
}