import { Component } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import Input, { InputLabel } from 'material-ui/Input';
import FormControl from 'material-ui/Form/FormControl';
import Checkbox from 'material-ui/Checkbox';
import FormHelperText from 'material-ui/Form/FormHelperText';
import FormControlLabel from 'material-ui/Form/FormControlLabel';
import { withStyles } from 'material-ui/styles';

const styleSheet = theme => ({
  item: {
    height: 'auto',
  },
});

class CheckboxFieldComponent extends Component {
  static propTypes = {
    classes: PropTypes.object.isRequired,
    label: PropTypes.string,
    helperText: PropTypes.string,
    InputProps: PropTypes.object.isRequired,
    disabled: PropTypes.oneOfType([PropTypes.string, PropTypes.bool]),
  };

  handleChange = (event, checked) => {
    const { InputProps: { onChange } } = this.props;
    if (onChange) {
      onChange(checked);
    }
  };

  render() {
    const { classes, label, InputProps, options, helperText, ...other } = this.props;
    const { name, value, onChange, onFocus, onBlur, ...otherInputProps } = InputProps;

    return (
      <FormControl
        component="fieldset"
        {...other}
      >
        <FormControlLabel
          control={
            <Checkbox
              checked={value}
              onChange={this.handleChange}
              value={name}
            />
          }
          label={label}
          className={classes.item}
        />

        {helperText
          ? <FormHelperText>
              {helperText}
            </FormHelperText>
          : null
        }
      </FormControl>
    );
  }
}

export default withStyles(styleSheet)(CheckboxFieldComponent);