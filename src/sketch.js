import { v4 as uuidv4 } from 'uuid';

export const mySketch = (p) => {
  let canv, capture;
  let hold;
  const id = uuidv4();

  // Calling p5.js functions, using the variable 'p'
  p.setup = () => {
    let div = p.createDiv('').size(320, 240);
    div.center();
    canv = p.createCanvas(320, 240);
    canv.parent(div);
    let text = p.createP('To take a portrait, make sure that your head is inside the red oval and that you have good lighting. Then click on the preview image to download the photo to your computer. Repeat until you are happy with the result. No data is stored on this server.');
    text.parent(div);
    capture = p.createCapture(p.VIDEO);
    console.log(capture.width, capture.height); // definitely wrong, assume 720p 16:9
    capture.hide();
    hold = p.createImage(1280, 720);
  }

  p.draw = () => {
    p.background(220);
    p.image(capture, 0, 0, 320, 240);
    //p.image(hold, 400, 0);
    p.noFill();
    p.stroke(255, 12, 0);
    p.strokeWeight(4);
    p.ellipse(160, 120, 150, 200);
  }
  
  p.mousePressed = () => {
    hold = capture.get(0, 0, 1280, 720);
    hold.save(`photo-${id}`, 'png');
    // restart the camera so it keeps showing the live feed
    capture = p.createCapture(p.VIDEO);
    capture.hide();

  }

}
