import React from 'react';
import { PageHeaderWrapper } from '@ant-design/pro-layout';
import './Welcome.less';



export default (): React.ReactNode => (
  <PageHeaderWrapper>
      <div className="warpper">
        {/* <h1>系统声名</h1>
        <p>本网站为个人学习网站,不会涉及任何商业用途!</p>
        <p>本网站源码已经在github上开发,欢迎大家相互讨论,指出不足,共同进步!</p>
        <ul>
          技术相关:
          <li>管理端: ant-design-pro v4(react, ant-design, umi等)</li>
          <li>后端: 阿里云ECS(Nginx 1.18.0) MySQL 5.6.48 think PHP6</li>
          <li>小程序端: uniapp</li>
        </ul> */}
        welcome to my website
      </div>
  </PageHeaderWrapper>
);
