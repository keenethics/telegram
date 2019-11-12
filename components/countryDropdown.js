import { Block, Component } from '../ui';

class CountryDropdown extends Component {
  constructor(props) {
    super(props);
    console.log(this);
    this.toggleDropdown = this.toggleDropdown.bind(this);
    this.setCountry = this.setCountry.bind(this);
  }

  toggleDropdown() {
    const { store } = this.props;
    const isOpen = store.get('countryExpanded');
    store.set('countryExpanded', !isOpen);
  }

  setCountry(event) {
    const value = event.target.getAttribute('data-value');
    if (!value) {
      throw new Error('Invalid country value');
    }
    const { store } = this.props;
    store.set('country', value);
  }

  render() {
    const { store } = this.props;

    const { phoneNumber, country } = store.get(['phoneNumber', 'country']);

    return new Block({
      className: 'dropdown country-dropdown',
      children: [
        new Block({
          className: 'dropdown--toggle',
          children: ['Country'],
          events: {
            click: this.toggleDropdown,
          }
        })
      ]
    });
  }
}

export default CountryDropdown;
