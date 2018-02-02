
// global config 注意: 所有接口均为mock测试，项目中需要自己替换
const config = {
  // 1.登录页
  login: {
    // 登录请求地址
    url: '/zt_lottery/login',
    // 检测登陆状态
    checkUrl: '/zt_lottery/check_login',
    state: {
      // 当前公司提示语
      msg: '民太安集团年会抽奖系统',
      form: {
        username: 'mta2018',
        trigger: 'blur'
      }
    }
  },
  // 2.加载数据页
  onload: {
    // 获取数据地址
    url: '/zt_lottery/list_member'
  },
  // 3.中奖活动页
  lottery: {
    // 回传中奖数据地址
    url: '/zt_lottery/add',
    state: {
      // 样式
      style: {
        // 主背景图
        bg: { // 在请求资源路径时，需要require
          backgroundImage: `url(${require('../assets/images/background.png')})`,
          backgroundRepeat: 'no-repeat',
          backgroundSize: '100% 100%'
        },
        // 当前抽奖年
        year: {
          show: false,
          img: require('../assets/images/2017.png')
        }
      },
      // 是否需要下载抽奖截图
      download: {
        show: false,
        delay: 800
      },
      // 滚动间隔
      intervalTime: 50,
      // 绑定键盘事件
      keyBand: {
        start: 'Enter',
        stop: 'Space'
      }
    }
  },
  // 4.全局state状态
  state: {
    // indexDB名称
    DBname: 'lottery2018',
    // indexDB版本
    DBver: '2',
    // indexDB存储表名称
    storeName: {
      user: 'user', // 用户
      award: 'type' // 奖项
    },
    // 背景音乐
    music: {
      show: false,
      src: require('../assets/shiji.mp3')
    },
    // 参与规则
    rule: {
      show: true,
      img: require('../assets/images/QR-code.jpg'),
      html: '<p>活动规则：<br>关注微信公众号“家家365”<br>回复您的员工编号+姓名<br>（如“M0001234王小明”）完成实名认证<br>收到系统回复后即代表进入抽奖名单中</p>'
    }
  }
}

export default config
