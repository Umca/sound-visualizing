let getSoundRawData = async() => {
    let res = await fetch('./sounds/0124.wav');
    let buffer = await res.arrayBuffer();
    return buffer;
};

let getChannelData = async(buffer) => {
    let audioCtx = new AudioContext();
    let data;
    await audioCtx.decodeAudioData( buffer, audioData => {
        data = audioData.getChannelData(0);
    })
    return data;
}

let createCanvas = (length) => {
    let canvas = document.createElement('canvas');
    document.body.appendChild(canvas);
    let ctx = canvas.getContext('2d');
    let size = Math.sqrt(length);

    canvas.height = size;
    canvas.width = size;

    let imgData = ctx.createImageData(size, size);

};

let drawMusic = async () => {
    let buffer = await getSoundRawData();
    let data = await getChannelData(buffer);

    createCanvas(data.length);

    console.log(data)

      
    
};

drawMusic();




