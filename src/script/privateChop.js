export default class privateChop {
  constructor (name) {
    this.canvas = document.createElement('canvas')
    this.canvas.width = 90
    this.canvas.height = 40
    this.context = this.canvas.getContext('2d')
    this.name = name
  }

  // 开始绘制
  startDrawing () {
    this.createBorder()
    this.createName()
  }

  // 印章边框
  createBorder () {
    this.context.lineWidth = 4
    this.context.strokeStyle = '#f00'
    this.context.beginPath()
    this.context.rect(0, 0, this.canvas.width, this.canvas.height)
    this.context.stroke()
  }

  // 印章名称
  createName () {
    this.context.font = '20px Helvetica'
    this.context.textBaseline = 'middle'// 设置文本的垂直对齐方式
    this.context.textAlign = 'center' // 设置文本的水平对对齐方式
    this.context.lineWidth = 1
    this.context.fillStyle = '#f00'
    this.context.fillText(this.name, this.canvas.width / 2, this.canvas.height / 2)
  }

  // 重绘
  redraw (name) {
    this.name = name
    this.context.clearRect(0, 0, this.canvas.width, this.canvas.height)
    this.startDrawing()
  }
}
