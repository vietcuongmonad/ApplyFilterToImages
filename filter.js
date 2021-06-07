var img = null, position = null;

function randomNum(x, left, right) {
  var value = Math.floor(Math.random()*10 +1) - Math.floor(Math.random()*10 +1);

  var res = x + value;

  if (res>right) return right;
  if (res<left) return left;
  return res;
}

function upload() {
  position = document.getElementById("data");

  var FileInput = document.getElementById("FileInput");
  img = new SimpleImage(FileInput);

  img.drawTo(position);

  document.getElementById("volume").innerHTML = position.width + " x " + position.height;
}

function warning() {
  if (img == null || !img.complete()) {
    alert("Image not uploaded.");
    return true;
  }
} // return true if image is not uploaded

function createNew() {
  var newImg = new SimpleImage(img.getWidth(), img.getHeight());

  for(var pixel of img.values()) {
    var x = pixel.getX(), y = pixel.getY();
    newImg.setPixel(x, y, img.getPixel(x, y));
  }

  return newImg;
} // make a copy of new image

function Reset() {
  if (warning()) return;
  img.drawTo(position);
}

function Grayscale() {
  if (warning()) return;

  var newImg = createNew();

  for(var pixel of newImg.values()) {
    var avg = (pixel.getRed()+pixel.getGreen()+pixel.getBlue())/3;
    pixel.setRed(avg);
    pixel.setGreen(avg);
    pixel.setBlue(avg);
 }

  newImg.drawTo(position);
}

function Rainbow() {
  if (warning()) return;

  var newImg = createNew();

  var width = newImg.getWidth();
  for(var pixel of newImg.values()) {
    var red = pixel.getRed(), green = pixel.getGreen(), blue = pixel.getBlue();

    var avg = (red+green+blue) / 3, x = pixel.getX();
    if (avg<128) {
      if (x<width/7) {
        pixel.setRed(2*avg); pixel.setGreen(0); pixel.setBlue(0);
      } else if (x<2*width/7) {
        pixel.setRed(2*avg); pixel.setGreen(0.8*avg); pixel.setBlue(0);
      } else if (x<3*width/7) {
        pixel.setRed(2*avg); pixel.setGreen(2*avg); pixel.setBlue(0);
      } else if (x<4*width/7) {
        pixel.setRed(0); pixel.setGreen(2*avg); pixel.setBlue(0);
      } else if (x<5*width/7) {
        pixel.setRed(0); pixel.setGreen(0); pixel.setBlue(2*avg);
      } else if (x<6*width/7) {
        pixel.setRed(0.8*avg); pixel.setGreen(0); pixel.setBlue(2*avg);
      } else {
        pixel.setRed(1.6*avg); pixel.setGreen(0); pixel.setBlue(1.6*avg);
      }
    } else {
      if (x<width/7) {
        pixel.setRed(255); pixel.setGreen(2*avg-255); pixel.setBlue(2*avg-255);
      } else if (x<2*width/7) {
        pixel.setRed(255); pixel.setGreen(1.2*avg-51); pixel.setBlue(2*avg-255);
      } else if (x<3*width/7) {
        pixel.setRed(255); pixel.setGreen(255); pixel.setBlue(2*avg-255);
      } else if (x<4*width/7) {
        pixel.setRed(2*avg-255); pixel.setGreen(255); pixel.setBlue(2*avg-255);
      } else if (x<5*width/7) {
        pixel.setRed(2*avg-255); pixel.setGreen(2*avg-255); pixel.setBlue(255);
      } else if (x<6*width/7) {
        pixel.setRed(1.2*avg-51); pixel.setGreen(2*avg-255); pixel.setBlue(255);
      } else {
        pixel.setRed(0.4*avg+153); pixel.setGreen(2*avg-255); pixel.setBlue(0.4*avg+153);
      }
    }
  }

  newImg.drawTo(position);
}

function Blood() {
  if (warning()) return;

  var newImg = createNew();

  for(var pixel of newImg.values()) {
    var avg = ( pixel.getRed() + pixel.getGreen()+pixel.getBlue() ) / 3;

    if (avg<128) {
      pixel.setRed(avg*2);
      pixel.setGreen(0);
      pixel.setBlue(0);
    } else {
      pixel.setRed(255);
      pixel.setGreen(2*avg-255);
      pixel.setBlue(2*avg-255);
    }
  }

  newImg.drawTo(position);
}

function Window() {
  if (warning()) return;

  Reset();

  var ctx = position.getContext("2d");

  var width = position.width, height = position.height, midWidth = width/2, midHeight = height/2;

  ctx.fillStyle="white";

  ctx.fillRect(midWidth, 0, 5, height);
  ctx.fillRect(midWidth/2, 0, 5, height);
  ctx.fillRect(3*midWidth/2, 0, 5, height);
  ctx.fillRect(0, midHeight, width, 5);

}

function Sun() {
  if (warning()) return;

  Reset();

  var posX = 7*position.width/8, posY = position.height/4, radius=50;

  var ctx = position.getContext("2d");

  ctx.fillStyle = "yellow";
  ctx.strokeStyle = "yellow";
  ctx.lineWidth = 5;

  ctx.beginPath();
  ctx.arc(posX, posY, radius, 0, 2*Math.PI);
  ctx.fill();

  ctx.moveTo(posX+radius, posY);
  ctx.lineTo(posX+5*radius/3, posY);

  ctx.moveTo(posX-radius, posY);
  ctx.lineTo(posX-5*radius/3, posY);

  ctx.moveTo(posX, posY+radius);
  ctx.lineTo(posX, posY+5*radius/3);

  ctx.moveTo(posX, posY-radius);
  ctx.lineTo(posX, posY-5*radius/3);

  ctx.stroke();
}

function Blur() {
  if (warning()) return;

  var newImg = createNew();

  var width = newImg.getWidth(), height = newImg.getHeight();

  for(var pixel of newImg.values()) {
    var dir = Math.random();

    if (dir>=0.5) {
      var x = pixel.getX(), y = pixel.getY();
      var copyX = randomNum(x, 0, width-1), copyY = randomNum(y, 0, height-1);

      newImg.setPixel(x, y, img.getPixel(copyX, copyY));
    }
  }

  newImg.drawTo(position);
}
