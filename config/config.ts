// https://umijs.org/config/
import { defineConfig } from 'umi';
import defaultSettings from './defaultSettings';
import proxy from './proxy';

const { REACT_APP_ENV } = process.env;

export default defineConfig({
  hash: true,
  antd: {},
  dva: {
    hmr: true,
  },
  locale: {
    // default zh-CN
    default: 'zh-CN',
    // default true, when it is true, will use `navigator.language` overwrite default
    antd: true,
    baseNavigator: true,
  },
  dynamicImport: {
    loading: '@/components/PageLoading/index',
  },
  targets: {
    ie: 11,
  },
  // umi routes: https://umijs.org/docs/routing
  routes: [
    {
      path: '/user',
      // component: '', 不使用默认头部和底部,
      routes: [
        {
          name: 'login',
          path: '/user/login',
          component: './user/klintLogin',
          wrappers: ['@/wrappers/backLogin'],
        }
      ],
    },
    {
      path: '/',
      component: '../layouts/SecurityLayout',
      routes: [
        {
          path: '/',
          component: '../layouts/BasicLayout',
          authority: ['admin', 'user'],
          wrappers: ['@/wrappers/auth'],
          routes: [
            {
              path: '/',
              redirect: '/welcome',
            },
            {
              path: '/welcome',
              name: 'welcome',
              icon: 'SoundOutlined',
              component: './Welcome',
            },
            {
              path: '/admin',
              name: 'admin',
              icon: 'crown',
              component: './Administrator/Admin',
              authority: ['admin'],
              routes: [
                {
                  path: '/admin/sub-page',
                  name: 'sub-page',
                  icon: 'UserOutlined',
                  component: './Welcome',
                  authority: ['admin'],
                }
              ],
            },
            {
              path: '/productList',
              name: 'productList',
              icon: 'table',
              component: './ProductList'
            },
            {
              path: '/hookTest',
              name: 'hookTest',
              component: './HookTest',
              icon: 'table'
            },
           {
              path: '/hooks',
              name: 'hooks',
              icon: 'table',
              component: './Hooks'
            },
            {
              path: '/route',
              name: 'route',
              icon: 'crown',
              component: './Route',
              routes: [
                {
                  path: '/',
                  redirect: './first',
                },
                {
                  path: '/route/first',
                  component: './Route/RouteFirst',
                },
                {
                  path: '/route/second',
                  component: './Route/RouteSecond'
                },
                {
                  path: '/route/last',
                  component: './Route/RouteLast'
                }
              ]

            },
            {
              path: '/callbackRender',
              name: 'callbackRender',
              component: './callbackRender',
              icon: 'table',
            },
            {
              path: '/antV',
              name: 'antV',
              // component: './callbackRender',
              icon: 'table',
              routes: [
                {
                  path: '/antV/g2',
                  component: './AntV/G2',
                  name: 'G2'
                },
              ]
            },
            {
              path: '/Administrator/accountDetail',
              component: './Administrator/accountDetail'
            },
            {
              component: './404',
            },
          ],
        },
        {
          component: './404',
        },
      ],
    },
    {
      component: './404',
    },
  ],
  // Theme for antd: https://ant.design/docs/react/customize-theme-cn
  theme: {
    // ...darkTheme,
    'primary-color': defaultSettings.primaryColor,
  },
  // @ts-ignore
  title: false,
  ignoreMomentLocale: true,
  proxy: proxy[REACT_APP_ENV || 'dev'],
  manifest: {
    basePath: '/',
  },
});
