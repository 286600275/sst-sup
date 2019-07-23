/*
用于服务端配置
 */
const devConfig = {
  env: "dev",
  scApiServer: "http://10.0.13.127",
  bizApiServer: "http://10.0.13.127",
  commonApiServer: "https://dev-api.ieyecloud.com",
};
const testConfig = {
  env: "test",
  scApiServer: "http://10.0.13.199",
  bizApiServer: "http://10.0.13.199",
  commonApiServer: "https://test-api.ieyecloud.com",
};
const productionConfig = {
  env: "production",
  scApiServer: "http://sc.ieyecloud.com",
  bizApiServer: "http://biz.ieyecloud.com",
  commonApiServer: "https://api.ieyecloud.com",
};
var config = null;
//配置config中可以暴露的字段 
var REL_NODE_ENV = process.env.REL_NODE_ENV || 'dev';
switch (REL_NODE_ENV) {
  case 'dev':
    config = devConfig;
    break;
  case 'test':
    config = testConfig;
    break;
  case 'production':
    config = productionConfig;
    break;
  default:
    config = devConfig;
}
module.exports = config