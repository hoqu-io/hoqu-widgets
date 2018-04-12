import { Component } from 'react';
import PropTypes from 'prop-types';
import bundle from './../../../sdk/bundle';

import { withStyles } from 'material-ui/styles';
import Button from 'material-ui/Button';

import PayDayFormLoader from 'bundle-loader?lazy&name=[name]!./../containers/PayDayForm';
const PayDayForm = bundle(PayDayFormLoader);

const styleSheet = theme => ({
  banner: {
    background: '#86e88e',
    width: '100%',
    height: 200,
    '&:hover': {
      background: '#75e8c3',
    },
  },
});

class ClickableWidget extends Component {
  propTypes = {
    classes: PropTypes.object.isRequired,
  };

  state = {
    clicked: false,
  };

  clickWidget = () => {
    this.setState({ clicked: true });
  };

  render() {
    const { classes } = this.props;
    const { clicked } = this.state;

    if (clicked) {
      return (
        <PayDayForm />
      );
    } else {
      return (
        <Button
          className={classes.banner}
          color='contrast'
          title='Click me!'
          onClick={this.clickWidget}
        >
          Click me, I am a widget!
        </Button>
      );
    }
  }
}

export default withStyles(styleSheet)(ClickableWidget);