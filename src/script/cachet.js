export default class CreateSeal {
  constructor (obj) {
    this.canvas = document.getElementById(obj.id)
    this.context = this.canvas.getContext('2d')
    this.width = this.canvas.width / 2
    this.height = this.canvas.height / 2
    this.name = obj.name
    this.company = obj.company
  }

  // 开始绘制
  startDrawing () {
    this.createBorder()
    this.create5star(this.context, this.width, this.height, 20, '#f00', 0)
    this.createName()
    this.createCompany()
  }

  createErr () {
    this.context.lineWidth = 1
    this.context.strokeStyle = '#f00'
    this.context.beginPath()
    this.context.rect(0, 0, this.canvas.width, this.canvas.height)
    this.context.stroke()
  }

  // 印章边框
  createBorder () {
    this.context.lineWidth = 7
    this.context.strokeStyle = '#f00'
    this.context.beginPath()
    this.context.arc(this.width, this.height, 85, 0, Math.PI * 2)
    this.context.stroke()
  }

  // 印章名称
  createName () {
    this.context.font = '16px Helvetica'
    this.context.textBaseline = 'middle'// 设置文本的垂直对齐方式
    this.context.textAlign = 'center' // 设置文本的水平对对齐方式
    this.context.lineWidth = 1
    this.context.fillStyle = '#f00'
    this.context.fillText(this.name, this.width, this.height + 55)
  }

  // 印章单位
  createCompany () {
    this.context.translate(this.width, this.height)// 平移到此位置,
    this.context.font = '20px Helvetica'
    var count = this.company.length// 字数
    var angle = 4 * Math.PI / (3 * (count - 1))// 字间角度
    var chars = this.company.split('')
    var c
    for (var i = 0; i < count; i++) {
      c = chars[i]// 需要绘制的字符
      if (i === 0) {
        this.context.rotate(5 * Math.PI / 6)
      } else {
        this.context.rotate(angle)
      }
      this.context.save()
      this.context.translate(70, 0)// 平移到此位置,此时字和x轴垂直
      this.context.rotate(Math.PI / 2)// 旋转90度,让字平行于x轴
      this.context.fillText(c, 0, 5)// 此点为字的中心点
      this.context.restore()
    }
  }

  // 五角星
  create5star (context, sx, sy, radius, color, rotato) {
    context.save()
    context.fillStyle = color
    context.translate(sx, sy)// 移动坐标原点
    context.rotate(Math.PI + rotato)// 旋转
    context.beginPath()// 创建路径
    var x = Math.sin(0)
    var y = Math.cos(0)
    var dig = Math.PI / 5 * 4
    for (var i = 0; i < 5; i++) { // 画五角星的五条边
      x = Math.sin(i * dig)
      y = Math.cos(i * dig)
      context.lineTo(x * radius, y * radius)
    }
    context.closePath()
    context.stroke()
    context.fill()
    context.restore()
  }

  // 重绘
  redraw (obj) {
    this.canvas.height = this.canvas.height
    if (obj) {
      this.company = obj.company
      this.name = obj.name
      this.startDrawing()
    }
  }
}
