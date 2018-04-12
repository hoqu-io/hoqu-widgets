import { Component } from 'react';
import PropTypes from 'prop-types';
import { Field, reduxForm } from 'redux-form';
import arePropsChanged from './../../../sdk/form/redux-form/arePropsChanged';
import { withStyles } from 'material-ui/styles';

import Typography from 'material-ui/Typography';
import Divider from 'material-ui/Divider';
import Grid from 'material-ui/Grid';
import Button from 'material-ui/Button';

import TextField from './../../../sdk/form/Field/TextField';
import DropDown from './../../../sdk/form/Field/DropDown';
import { isRequired } from './../../../sdk/form/Field/validation';

const styleSheet = theme => ({
  button: {
    background: '#06af0a',
  },
});

class PayDayForm extends Component {
  static propTypes = {
    classes: PropTypes.object.isRequired,
    handleSubmit: PropTypes.func.isRequired,
    isSubmitting: PropTypes.bool.isRequired,
    validationErrors: PropTypes.object,
    initialValues: PropTypes.object,
  };

  shouldComponentUpdate(nextProps) {
    return arePropsChanged(this.props, nextProps, ['initialValues']);
  }

  render() {
    const { handleSubmit, isSubmitting, validationErrors, classes } = this.props;

    return (
      <form onSubmit={handleSubmit}>
        <Grid container>
          <Grid item xs={12}>
            <Typography type='display1' gutterBottom color='primary'>
              PayDay Loan
            </Typography>
            <Divider/>
          </Grid>

          <Grid item xs={12}>
            <Field
              component={TextField}
              label='Amount'
              name='amount'
              required={true}
              validate={isRequired('Amount')}
              fieldError={validationErrors.amount}
            />
          </Grid>

          <Grid item xs={12}>
            <Field
              component={DropDown}
              label='Period'
              name='period'
              options={{
                '1': 'One month',
                '3': 'Three months',
                '6': 'Half of a year',
                '12': 'One year',
              }}
              required={true}
              validate={isRequired('Period')}
              fieldError={validationErrors.period}
            />
          </Grid>

          <Grid item xs={12}>
            <Field
              component={TextField}
              label='Name'
              name='name'
              required={true}
              validate={isRequired('Name')}
              fieldError={validationErrors.code}
            />
          </Grid>

          <Grid item xs={12}>
            <Field
              component={TextField}
              label='Phone'
              name='phone'
              required={true}
              validate={isRequired('Phone')}
              fieldError={validationErrors.phone}
            />
          </Grid>

          <Grid item xs={12}>
            <Field
              component={TextField}
              label='Email'
              name='email'
              fieldError={validationErrors.email}
            />
          </Grid>

          <Grid item xs={12}>
            <Grid container justify='flex-end' alignItems='center'>
              <Grid item>
                <Button
                  variant='raised'
                  color='primary'
                  type='submit'
                  disabled={isSubmitting}
                  className={classes.button}
                >
                  Get Loan
                </Button>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </form>
    );
  }
}

export default reduxForm({
  form: 'payday',
})(
  withStyles(styleSheet)(PayDayForm)
);
