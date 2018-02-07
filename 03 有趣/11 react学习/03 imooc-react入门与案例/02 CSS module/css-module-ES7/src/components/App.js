// 原始 css module用法----------------------------------------------------
// import React from 'react';
// import CSSModules from 'react-css-modules';
// import styles from './App.css';

// class Table extends React.Component {
//   render() {
//     return <h1 styleName='title'>
//       Hello World
//     </h1>;
//   }
// }

// export default CSSModules(Table, styles);

// ES7 decorator实现css module语法-----------------------------------------
import React from 'react';
import CSSModules from 'react-css-modules';
import styles from './App.css'; // 普通CSS
import stylesLess from './App.less'; // less


@CSSModules(stylesLess) // 浏览器还不支持decorator语法，需要babel和decorator解析插件
class Table extends React.Component {
  render() {
    return <h1 styleName='title'>
      Hello World
    </h1>;
  }
}

export default Table;
