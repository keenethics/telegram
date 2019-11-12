import { Store } from '../ui';

const loginStore = new Store({
  phoneNumberPrefix: '',
  phoneNumber: '',
  countryInput: '',
  countryExpanded: false,
});

export default loginStore;
