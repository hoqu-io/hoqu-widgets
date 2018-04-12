// Needed for onTouchTap - http://stackoverflow.com/a/34015469/988941
import injectTapEventPlugin from 'react-tap-event-plugin';
injectTapEventPlugin();

const bootstrap = app => {
  const onDOMLoaded = () => {

    window.removeEventListener('load', onDOMLoaded, false);
    document.removeEventListener('DOMContentLoaded', onDOMLoaded, false);

    document.body.classList.add('loader-fade-out');

    setTimeout(app, 10);

    setTimeout(() => {
      document.body.classList.remove('loader-fade-out');
      document.body.classList.remove('loading');
    }, 500);
  };

  if (document.readyState === 'complete') {
    onDOMLoaded();
  } else {
    window.addEventListener('load', onDOMLoaded, false);
    document.addEventListener('DOMContentLoaded', onDOMLoaded, false);
  }
};

export default bootstrap;
