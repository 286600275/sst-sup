 /*
 用于服务端配置
  */
 const devConfig = {
   env: "dev",
   apiPath: "https://api.shoushoutao.cn/supplier/v1/web"
   // apiPath: "http://127.0.0.1:23099/supplier/v1/web"
   // apiPath: "http://api.sst.test/supplier/v1/web"
 };
 const testConfig = {
   env: "test",
   apiPath: "https://api.shoushoutao.cn/supplier/v1/web"
 };
 const productionConfig = {
   env: "production",
   apiPath: "https://api.shoushoutao.com/supplier/v1/web"
 };
 //配置config中可以暴露的字段
 const publicKeys = ['env'];
 var config = null;
 export const getEnvConfig = () => {
   if (config) return config;
   var REL_NODE_ENV = process.env.REL_NODE_ENV || 'dev';
   // var REL_NODE_ENV = 'dev';
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
   config.publicKeys = publicKeys;
   // 
   return config;
 };