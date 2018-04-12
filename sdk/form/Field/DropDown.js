import DropDownField from './../components/DropDownField';
import FieldWrapper from './../redux-form/Wrapper';

const DropDown = (props) => {
  return (<FieldWrapper
    component={DropDownField}
    {...props}
  />);
};

export default DropDown;