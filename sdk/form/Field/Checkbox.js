import CheckboxField from './../components/CheckboxField';
import FieldWrapper from './../redux-form/Wrapper';

const Checkbox = (props) => {
  return (<FieldWrapper
    component={CheckboxField}
    {...props}
  />);
};

export default Checkbox;