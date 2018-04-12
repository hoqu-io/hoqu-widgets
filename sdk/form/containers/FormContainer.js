import { Component } from 'react';
import PropTypes from 'prop-types';

import { parseValidationErrors } from './../Field/validation';

export default class FormContainer extends Component {
  static propTypes = {
    onPost: PropTypes.func.isRequired,
    isSubmitting: PropTypes.bool.isRequired,
    initialValues: PropTypes.object,
    error: PropTypes.object,
    formComponent: PropTypes.oneOfType([PropTypes.node, PropTypes.func]).isRequired,
    filterValues: PropTypes.func,
  };

  onSubmit = (values) => {
    this.submittedValues = values;
    const { filterValues, initialValues, onPost } = this.props;

    const filteredValues = filterValues ? filterValues(values) : values;

    onPost(filteredValues);
  };

  render() {
    const { onPost, error, formComponent: FormComponent, ...other } = this.props;

    return (
      <FormComponent
        onSubmit={this.onSubmit}
        validationErrors={parseValidationErrors(error, this.submittedValues)}
        {...other}
      />
    );
  }
}
