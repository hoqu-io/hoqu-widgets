import { Component } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import Input, { InputLabel } from 'material-ui/Input';
import FormControl from 'material-ui/Form/FormControl';
import Radio, { RadioGroup } from 'material-ui/Radio';
import FormHelperText from 'material-ui/Form/FormHelperText';
import FormControlLabel from 'material-ui/Form/FormControlLabel';
import { withStyles } from 'material-ui/styles';

const styleSheet = theme => ({
  item: {
    height: 'auto',
  },
  group: {
    flexDirection: 'row',
    position: 'relative',
    top: theme.spacing.unit * 2,
  },
});

class RadioSwitchFieldComponent extends Component {
  static propTypes = {
    classes: PropTypes.object.isRequired,
    label: PropTypes.string,
    options: PropTypes.oneOfType([PropTypes.object, PropTypes.array]).isRequired,
    helperText: PropTypes.string,
    InputProps: PropTypes.object.isRequired,
    disabled: PropTypes.oneOfType([PropTypes.string, PropTypes.bool]),
  };

  parseOptions(options) {
    let parsed = [];
    if (Array.isArray(options)) {
      parsed = options.map((val, index) => (
        {
          value: val + '',
          label: val + '',
        }
      ));
    } else {
      parsed = Object.keys(options).map(value => (
      {
        value,
        label: options[value] + '',
      }
      ));
    }

    return parsed.sort((a, b) => {
      if (a.label.toLowerCase() > b.label.toLowerCase()) {
        return 1;
      }

      if (a.label.toLowerCase() < b.label.toLowerCase()) {
        return -1;
      }

      return 0;
    });
  }

  handleChange = (event, value) => {
    const { InputProps: { onChange } } = this.props;
    if (onChange) {
      onChange(value);
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
        {label
          ? <InputLabel shrink={true}>
              {label}
            </InputLabel>
          : null
        }

        <RadioGroup
          value={value}
          name={name}
          className={classes.group}
          onChange={this.handleChange}
          {...otherInputProps}
        >
          {this.parseOptions(options).map(option =>
            <FormControlLabel
              value={option.value}
              control={<Radio />}
              label={option.label}
              key={option.value}
              className={classes.item}
            />
          )}
        </RadioGroup>

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

export default withStyles(styleSheet)(RadioSwitchFieldComponent);