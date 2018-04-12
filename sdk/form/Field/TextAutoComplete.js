import TextAutoCompleteField from './../components/TextAutoCompleteField';
import FieldWrapper from './../redux-form/Wrapper';

const TextAutoComplete = (props) => {
  return (<FieldWrapper
    component={TextAutoCompleteField}
    {...props}
  />);
};

export default TextAutoComplete;