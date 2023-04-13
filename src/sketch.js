import { v4 as uuidv4 } from 'uuid';

export const mySketch = (p) => {
  let canv, capture, hold, mainDiv, mirror, processing;
  const id = uuidv4();
  const canvWidth = 320;
  const canvHeight = 240;
  let portraitWidth = 960;
  let portraitHeight = 720;
  p.setup = () => {
    mainDiv = p.createDiv('').size(canvWidth, canvHeight);
    mainDiv.center();
    canv = p.createCanvas(canvWidth, canvHeight);
    canv.parent(mainDiv);
    let textA = p.createP('To take a portrait, allow camera access and downloads when prompted. Make sure that your head is inside the oval and that you have good lighting. Then click on the preview to download the portrait to your computer. Repeat until you are happy with the result.');
    let textB = p.createP('Tested with Chrome and Firefox. May not work on all browsers. No data or image is stored on the server.');
    textA.parent(mainDiv);
    textB.parent(mainDiv);
    // capture = p.createCapture({video: {width: portraitWidth, facingMode: "user"}}); // alternative
    capture = p.createCapture(p.VIDEO);
    // console.log(capture.width, capture.height); // definitely wrong
    capture.size(portraitWidth, portraitHeight);
    capture.hide();
    hold = p.createImage(portraitWidth, portraitHeight);
    mirror = p.createImage(portraitWidth, portraitHeight);
    processing = false;
  }

  p.draw = () => {
    p.background(220);
    // mirror
    p.push();
    p.translate(canv.width, 0);
    p.scale(-1, 1);
    p.image(capture, 0, 0, canv.width, canv.height);
    p.noFill();
    p.stroke(255, 136, 0);
    p.strokeWeight(4);
    p.ellipse(160, 120, 150, 200); // adapt to canvas size
    p.pop();
    if (processing) {
      p.textSize(26);
      p.textAlign(p.CENTER, p.CENTER);
      p.text('Processing... Please Wait', 160, 120);
    }
  }

  p.mousePressed = () => {
    processing = true;
    setTimeout(() => {
      saveImage();
      processing = false;
    }, 100);
  }

  p.windowResized = () =>{
    mainDiv.center();
  }

  function saveImage() {
    hold = capture.get(0, 0, portraitWidth, portraitHeight);
    mirror.loadPixels();
    for (let i = 0; i < hold.width; i++) {
      for (let j = 0; j < hold.height; j++) {
        mirror.set(i, j, hold.get(hold.width - i, j));
      }
    }
    mirror.updatePixels();
    mirror.save(`photo-${id}`, 'png');
    // restart the camera so it keeps showing the live feed
    capture = p.createCapture(p.VIDEO);
    capture.hide();
  }
}
