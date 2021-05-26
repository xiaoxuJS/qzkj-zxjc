

import {
  createGlobalStyle
} from 'styled-components';

export const IconfontStyle = createGlobalStyle`
@font-face {
  font-family: 'iconfont';  /* Project id 2554261 */
  src: url('//at.alicdn.com/t/font_2554261_agpm76oq67.woff2?t=1621300558498') format('woff2'),
       url('//at.alicdn.com/t/font_2554261_agpm76oq67.woff?t=1621300558498') format('woff'),
       url('//at.alicdn.com/t/font_2554261_agpm76oq67.ttf?t=1621300558498') format('truetype');
}
.iconfont {
  font-family: "iconfont" !important;
  font-size: 16px;
  font-style: normal;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}
.icon-user:before {
  content: "\\e614";
}

.icon-LED:before {
  content: "\\e622";
}

.icon-yuanliaocangfengbao:before {
  content: "\\e600";
}

.icon-yipaiche:before {
  content: "\\e601";
}

.icon-dingdan:before {
  content: "\\e787";
}

.icon-menjindukaqi:before {
  content: "\\e671";
}

`

