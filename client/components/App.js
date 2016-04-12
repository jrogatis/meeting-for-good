import React from 'react';
import CSSModules from 'react-css-modules';

import Navbar from './Navbar';

import styles from '../styles/main';

const App = (props) => (
  <div>
    <Navbar />
    <main styleName="main">
      {props.children}
    </main>
  </div>
);

App.propTypes = {
  children: React.PropTypes.element,
};

export default CSSModules(App, styles);
