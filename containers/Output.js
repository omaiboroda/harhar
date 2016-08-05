import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import FlatButton from 'material-ui/lib/flat-button';
import FontIcon from 'material-ui/lib/font-icon';
import Clipboard from 'clipboard';
import LinearProgress from 'material-ui/lib/linear-progress';
import styles from './Output.less';

class Output extends Component {
  render() {
    const { url, isFetching } = this.props;
    return (
      <div>
        <div className={styles.progress}>
          {isFetching && <LinearProgress mode="indeterminate" />}
        </div>
        {
          url
          ? (
            <div>
              <span id="url">{url}</span>

              <FlatButton
                ref={(icon) => icon && new Clipboard(icon.getDOMNode())}
                icon={<FontIcon className={`${styles.icon} material-icons`}>content_copy</FontIcon>}
                data-clipboard-target="#url"
                style={{minWidth: 40}}
              />
              <FlatButton
                linkButton
                target="_blank"
                href={url}
                style={{minWidth: 40, textAlign: 'center'}}
                icon={<FontIcon className={`${styles.icon} material-icons`}>open_in_new</FontIcon>}
              />
            </div>
          )
          : null
        }
      </div>
    );
  }
}

Output.propTypes = {
  url: PropTypes.string.isRequired,
  isFetching: PropTypes.bool,
};

function mapStateToProps(state) {
  const { url: { url, isFetching } } = state;
  return {
    url,
    isFetching,
  };
}

export default connect(mapStateToProps)(Output);
