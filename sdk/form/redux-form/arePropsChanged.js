const arePropsChanged = (props, nextProps, additionalProps = []) => {
  if (props.isSubmitting !== nextProps.isSubmitting || props.validationErrors !== nextProps.validationErrors) {
    return true;
  }

  return additionalProps.reduce((result, propName) => {
    if (props[propName] !== nextProps[propName]) {
      return true;
    }

    return result;
  }, false);
};
export default arePropsChanged;