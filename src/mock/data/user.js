import Mock from 'mockjs';

// 静态写死的模拟数据
const LoginUsers = [
  {
    id: 1,
    username: 'admin',
    password: '123456',
    // avatar: 'https://raw.githubusercontent.com/taylorchen709/markdown-images/master/vueadmin/user.png',
    avatar: '/static/userdata/user.png',
    name: '张某某'
  }
];

const Users = [];

// 使用mockjs模拟数据生成一部分数据
for (let i = 0; i < 86; i++) {
  Users.push(Mock.mock({
    id: Mock.Random.guid(), // 生成guid
    name: Mock.Random.cname(), // 生成中文姓名
    addr: Mock.mock('@county(true)'), // 生成地址
    'age|18-60': 1,
    birth: Mock.Random.date(),// 生成生日
    sex: Mock.Random.integer(0, 1)// 生成性别
  }));
}

export { LoginUsers, Users };
