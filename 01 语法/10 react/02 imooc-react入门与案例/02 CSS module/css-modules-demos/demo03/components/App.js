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
import styles from './App.css';

@CSSModules(styles)
class Table extends React.Component {
  render() {
    return <h1 styleName='title'>
      Hello World
    </h1>;
  }
}

export default Table;
