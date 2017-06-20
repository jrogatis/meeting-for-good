import React, { Component } from 'react';
import cssModules from 'react-css-modules';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import RaisedButton from 'material-ui/RaisedButton';
import PropTypes from 'prop-types';
import autobind from 'autobind-decorator';
import { Table, TableBody, TableHeader, TableHeaderColumn, TableRow, TableRowColumn } from 'material-ui/Table';


import { isCurUser } from '../../util/commonPropTypes';

class GoogleCalendarManager extends Component {
  @autobind
  static dialogActions(handleClose) {
    return [
      <FlatButton label="Cancel" primary onTouchTap={handleClose} />,
      <FlatButton label="Save" primary onTouchTap={handleClose} />,
    ];
  }

  constructor(props) {
    super(props);
    this.state = {
      openDialogGoogleCalendar: false,
    };
  }

  componentWillMount() {
    const { openDialogGoogleCalendar } = this.props;
    this.setState({ openDialogGoogleCalendar });
  }

  componentWillReceiveProps(nextProps) {
    const { openDialogGoogleCalendar } = nextProps;
    this.setState({ openDialogGoogleCalendar });
  }

  @autobind
  handleDialogClose() {
    this.setState({ openDialogGoogleCalendar: false });
  }

  renderTableRows() {
    return (
      <TableRow selected>
        <TableRowColumn>1</TableRowColumn>
      </TableRow>
    );
  }

  rendertTable() {
    return (
      <Table>
        <TableHeader>
          <TableRow>
            <TableHeaderColumn>Calendar</TableHeaderColumn>
          </TableRow>
        </TableHeader>
        <TableBody>
          {this.renderTableRows()}
        </TableBody>
      </Table>
    );
  }

  render() {
    const { dialogActions } = this.constructor;
    return (
      <Dialog
        title="Your Calendar Settings"
        modal
        open={this.state.openDialogGoogleCalendar}
        actions={dialogActions(this.handleDialogClose)}
      >
        {this.rendertTable()}
      </Dialog>
    );
  }
}

GoogleCalendarManager.defaultProps = {
  curUser: () => { console.log('curUser prop validation not set!'); },
};

GoogleCalendarManager.propTypes = {
  curUser: isCurUser,
  openDialogGoogleCalendar: PropTypes.bool.isRequired,
};

export default GoogleCalendarManager;
