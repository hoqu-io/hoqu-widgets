import { Component } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import Input, { InputLabel } from 'material-ui/Input';
import FormControl from 'material-ui/Form/FormControl';
import FormHelperText from 'material-ui/Form/FormHelperText';
import Typography from 'material-ui/Typography';
import IconButton from 'material-ui/IconButton';
import KeyboardArrowDownIcon from 'material-ui-icons/KeyboardArrowDown';
import Menu, { MenuItem } from 'material-ui/Menu';
import { withStyles } from 'material-ui/styles';

const styleSheet = theme => ({
  icon: {
    position: 'absolute',
    right: -6,
    top: 10,
    transition: theme.transitions.create(['transform'], {
      duration: theme.transitions.duration.shorter,
    }),
  },
  iconOpened: {
    transform: 'rotate(180deg)',
  },
  iconClosed: {
    transform: 'rotate(0deg)',
  },
  dropdown: {
    maxHeight: 300,
    overflowY: 'auto',
  },
  item: {
    height: 'auto',
    padding: theme.spacing.unit,
  },
});

class DropDownFieldComponent extends Component {
  static propTypes = {
    classes: PropTypes.object.isRequired,
    label: PropTypes.string,
    options: PropTypes.oneOfType([PropTypes.object, PropTypes.array]).isRequired,
    helperText: PropTypes.string,
    InputProps: PropTypes.object.isRequired,
    disabled: PropTypes.oneOfType([PropTypes.string, PropTypes.bool]),
  };

  state = {
    open: false,
    selectedLabel: '',
  };

  inputRef = null;

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

  handleClickDropDown = () => {
    const { disabled } = this.props;
    if (disabled === true || disabled === 'disabled') {
      return;
    }

    this.setState({ open: true });
  };

  handleClickItem = (index) => {
    const { InputProps: { onChange } } = this.props;
    this.handleClose();
    if (onChange) {
      onChange(index);
    }
  };

  handleClose = () => {
    this.setState({ open: false });
  };

  componentWillReceiveProps(nextProps) {
    if (this.props.InputProps.value !== nextProps.InputProps.value ||
      this.props.options !== nextProps.options) {
      if (Array.isArray(nextProps.options)) {
        const selectedLabel = nextProps.options.includes(nextProps.InputProps.value)
          ? nextProps.InputProps.value
          : '';
        this.setState({ selectedLabel });
      } else {
        const selectedLabel = nextProps.options[nextProps.InputProps.value]
          ? nextProps.options[nextProps.InputProps.value]
          : '';
        this.setState({ selectedLabel });
      }
    }
  }

  render() {
    const { classes, label, InputProps, options, helperText, ...other } = this.props;
    const { name, value, onChange, onFocus, onBlur, ...otherInputProps } = InputProps;
    const { open, selectedLabel } = this.state;

    const iconClasses = classNames(classes.icon, {
      [classes.iconOpened]: open,
      [classes.iconClosed]: !open,
    });

    return (
      <FormControl
        onClick={this.handleClickDropDown}
        {...other}
      >
        {label
          ? <InputLabel shrink={open || value !== ''}>
              {label}
            </InputLabel>
          : null
        }

        <Input
          aria-haspopup="true"
          aria-controls={`${name}-dropdown`}
          value={selectedLabel}
          name={name}
          inputRef={node => {this.inputRef = node;}}
          {...otherInputProps}
        />

        <IconButton
          className={iconClasses}
          onClick={this.handleIconClick}
        >
          <KeyboardArrowDownIcon />
        </IconButton>

        <Menu
          id={`${name}-dropdown`}
          anchorEl={this.inputRef}
          open={open}
          onClose={this.handleClose}
          transformOrigin={{
            vertical: 'top',
            horizontal: 8,
          }}
        >
          {this.parseOptions(options).map(option =>
            <MenuItem
              key={option.value}
              selected={option.value === value}
              onClick={event => this.handleClickItem(option.value)}
              className={classes.item}
            >
              <Typography variant='body2'>
                {option.label}
              </Typography>
            </MenuItem>
          )}
        </Menu>

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

export default withStyles(styleSheet)(DropDownFieldComponent);