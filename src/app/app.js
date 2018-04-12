require('./../assets/less/app.less');
import App from '../../sdk/app/App';
import ClickableWidget from './../payday/components/ClickableWidget';

const AppWrapper = () => (
    <App>
      <ClickableWidget />
    </App>
);
export default AppWrapper;
