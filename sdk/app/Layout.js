import PropTypes from 'prop-types';

import { withStyles } from 'material-ui/styles';

const styleSheet = theme => ({
  root: {
    display: 'flex',
    alignItems: 'stretch',
  },
  content: {
    flex: '1 1 100%',
    alignItems: 'flex-start',
    display: 'flex',
    margin: '0 auto',
    maxWidth: '100%',
    padding: theme.spacing.unit,
    [theme.breakpoints.up('sm')]: {
      padding: theme.spacing.unit * 2,
    },
  },
});

const Layout = ({ children, classes, ...other }) => {
  return (
    <div className={classes.root}>
      <div className={classes.content}>
        {children}
      </div>
    </div>
  );
};

Layout.propTypes = {
  children: PropTypes.oneOfType([PropTypes.node, PropTypes.func]).isRequired,
  classes: PropTypes.object.isRequired,
};

export default withStyles(styleSheet)(Layout);