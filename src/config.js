const dev = {
  baseUrl: 'http://152.136.182.96:5037/', // 原地址
  // baseUrl: 'http://172.16.115.199:5036/', // 原地址--更换郭飞给的，没有给其他服务器
  // baseUrl: 'http://172.16.115.59:5031/', // 凯总地址
  // baseUrl: 'http://172.16.116.191:5031/', // 郭飞地址
  // baseUrl: 'http://10.160.28.153:5031/', // 郭飞地址

  jumpUrl: 'http://10.131.101.56:88/patient-panorama.html' // 全景图跳转
}
const test = {
  baseUrl: 'http://172.16.119.102:5031/'
}
const production = {
  baseUrl: '',
  baseUrl2: ''
}
console.log(dev, test, production)

export default dev
