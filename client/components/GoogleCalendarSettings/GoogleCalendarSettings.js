import React, { Component } from 'react';
// import cssModules from 'react-css-modules';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import _ from 'lodash';
import jsonpatch from 'fast-json-patch';
// import RaisedButton from 'material-ui/RaisedButton';
import PropTypes from 'prop-types';
import autobind from 'autobind-decorator';
import { Table, TableBody, TableHeader, TableHeaderColumn, TableRow, TableRowColumn } from 'material-ui/Table';

import { listCalendars } from '../../util/calendar';
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
  static dialogActions(cbToggleCalSetDialog, handleSaveSetings) {
    return [
      <FlatButton label="Cancel" primary onTouchTap={cbToggleCalSetDialog} />,
      <FlatButton label="Save" primary onTouchTap={handleSaveSetings} />,
    ];
  }

  static async calendarsLoad() {
    try {
      const listCal = await listCalendars();
      return listCal;
    } catch (err) {
      console.log('err at CalendarsLoad', err);
      return null;
    }
  }

  constructor(props) {
    super(props);
    this.state = {
      openModalCalSet: false,
      listCal: [],
      selectedCal: [],
    };
  }

  async componentWillMount() {
    const { openModalCalSet } = this.props;
    console.log(this.props.curUser);
    const listCal = await this.constructor.calendarsLoad();
    this.setState({ openModalCalSet, listCal: listCal.items });
  }

  componentWillReceiveProps(nextProps) {
    const { openModalCalSet } = nextProps;
    this.setState({ openModalCalSet });
  }

  @autobind
  handleDialogClose() {
    this.props.cbToggleCalSetDialog();
  }

  @autobind
  handleCellClick(rowIndex) {
    const { selectedCal, listCal } = this.state;
    const nSelectedCal = _.cloneDeep(selectedCal);
    if (!selectedCal.includes(listCal[rowIndex].id)) {
      nSelectedCal.push(listCal[rowIndex].id);
    } else {
      _.pull(nSelectedCal, listCal[rowIndex].id);
    }
    this.setState({ selectedCal: nSelectedCal });
  }

  @autobind
  handleSaveSetings() {
    const { selectedCal } = this.state;
    console.log(selectedCal);
    const { curUser } = this.props;
    const nCurUser = _.cloneDeep(curUser);
    const observeCurUser = jsonpatch.observe(nCurUser);
    nCurUser.selectedCalendarsIds = [];
    const patchForDelete = jsonpatch.generate(observeCurUser);
    nCurUser.selectedCalendarsIds = selectedCal;
    const patchesForAdd = jsonpatch.generate(observeCurUser);
    const patches = _.concat(patchForDelete, patchesForAdd);
    console.log(patches);
  }

  renderTableRows() {
    const { listCal, selectedCal } = this.state;
    if (listCal.length === 0) return null;
    const rows = [];
    listCal.forEach((calendar) => {
      const calTitle = (calendar.primary) ? 'Primary' : calendar.summary;
      rows.push(
        <TableRow key={calendar.id} selected={selectedCal.includes(calendar.id)}>
          <TableRowColumn>{calTitle}</TableRowColumn>
        </TableRow>,
      );
    });
    const result = (<TableBody> {rows} </TableBody>);
    return result;
  }

  renderTable() {
    const inlineStyles = { TableHeaderColumn: { fontSize: '18px' } };
    return (
      <Table fixedHeader selectable multiSelectable onCellClick={this.handleCellClick}>
        <TableHeader displaySelectAll={false} adjustForCheckbox enableSelectAll >
          <TableRow>
            <TableHeaderColumn style={inlineStyles.TableHeaderColumn}>Calendars</TableHeaderColumn>
          </TableRow>
        </TableHeader>
        {this.renderTableRows()}
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
        actions={dialogActions(this.handleDialogClose, this.handleSaveSetings)}
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
  curUser: isCurUser,
  cbToggleCalSetDialog: PropTypes.func.isRequired,
  openModalCalSet: PropTypes.bool.isRequired,
};

export default GoogleCalendarSettings;
