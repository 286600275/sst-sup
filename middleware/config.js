/**
 * 管理界面 路由以及前端权限控制
 */
import { getEnvConfig } from '~/config/config'
export default function(context) {
  if (!process.server) return;
  context.store.state.apiPath = getEnvConfig().apiPath;
  context.store.state.env = getEnvConfig().env;
}