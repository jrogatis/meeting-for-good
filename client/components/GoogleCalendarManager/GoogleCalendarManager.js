import React, { Component } from 'react';
import cssModules from 'react-css-modules';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import RaisedButton from 'material-ui/RaisedButton';
import PropTypes from 'prop-types';
import autobind from 'autobind-decorator';

import { isCurUser } from '../../util/commonPropTypes';

class GoogleCalendarManager extends Component() {

  static dialogActions(handleClose) { 
    return [
      <FlatButton label="Cancel" primary onTouchTap={() => handleClose()} />,
      <FlatButton label="Save" primary onTouchTap={() => handleClose()} />,
    ];
  }

  constructor(props) {
    super(props);
    this.state = {
      openDialog: false,
    };
  }

  @autobind
  handleDialogClose() {
    this.setState({ openDialog: false });
  }

  render() {
    const { dialogActions } = this.constructor;
    return (
      <Dialog
        title=" Your Calendar Settings"
        modal
        open={this.state.openDialog}
        actions={dialogActions(this.handleDialogClose)}
      >
        bla
      </Dialog>
    );
  }
}

GoogleCalendarManager.defaultProps = {
  curUser: () => { console.log('curUser prop validation not set!'); },
};

GoogleCalendarManager.propTypes = {
  curUser: isCurUser,
};

export default GoogleCalendarManager;
