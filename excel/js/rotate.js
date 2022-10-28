class imgRotate {
    constructor({ ele, src, angle }) {
      this.ele = ele;
      this.image = new Image();
      this.image.setAttribute('crossOrigin', 'anonymous');
      this.image.src = src;
      this.canvas = document.createElement("canvas");
      this.ctx = this.canvas.getContext("2d")
      this.angle = angle;
    }
   
    async rotate () {
      let img = new Image(),
        angles = [0, 90, 180, 270];
      this.image.onload = _ => {
        if (angles[this.angle] % 180 === 0) {
          this.canvas.width = this.image.width;
          this.canvas.height = this.image.height;
        } else {
          this.canvas.width = this.image.height;
          this.canvas.height = this.image.width;
        }
        switch (this.angle) {
          case 0: // 0
            this.ctx.translate(0, 0)
            break;
          case 1: // 90
            this.ctx.translate(this.canvas.width, 0)
            break;
          case 2:// 180
            this.ctx.translate(this.canvas.width, this.canvas.height)
            break;
          case 3: // 270
            this.ctx.translate(0, this.canvas.height)
            break;
          default:
            throw new ReferenceError("No angle");
            break;
        }
        this.ctx.rotate(angles[this.angle] * Math.PI / 180);
        this.ctx.drawImage(this.image, 0, 0, this.image.width, this.image.height, 0, 0, this.image.width, this.image.height);
   
        img.src = this.canvas.toDataURL("image/png");
        if (this.isDom()) this.ele.appendChild(img);
      }
      return img;
    }
   
    isDom () {
      return typeof this.ele === 'object' && this.ele.nodeType === 1 && typeof this.ele.nodeName === 'string';
    }
  }
   
  // export default imgRotate
  
  