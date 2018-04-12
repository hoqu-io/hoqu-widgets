import PropTypes from 'prop-types';
import MuiTheme from './MuiTheme';
import Layout from './Layout';

const App = ({ children, ...other }) => {
  return (
    <MuiTheme>
      <Layout {...other}>
        {children}
      </Layout>
    </MuiTheme>
  );
};

App.propTypes = {
  children: PropTypes.oneOfType([PropTypes.node, PropTypes.func]).isRequired,
};

export default App;