import { connect } from 'react-redux';
import { changeAndValidateHar, upload } from '../actions';

import React, { Component, PropTypes } from 'react';
import TextField from 'material-ui/lib/text-field';

class Input extends Component {
  constructor(props) {
    super(props);
    this.onChange = this.onChange.bind(this);
  }


  componentWillReceiveProps(nextProps) {
    if (!this.props.isValid && nextProps.isValid && nextProps.value !== '') {
      const { dispatch, value } = nextProps;
      dispatch(upload(value));
    }
  }

  onChange(e) {
    this.props.dispatch(changeAndValidateHar(e.target.value));
  }

  render() {
    const { value, isValid } = this.props;
    return (
      <TextField
        multiLine
        rowsMax={5}
        value={value}
        errorText={!isValid && 'Invalid HAR'}
        ref={(input) => input && input.focus()}
        onChange={this.onChange}
      />
    );
  }
}

Input.propTypes = {
  value: PropTypes.string.isRequired,
  isValid: PropTypes.bool,
};

function mapStateToProps(state, props) {
  const { har: { value, isValid } } = state;

  return {
    isValid,
    value,
  };
}

export default connect(mapStateToProps)(Input);
