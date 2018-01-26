import Mock from 'mockjs'
const temp = {
  admin: {errorInfo: '登陆成功', result: '1', data: ''},
  check: {errorInfo: '您已经登陆过了', result: '1', data: ''},
  add: {errorInfo: '成功', result: '1', data: ''}
}

// 模拟用户数据
const userData = []
const userCount = 1000
for (let i = 1; i < userCount; i++) {
  userData.push(Mock.mock({
    Company: `公司测${i}`,
    CompleteID: '@increment',
    HeadImg: `http://test.baoxianadmin.com/static/m/images/headImage/${i}.jpg`,
    Name: `测${i}`,
    Num: `M${i}`,
    OpenID: '@increment',
    Award: '0'
  }))
}

const type = [
  {value: '9', label: '特等奖', number: '3'},
  {value: '1', label: '一等奖', number: '5'},
  {value: '2', label: '二等奖', number: '12'},
  {value: '3', label: '三等奖', number: '20'},
  {value: '4', label: '参与奖', number: '28'},
  {value: '5', label: '其他', number: ''}
]

export default {
  postLogin: config => {
    // console.log(config.body)
    const params = config.body.split('=')[1]
    if (temp[params]) {
      return temp[params]
    } else {
      return {errorInfo: '密码错误', result: '0', data: ''}
    }
  },
  checkLogin: config => {
    return temp['check']
  },
  getDatas: () => {
    return {
      userData,
      type
    }
  },
  postDatas: config => {
    return temp['add']
  }
}
