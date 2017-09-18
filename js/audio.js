let getSoundRawData = async() => {
    let res = await fetch('./sounds/0124.wav');
    let buffer = await res.arrayBuffer();
    return buffer;
};

let getChannelData = async (buffer) => {
    let audioCtx = new AudioContext();
    let data;
    await audioCtx.decodeAudioData(buffer, audioData => {
        data = audioData.getChannelData(0);
    })
    return data;
};

let dataToColor = (channelData, imgData) => {
    channelData.forEach((v, i) => {
        let val = Math.ceil((v + 1) * 255 / 2);
        let rgba = hslToRgba(val / 0.4, 255, 150, 255);
        let start = i * 4;
        rgba.forEach((v, i) => {
            imgData.data[start + i] = v;
        })
    })
};

let createCanvas = data => {
    let canvas = document.createElement('canvas');
    document.body.appendChild(canvas);
    let ctx = canvas.getContext('2d');
    let size = Math.sqrt(data.length);

    canvas.height = size;
    canvas.width = size;

    let imgData = ctx.createImageData(size, size);
    dataToColor(data, imgData);

    ctx.putImageData(imgData, 0, 0);
};

let hslToRgba = (h, s, l, a) => {
    let r, g, b;

    h = h / 255;
    s = s / 255;
    l = l / 255;

    function convert(p, q, t) {
        if (t < 0) t += 1;
        if (t > 1) t -= 1;
        if (t < 1 / 6) return p + (q - p) * 6 * t;
        if (t < 1 / 2) return q;
        if (t < 2 / 3) return p + (q - p) * (2 / 3 - t) * 6;
        return p;
    }

    let q = l < 0.5 ? l * (1 + s) : l + s - l * s;
    let p = 2 * l - q;
    r = convert(p, q, h + 1 / 3);
    g = convert(p, q, h);
    b = convert(p, q, h - 1 / 3);

    return [r * 255, g * 255, b * 255, a];
}

let drawMusic = async () => {
    let buffer = await getSoundRawData();
    let data = await getChannelData(buffer);

    createCanvas(data);  
};

drawMusic();




