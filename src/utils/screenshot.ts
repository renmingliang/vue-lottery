import html2canvas from 'html2canvas' // screenshot

/**
 * 将当前时间生成格式化的字符串
 * 主要使用在截图文件的存储
 */
function timestamp() {
  const date = new Date()
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()
  const hour = date.getHours()
  const minute = date.getMinutes()
  const second = date.getSeconds()

  return (
    [year, month, day].map(formatNumber).join('/') +
    '/' +
    [hour, minute, second].map(formatNumber).join(':')
  )
}

/**
 * 转化个位数字 => 十位数字，前置补0
 * @param {number} n 数字
 */
function formatNumber(n) {
  n = n.toString()
  return n[1] ? n : '0' + n
}

/**
 * Converts canvas to an image
 * @param {object} canvas 对象
 */
function convertCanvasToImage(canvas) {
  /* const image = new Image()
  image.src = canvas.toDataURL('image/png')
  return image */
  const base64 = canvas.toDataURL('image/png')
  return base64
}

/**
 * 下载此图片功能
 * @param {json} object 属性集合
 *  fileName 图像文件名
 *  href base64编码的图像
 */
function downloadFile(object) {
  const element = document.createElement('a')
  element.style.display = 'none'
  for (const key in object) {
    element.setAttribute(key, object[key])
  }
  document.body.appendChild(element)
  element.click()
  setTimeout(() => {
    document.body.removeChild(element)
  }, 300)
}

/**
 * 截图 // screenshot
 * @param {String} award 奖项类别
 * @param {String} num 本奖项总数
 */
function screenshot(award, num) {
  const el = document.querySelector('.lottery-user') as HTMLElement
  html2canvas(el, { allowTaint: true }).then(function (canvas) {
    document.body.appendChild(canvas)
    const capture = convertCanvasToImage(canvas)
    const temp = {
      download: `lottery-${award}-${num}-${timestamp().toString()}.png`,
      href: capture
    }
    // 以下代码为下载此图片功能
    downloadFile(temp)
  })
}

export default screenshot
