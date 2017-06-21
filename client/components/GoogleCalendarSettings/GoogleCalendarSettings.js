import React, { Component } from 'react';
import cssModules from 'react-css-modules';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import RaisedButton from 'material-ui/RaisedButton';
import PropTypes from 'prop-types';
import autobind from 'autobind-decorator';
import { Table, TableBody, TableHeader, TableHeaderColumn, TableRow, TableRowColumn } from 'material-ui/Table';

import { isCurUser } from '../../util/commonPropTypes';

const inlineStyles = {
  modal: {
    title: { backgroundColor: '#006400', color: '#ffffff', fontSize: '25px', height: '25px', paddingTop: 6 },
    content: { width: '310px', maxWidth: '310px', minWidth: '310px' },
    bodyStyle: { minHeight: '260px', paddingTop: 10 },
  },
};
class GoogleCalendarSettings extends Component {
  @autobind
  static dialogActions(cbToggleCalSetDialog) {
    return [
      <FlatButton label="Cancel" primary onTouchTap={cbToggleCalSetDialog} />,
      <FlatButton label="Save" primary onTouchTap={cbToggleCalSetDialog} />,
    ];
  }

  constructor(props) {
    super(props);
    this.state = {
      openModalCalSet: false,
    };
  }

  componentWillMount() {
    const { openModalCalSet } = this.props;
    this.setState({ openModalCalSet });
  }

  componentWillReceiveProps(nextProps) {
    const { openModalCalSet } = nextProps;
    this.setState({ openModalCalSet });
  }

  @autobind
  handleDialogClose() {
    this.props.cbToggleCalSetDialog();
  }

  renderTableRows() {
    return (
      <TableRow selected>
        <TableRowColumn>1</TableRowColumn>
      </TableRow>
    );
  }

  renderTable() {
    return (
      <Table
        fixedHeader
        selectable
        multiSelectable
      >
        <TableHeader
          displaySelectAll
          adjustForCheckbox
          enableSelectAll
        >
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
        titleStyle={inlineStyles.modal.title}
        contentStyle={inlineStyles.modal.content}
        bodyStyle={inlineStyles.modal.bodyStyle}
        title="Wich calendars to use ? "
        modal
        open={this.props.openModalCalSet}
        actions={dialogActions(this.handleDialogClose)}
        styleName="GoogleCalendarDialog"
      >
        {this.renderTable()}
      </Dialog>
    );
  }
}

GoogleCalendarSettings.defaultProps = {
  curUser: () => { console.log('curUser prop validation not set!'); },
};

GoogleCalendarSettings.propTypes = {
  // curUser: isCurUser,
  cbToggleCalSetDialog: PropTypes.func.isRequired,
  openModalCalSet: PropTypes.bool.isRequired,
};

export default GoogleCalendarSettings;
