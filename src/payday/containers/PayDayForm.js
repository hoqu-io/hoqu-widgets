import { connect } from 'react-redux';

import FormContainer from './../../../sdk/form/containers/FormContainer';
import PayDayForm from './../forms/PayDay';
import { paydayPost } from './../actions/payday';

const postSplitedMeta = values => {
    const { name, phone, email, ...insecure } = values;
    return paydayPost(insecure, values);
};

const mapStateToProps = (state) => {
  const { payday: {
    isSubmitting,
    item,
    error,
  }} = state;

  return {
    isSubmitting,
    initialValues: {},
    error,
    item,
    formComponent: PayDayForm,
  };
};

const mapDispatchToProps = (dispatch) => ({
  onPost: (values) => dispatch(postSplitedMeta(values)),
});

export default connect(mapStateToProps, mapDispatchToProps)(FormContainer);