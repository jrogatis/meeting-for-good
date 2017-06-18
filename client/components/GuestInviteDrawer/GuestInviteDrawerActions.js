import React from 'react';
import cssModules from 'react-css-modules';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';
import PropTypes from 'prop-types';
import { fullUrl, emailText } from './guestInviteDrawerUtils';

import styles from './guest-invite.css';

const GuestInviteDrawerActions = (props) => {
  const { event, focusUrlTextField, handleCopyButtonClick, handleSendEmail } = props;

  return (
    <div>
      <TextField
        id="fullUrl"
        styleName="textUrl"
        value={fullUrl(event)}
        underlineShow={false}
        fullWidth
        label="Full Url"
        ref={focusUrlTextField}
        aria-label="Full Url"
      />
      <div styleName="Row">
        <RaisedButton
          styleName="copyAndEmailButton"
          className="cpBtn"
          primary
          onTouchTap={handleCopyButtonClick}
          label="Copy Link"
        />
        <RaisedButton
          styleName="copyAndEmailButton"
          label="Send Email Invite"
          primary
          onClick={ev => handleSendEmail(ev)}
          href={`mailto:?subject=Share your availability for ${event.name}&body=${emailText(event)}`}
        />
      </div>
    </div>
  );
};

GuestInviteDrawerActions.defaultProps = {
  focusUrlTextField: () => { console.log('focusUrlTextField func not passed in!'); },
  handleCopyButtonClick: () => { console.log('handleCopyButtonClick func not passed in!'); },
  handleSendEmail: () => { console.log('handleSendEmail func not passed in!'); },
};

GuestInviteDrawerActions.propTypes = {
  event: PropTypes.shape({
    _id: PropTypes.string,
    name: PropTypes.string,
    owner: PropTypes.string,
    active: PropTypes.bool,
    selectedTimeRange: PropTypes.array,
    dates: PropTypes.arrayOf(PropTypes.shape({
      fromDate: PropTypes.string,
      toDate: PropTypes.string,
      _id: PropTypes.string,
    })),
    participants: PropTypes.arrayOf(PropTypes.shape({
      userId: PropTypes.shape({
        id: PropTypes.string,
        avatar: PropTypes.string,
        name: PropTypes.string,
        emails: PropTypes.arrayOf(PropTypes.string),
      }),
      _id: PropTypes.string,
      status: PropTypes.oneOf([0, 1, 2, 3]),
      emailUpdate: PropTypes.bool,
      ownerNotified: PropTypes.bool,
      availability: PropTypes.arrayOf(PropTypes.arrayOf(PropTypes.string)),
    })),
  }).isRequired,
  focusUrlTextField: PropTypes.func,
  handleCopyButtonClick: PropTypes.func,
  handleSendEmail: PropTypes.func,
};

export default cssModules(GuestInviteDrawerActions, styles);
