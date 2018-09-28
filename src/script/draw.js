export default class privateChop {
  constructor (obj) {
    this.canvas = document.getElementById(obj.id)
    this.context = this.canvas.getContext('2d')
    this.flag = false
    this.x = 0
    this.y = 0
    this.color = 'black'
    this.index = 0
  }

  startDrawing (e) {
    this.flag = true
    this.x = e.offsetX // 鼠标落下时的X
    this.y = e.offsetY // 鼠标落下时的Y
  }

  endDrawing (e, color) {
    this.flag = false
    this.context.clearRect(0, 0, this.canvas.width, this.canvas.height)
    this.createSvg(e, color)
  }

  moveDrawing (type, e, color) {
    this.color = color
    this[type](e) // 绘制方法
  }

  changeSvg (e) {
    var target = e.target.parentElement
    target.parentNode.removeChild(target)
  }

  createSvg (e, color) {
    var svg = document.getElementById('drawSvg')
    var g = document.createElementNS('http://www.w3.org/2000/svg', 'g')
    var line = document.createElementNS('http://www.w3.org/2000/svg', 'line')
    var path = document.createElementNS('http://www.w3.org/2000/svg', 'path')
    line.setAttribute('x1', this.x)
    line.setAttribute('y1', this.y)
    line.setAttribute('x2', e.offsetX)
    line.setAttribute('y2', e.offsetY)
    line.setAttribute('stroke', color)
    g.setAttribute('id', this.index++)
    path.setAttribute('d', 'M512 32C246.4 32 32 246.4 32 512s214.4 480 480 480 480-214.4 480-480S777.6 32 512 32m201.6 681.6c-12.8 12.8-35.2 12.8-48 0L512 560l-153.6 153.6c-12.8 12.8-35.2 12.8-48 0-12.8-12.8-12.8-35.2 0-48l153.6-153.6-153.6-153.6c-12.8-12.8-12.8-35.2 0-48 12.8-12.8 35.2-12.8 48 0l153.6 153.6 153.6-153.6c12.8-12.8 35.2-12.8 48 0 12.8 12.8 12.8 35.2 0 48L560 512l153.6 153.6c16 12.8 16 35.2 0 48m0 0z')
    path.setAttribute('fill', '#d81e06')
    path.setAttribute('transform', `translate(${e.offsetX - 7.2} ${e.offsetY - 7.2}) scale(.015, .015)`)
    path.setAttribute('cursor', 'pointer')
    path.addEventListener('click', this.changeSvg, false)
    g.appendChild(line)
    g.appendChild(path)
    svg.appendChild(g)
  }

  // 直线
  drawLine (e) {
    if (this.flag) {
      this.context.clearRect(0, 0, this.canvas.width, this.canvas.height)
      this.context.beginPath()
      this.context.strokeStyle = this.color
      this.context.moveTo(this.x, this.y)
      this.context.lineTo(e.offsetX, e.offsetY)
      this.context.stroke()
    }
  }

  // 画笔
  // drawPencil(e) {
  //     if (this.flag) {
  //         this.context.lineTo(e.offsetX, e.offsetY);
  //         this.context.stroke(); // 调用绘制方法
  //     } else {
  //         this.context.beginPath();
  //         this.context.moveTo(e.offsetX, e.offsetX);
  //     }
  // }

  // // 圆
  // drawCircle(e) {
  //     if (this.flag) {
  //         this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
  //         this.context.beginPath();
  //         this.context.strokeStyle = this.color
  //         let rx = (e.offsetX - this.x) / 2;
  //         let ry = (e.offsetY - this.y) / 2;
  //         let r = Math.sqrt(rx * rx + ry * ry);
  //         this.context.arc(rx + this.x, ry + this.y, r, 0, Math.PI * 2); // 第5个参数默认是false-顺时针
  //         this.context.stroke();
  //     }
  // }
  //
  // // 矩形
  // drawRect(e) {
  //     if (this.flag) {
  //         this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
  //         this.context.beginPath();
  //         this.context.strokeStyle = this.color
  //         this.context.strokeRect(this.x, this.y, e.offsetX - this.x, e.offsetY - this.y);
  //     }
  // }
}
