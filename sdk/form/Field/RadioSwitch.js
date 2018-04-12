import RadioSwitchField from './../components/RadioSwitchField';
import FieldWrapper from './../redux-form/Wrapper';

const RadioSwitch = (props) => {
  return (<FieldWrapper
    component={RadioSwitchField}
    {...props}
  />);
};

export default RadioSwitch;