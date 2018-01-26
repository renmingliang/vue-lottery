import Mock from 'mockjs'
const temp = {
  admin: {errorInfo: '登陆成功', result: '1', data: ''},
  check: {errorInfo: '您已经登陆过了', result: '1', data: ''},
  add: {errorInfo: '成功', result: '1', data: ''}
}

const userData = []
const userCount = 100
for (let i = 0; i < userCount; i++) {
  userData.push(Mock.mock({
    Company: `公司测${i}`,
    CompleteID: '@increment',
    HeadImg: `http://test.baoxianadmin.com/static/m/images/headImage/${i + 1}.jpg`,
    Name: `测${i}`,
    Num: `M${i}`,
    OpenID: '@increment',
    Award: '0'
  }))
}

const type = []
const typeCount = 5
for (let i = 0; i < typeCount; i++) {
  type.push(Mock.mock({
    value: '@increment',
    label: '特等奖',
    number: '13'
  }))
}

export default {
  postLogin: config => {
    // console.log(config.body)
    const params = config.body.split('=')[1]
    return temp[params]
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
    console.log(config.body)
    return temp['add']
  }
}
