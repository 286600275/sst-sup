// /*
// 用于服务端配置
//  */
// const devConfig = {
//   host: "10.0.13.129",
//   port: 6379,
//   db: 4,
//   prefix: "insur_session_id",
//   ttl: 60 * 60 * 24 * 30
// };
// const testConfig = {
//   host: "10.0.13.199",
//   port: 6379,
//   db: 4,
//   prefix: "insur_session_id",
//   ttl: 60 * 60 * 24 * 30
// };
// const productionConfig = {
//   host: "r-2zed1b1e0407ce24.redis.rds.aliyuncs.com",
//   port: 6379,
//   prefix: "insur_session_id",
//   db: 4,
//   pass: "Rsdd09877890"
// };
// var config = null;
// //配置config中可以暴露的字段 
// var REL_NODE_ENV = process.env.REL_NODE_ENV || 'dev';
// switch (REL_NODE_ENV) {
//   case 'dev':
//     config = devConfig;
//     break;
//   case 'test':
//     config = testConfig;
//     break;
//   case 'production':
//     config = productionConfig;
//     break;
//   default:
//     config = devConfig;
// }
// module.exports = config