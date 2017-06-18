import React from 'react';
import cssModules from 'react-css-modules';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';
import PropTypes from 'prop-types';
import { fullUrl, emailText } from './guestInviteDrawerUtils';
import { isEvent } from '../../util/commonPropTypes';

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
  event: () => { console.log('event prop validation not set!'); },
};

GuestInviteDrawerActions.propTypes = {
  event: isEvent,
  focusUrlTextField: PropTypes.func,
  handleCopyButtonClick: PropTypes.func,
  handleSendEmail: PropTypes.func,
};

export default cssModules(GuestInviteDrawerActions, styles);
