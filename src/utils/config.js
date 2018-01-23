// login--validate, 校验方式
const validatePassword = (rule, value, callback) => {
  if (value.length < 10) {
    callback(new Error('密码不能少于10个长度'))
  } else {
    callback()
  }
}

// global config
const config = {
  // 1.登录页
  login: {
    // 登录请求地址
    url: '/doLogin.php',
    state: {
      // 当前公司提示语
      msg: '民太安集团年会抽奖系统',
      // 登录密码
      loginForm: {
        password: 'baoqU@2017'
      },
      // 校验规则
      loginRules: {
        password: [{ required: true, trigger: 'blur', validator: validatePassword }]
      }
    }
  },
  // 2.加载数据页
  onload: {
    // 获取数据地址
    url: '/getData.php',
    state: {
      // 抽奖数据
      data: {
        // 用户
        userData: [
          {Company: '公司测1', CompleteID: '1', HeadImg: 'http://test.baoxianadmin.com/static/m/images/headImage/1.jpg', Name: '测1', Num: 'M1', OpenID: '1', Award: '0'},
          {Company: '公司测13', CompleteID: '13', HeadImg: 'http://test.baoxianadmin.com/static/m/images/headImage/13.jpg', Name: '测13', Num: 'M13', OpenID: '13', Award: '0'},
          {Company: '公司测34', CompleteID: '34', HeadImg: 'http://test.baoxianadmin.com/static/m/images/headImage/34.jpg', Name: '测34', Num: 'M34', OpenID: '34', Award: '0'},
          {Company: '公司测10', CompleteID: '10', HeadImg: 'http://test.baoxianadmin.com/static/m/images/headImage/10.jpg', Name: '测10', Num: 'M10', OpenID: '10', Award: '0'},
          {Company: '公司测77', CompleteID: '77', HeadImg: 'http://test.baoxianadmin.com/static/m/images/headImage/77.jpg', Name: '测77', Num: 'M77', OpenID: '77', Award: '0'},
          {Company: '公司测55', CompleteID: '55', HeadImg: 'http://test.baoxianadmin.com/static/m/images/headImage/55.jpg', Name: '测55', Num: 'M55', OpenID: '55', Award: '0'},
          {Company: '公司测111', CompleteID: '111', HeadImg: 'http://test.baoxianadmin.com/static/m/images/headImage/111.jpg', Name: '测111', Num: 'M111', OpenID: '111', Award: '0'},
          {Company: '公司测433', CompleteID: '433', HeadImg: 'http://test.baoxianadmin.com/static/m/images/headImage/433.jpg', Name: '测433', Num: 'M433', OpenID: '433', Award: '0'},
          {Company: '公司测323', CompleteID: '323', HeadImg: 'http://test.baoxianadmin.com/static/m/images/headImage/323.jpg', Name: '测323', Num: 'M323', OpenID: '323', Award: '0'},
          {Company: '公司测63', CompleteID: '63', HeadImg: 'http://test.baoxianadmin.com/static/m/images/headImage/63.jpg', Name: '测63', Num: 'M63', OpenID: '63', Award: '0'},
          {Company: '公司测954', CompleteID: '954', HeadImg: 'http://test.baoxianadmin.com/static/m/images/headImage/954.jpg', Name: '测954', Num: 'M954', OpenID: '954', Award: '0'},
          {Company: '公司测154', CompleteID: '154', HeadImg: 'http://test.baoxianadmin.com/static/m/images/headImage/154.jpg', Name: '测154', Num: 'M154', OpenID: '154', Award: '0'},
          {Company: '公司测121', CompleteID: '121', HeadImg: 'http://test.baoxianadmin.com/static/m/images/headImage/121.jpg', Name: '测121', Num: 'M121', OpenID: '121', Award: '0'},
          {Company: '公司测2325', CompleteID: '2325', HeadImg: 'http://test.baoxianadmin.com/static/m/images/headImage/2325.jpg', Name: '测2325', Num: 'M2325', OpenID: '2325', Award: '0'},
          {Company: '公司测2323', CompleteID: '2323', HeadImg: 'http://test.baoxianadmin.com/static/m/images/headImage/2323.jpg', Name: '测2323', Num: 'M2323', OpenID: '2323', Award: '0'},
          {Company: '公司测2479', CompleteID: '2479', HeadImg: 'http://test.baoxianadmin.com/static/m/images/headImage/2479.jpg', Name: '测2479', Num: 'M2479', OpenID: '2479', Award: '0'},
          {Company: '公司测1346', CompleteID: '1346', HeadImg: 'http://test.baoxianadmin.com/static/m/images/headImage/1346.jpg', Name: '测1346', Num: 'M1346', OpenID: '1346', Award: '0'},
          {Company: '公司测2133', CompleteID: '2133', HeadImg: 'http://test.baoxianadmin.com/static/m/images/headImage/2133.jpg', Name: '测2133', Num: 'M2133', OpenID: '2133', Award: '0'},
          {Company: '公司测1232', CompleteID: '1232', HeadImg: 'http://test.baoxianadmin.com/static/m/images/headImage/1232.jpg', Name: '测1232', Num: 'M1232', OpenID: '1232', Award: '0'},
          {Company: '公司测53', CompleteID: '53', HeadImg: 'http://test.baoxianadmin.com/static/m/images/headImage/53.jpg', Name: '测53', Num: 'M53', OpenID: '53', Award: '0'},
          {Company: '公司测23', CompleteID: '23', HeadImg: 'http://test.baoxianadmin.com/static/m/images/headImage/23.jpg', Name: '测23', Num: 'M23', OpenID: '23', Award: '0'},
          {Company: '公司测964', CompleteID: '964', HeadImg: 'http://test.baoxianadmin.com/static/m/images/headImage/964.jpg', Name: '测964', Num: 'M964', OpenID: '964', Award: '0'},
          {Company: '公司测673', CompleteID: '673', HeadImg: 'http://test.baoxianadmin.com/static/m/images/headImage/673.jpg', Name: '测673', Num: 'M673', OpenID: '673', Award: '0'},
          {Company: '公司测924', CompleteID: '924', HeadImg: 'http://test.baoxianadmin.com/static/m/images/headImage/924.jpg', Name: '测924', Num: 'M924', OpenID: '924', Award: '0'},
          {Company: '公司测803', CompleteID: '803', HeadImg: 'http://test.baoxianadmin.com/static/m/images/headImage/803.jpg', Name: '测803', Num: 'M803', OpenID: '803', Award: '0'},
          {Company: '公司测20', CompleteID: '20', HeadImg: 'http://test.baoxianadmin.com/static/m/images/headImage/20.jpg', Name: '测20', Num: 'M20', OpenID: '20', Award: '0'},
          {Company: '公司测3', CompleteID: '3', HeadImg: 'http://test.baoxianadmin.com/static/m/images/headImage/3.jpg', Name: '测3', Num: 'M3', OpenID: '3', Award: '0'},
          {Company: '公司测83', CompleteID: '83', HeadImg: 'http://test.baoxianadmin.com/static/m/images/headImage/83.jpg', Name: '测83', Num: 'M83', OpenID: '83', Award: '0'},
          {Company: '公司测8', CompleteID: '8', HeadImg: 'http://test.baoxianadmin.com/static/m/images/headImage/8.jpg', Name: '测8', Num: 'M8', OpenID: '8', Award: '0'},
          {Company: '公司测91', CompleteID: '91', HeadImg: 'http://test.baoxianadmin.com/static/m/images/headImage/91.jpg', Name: '测91', Num: 'M91', OpenID: '91', Award: '0'}
        ],
        // 奖项
        type: [
          {value: '9', label: '特等奖', number: '3'},
          {value: '1', label: '一等奖', number: '5'},
          {value: '2', label: '二等奖', number: '12'},
          {value: '3', label: '三等奖', number: '20'},
          {value: '4', label: '参与奖', number: '28'},
          {value: '5', label: '其他', number: ''}
        ]
      }
    }
  },
  // 3.中奖活动页
  lottery: {
    // 回传中奖数据地址
    url: '/postData.php',
    state: {
      // 下载截图
      download: {
        show: false,
        delay: 800
      },
      // 显示右下角参与规则
      rule: {
        show: true,
        img: require('../assets/images/QR-code.jpg'), // 在请求资源路径时，需要require
        html: '<p>活动规则：<br>关注微信公众号“家家365”<br>回复您的员工编号+姓名<br>（如“M0001234王小明”）完成实名认证<br>收到系统回复后即代表进入抽奖名单中</p>'
      },
      // 滚动间隔
      intervalTime: 80,
      // 绑定键盘事件
      keyBand: {
        start: 'Enter',
        stop: 'Space'
      }
    }
  },
  // 4.全局state状态
  state: {
    // 显示背景音乐
    showMusic: true,
    // indexDB名称
    DBname: 'lottery2018',
    // indexDB版本
    DBver: '2',
    // indexDB存储表名称
    storeName: {
      user: 'complete', // 用户
      award: 'type' // 奖项
    }
  }
}

export default config
