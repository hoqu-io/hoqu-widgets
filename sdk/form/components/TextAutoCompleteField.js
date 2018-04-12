import { Component } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import Input, { InputLabel } from 'material-ui/Input';
import FormControl from 'material-ui/Form/FormControl';
import FormHelperText from 'material-ui/Form/FormHelperText';
import Paper from 'material-ui/Paper';
import Grid from 'material-ui/Grid';
import Chip from 'material-ui/Chip';
import Divider from 'material-ui/Divider';
import Collapse from 'material-ui/transitions/Collapse';
import IconButton from 'material-ui/IconButton';
import KeyboardArrowDownIcon from 'material-ui-icons/KeyboardArrowDown';
import List, { ListItem } from 'material-ui/List';
import { red } from 'material-ui/colors';
import { withStyles } from 'material-ui/styles';

const styleSheet = theme => ({
  chip: {
    margin: theme.spacing.unit / 2,
  },
  chips: {
    marginTop: theme.spacing.unit / 2,
    marginBottom: -theme.spacing.unit / 2,
  },
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
    position: 'absolute',
    zIndex: 1600,
    top: 52,
    display: 'none',
    maxHeight: 300,
    overflowY: 'auto',
  },
  open: {
    display: 'block',
  },
  dropdownItem: {
    paddingTop: theme.spacing.unit / 4,
    paddingBottom: theme.spacing.unit / 4,
  },
  wrongInput: {
    color: red[400],
  },
});

class TextAutoCompleteFieldComponent extends Component {
  static propTypes = {
    classes: PropTypes.object.isRequired,
    options: PropTypes.oneOfType([PropTypes.array, PropTypes.object]).isRequired,
    delimiter: PropTypes.string,
    add: PropTypes.bool.isRequired,
    multi: PropTypes.bool.isRequired,
    onlyNew: PropTypes.bool.isRequired,
    InputProps: PropTypes.object.isRequired,
  };

  static defaultProps = {
    delimiter: '.',
    add: false,
    multi: false,
    onlyNew: false,
  };

  state = {
    anchorEl: null,
    open: false,
    hasVariants: false,
    canBeAdded: false,
    canBeChoosen: false,
    filter: '',
    variants: {},
    matched: {},
  };

  inputRef = null;
  isInputFocused = false;
  isOnDropdown = false;

  handleFocus = event => {
    this.isInputFocused = true;
    if (!this.state.open) {
      this.setState({open: true, anchorEl: event.currentTarget});
      this.filterVariants(this.state.filter);
    }
  };

  handleChange = event => {
    const { multi } = this.props;
    const value = event.target.value;

    this.filterVariants(value);
    if (!multi) {
      this.setValue(value)
    }
  };

  handleKeyDown = event => {
    const { multi } = this.props;
    const { canBeAdded, canBeChoosen, filter } = this.state;
    if (event.keyCode === 13) {
      event.preventDefault();
      if (multi && (canBeChoosen || canBeAdded)) {
        this.addValue(filter);
        this.filterVariants('');
        this.isOnDropdown = false;
      }
    }
  };

  handleClickItem = (value, isFinal) => {
    const { multi, delimiter } = this.props;

    if (!isFinal) {
      this.focusFilter();
      if (!multi) {
        this.setValue(value);
      }
      return this.filterVariants(value + delimiter);
    }

    if (multi) {
      this.addValue(value);
      this.filterVariants('');
    } else {
      this.focusFilter();
      this.setValue(value);
      this.setState({ canBeChoosen: true });
    }
    this.closeDropDown();
  };

  handleRemoveItem = (value) => {
    this.removeValue(value);
    this.filterVariants(this.state.filter);
  };

  handleBlur = () => {
    this.isInputFocused = false;
    if (!this.isOnDropdown) {
      this.closeDropDown();
    }
  };

  handleIconClick = () => {
    if (this.state.open) {
      this.closeDropDown();
    } else {
      this.focusFilter();
    }
  };

  handleIconMouseOver = () => {
    this.isOnDropdown = true;
  };

  handleIconMouseOut = () => {
    this.isOnDropdown = false;
  };

  handleDropDownMouseOver = event => {
    this.isOnDropdown = true;
    this.focusFilter();
  };

  handleDropDownMouseOut = event => {
    this.isOnDropdown = false;
    setTimeout(() => {
      if (!this.isInputFocused) {
        this.closeDropDown();
      }
    }, 10);
  };

  focusFilter() {
    if (this.inputRef) {
      this.inputRef.focus();
    }
  }

  closeDropDown() {
    this.isOnDropdown = false;
    this.setState({open: false});
  }

  filterVariants(filter) {
    const { options, delimiter, add, onlyNew } = this.props;
    let canBeAdded = add && filter !== '' && !this.isValueAlreadyAdded(filter);
    let canBeChoosen = false;

    const matched = Object.keys(options).reduce((matched, key) => {
      const option = typeof key === 'number' ? options[key] : key;
      if (filter === key || filter === options[key]) {
        canBeAdded = false;
        canBeChoosen = !this.isValueAlreadyAdded(filter);
      }
      if (!onlyNew &&
        filter !== '' &&
        (
          option.toLowerCase().includes(filter.toLowerCase()) ||
          options[key].toLowerCase().includes(filter.toLowerCase())
        ) &&
        !matched[option] &&
        !this.isValueAlreadyAdded(option)
      ) {
        matched[option] = { label: options[key], final: true };
      }
      return matched;
    }, {});

    const filterLevelValues = filter.split(delimiter);
    const level = filterLevelValues.length - 1;
    const filterPrefix = level
      ? filterLevelValues
        .slice(0, level)
        .join(delimiter)
      : '';
    const filterLevelValue = filterLevelValues[level];

    const variants = Object.keys(options).reduce((variants, key) => {
      const option = typeof key === 'number' ? options[key] : key;
      const optionLevelValues = option.split(delimiter);
      if (optionLevelValues.length <= level) {
        return variants;
      }

      const optionPrefix = level
        ? optionLevelValues
          .slice(0, level)
          .join(delimiter)
        : '';
      const optionLevelValue = optionLevelValues[level];

      if (filterPrefix === optionPrefix &&
        (filterLevelValue === '' ||
          optionLevelValue.toLowerCase().includes(filterLevelValue.toLowerCase()) ||
          (optionPrefix === '' && options[key].toLowerCase().includes(filterLevelValue.toLowerCase()))
        )
      ) {
        const optionKey = level
          ? [optionPrefix, optionLevelValue].join(delimiter)
          : optionLevelValue;
        const isOptionFinal = optionLevelValues.length - 1 === level;
        const optionLabel = isOptionFinal
          ? options[key]
          : `${options[key]}...`;
        if (!variants[optionKey] &&
          !matched[optionKey] &&
          !this.isValueAlreadyAdded(optionKey) &&
          !(onlyNew && isOptionFinal)
        ) {
          variants[optionKey] = { label: optionLabel, final: isOptionFinal };
        }
      }
      return variants;
    }, {});

    const hasVariants = canBeAdded || Object.keys(matched).length || Object.keys(variants).length;

    this.setState({
      hasVariants,
      canBeAdded,
      canBeChoosen,
      filter,
      matched,
      variants,
    });
  }

  isValueAlreadyAdded(value) {
    const { multi, InputProps: { value: currentValue } } = this.props;
    return multi &&
      Array.isArray(currentValue) &&
      currentValue.includes(value);
  }

  addValue(value) {
    const { InputProps: { value: currentValue } } = this.props;
    const newValue = Array.isArray(currentValue) ? currentValue.slice() : [];
    newValue.push(value);
    this.setValue(newValue);
  }

  removeValue(value) {
    const { InputProps: { value: currentValue } } = this.props;
    const newValue = currentValue.filter(item => item !== value);
    this.setValue(newValue);
  }

  setValue(value) {
    const { InputProps: { onChange } } = this.props;
    if (onChange) {
      onChange(value);
    }
  }

  componentWillReceiveProps(nextProps) {
    const { multi, InputProps: { value: filter } } = nextProps;
    if (!multi) {
      this.setState({ filter });
    }
  }

  getKeysSortedByLabel = obj => {
    return Object.keys(obj).sort((a, b) => {
      const leftLabel = obj[a].label + '';
      const rightLabel = obj[b].label + '';

      if (leftLabel.toLowerCase() > rightLabel.toLowerCase()) {
        return 1;
      }

      if (leftLabel.toLowerCase() < rightLabel.toLowerCase()) {
        return -1;
      }

      return 0;
    });
  };

  getItemLabel = key => {
    const { options } = this.props;
    return typeof options[key] !== 'undefined' ? options[key] : key;
  };

  render() {
    const { classes, label, helperText, options, delimiter, InputProps, add, multi, onlyNew, ...other } = this.props;
    const { name, value, onFocus, onBlur, onChange, ...otherInputProps } = InputProps;
    const { open, hasVariants, variants, matched, filter, canBeAdded, canBeChoosen } = this.state;

    const dropDownClasses = classNames(
      classes.dropdown,
      {
        [classes.open]: open && hasVariants,
      }
    );

    const iconClasses = classNames(classes.icon, {
      [classes.iconOpened]: open,
      [classes.iconClosed]: !open,
    });

    const inputClasses = classNames({
      [classes.wrongInput]: filter != '' && !canBeAdded && (onlyNew || !canBeChoosen),
    });

    return (
      <FormControl
        {...other}
      >
        {label
          ? <InputLabel shrink={this.state.open || filter != ''}>
              {label}
            </InputLabel>
          : null
        }

        <Input
          name={`${name}-filter`}
          value={filter}
          inputRef={node => {this.inputRef = node;}}
          autoComplete='off'
          onFocus={this.handleFocus}
          onBlur={this.handleBlur}
          onChange={this.handleChange}
          onKeyDown={this.handleKeyDown}
          placeholder={`Please filter ${label.toLowerCase()}`}
          className={inputClasses}
          {...otherInputProps}
        />

        <IconButton
          className={iconClasses}
          onClick={this.handleIconClick}
          onMouseOver={this.handleIconMouseOver}
          onMouseOut={this.handleIconMouseOut}
        >
          <KeyboardArrowDownIcon />
        </IconButton>

        <Paper
          className={dropDownClasses}
          onMouseOver={this.handleDropDownMouseOver}
          onMouseOut={this.handleDropDownMouseOut}
        >
          <Collapse in={open}>
            {canBeAdded && multi
              ? <List>
                  <ListItem
                    button
                    className={classes.dropdownItem}
                    key={filter}
                    onClick={event => this.handleClickItem(filter, true)}
                  >
                    {filter} (add as new)
                  </ListItem>
                </List>
              : null
            }

            {canBeAdded && multi && (Object.keys(variants).length || Object.keys(matched).length)
              ? <Divider />
              : null
            }

            {Object.keys(variants).length
              ? <List>
                  {this.getKeysSortedByLabel(variants).map(key =>
                    <ListItem
                      button
                      className={classes.dropdownItem}
                      key={key}
                      onClick={event => this.handleClickItem(key, variants[key].final)}
                    >
                      {variants[key].label}
                    </ListItem>
                  )}
                </List>
              : null
            }

            {Object.keys(variants).length && Object.keys(matched).length
              ? <Divider />
              : null
            }

            {Object.keys(matched).length
              ? <List>
                  {this.getKeysSortedByLabel(matched).map(key =>
                    <ListItem
                      button
                      className={classes.dropdownItem}
                      key={key}
                      onClick={event => this.handleClickItem(key, matched[key].final)}
                    >
                      {matched[key].label}
                    </ListItem>
                  )}
                </List>
              : null
            }
          </Collapse>
        </Paper>

        {multi && value && Array.isArray(value)
          ? <Grid container className={classes.chips}>
              {value.map(item =>
                <Chip
                  label={this.getItemLabel(item)}
                  key={item}
                  onDelete={event => this.handleRemoveItem(item)}
                  className={classes.chip}
                />
              )}
            </Grid>
          : null
        }

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

export default withStyles(styleSheet)(TextAutoCompleteFieldComponent);