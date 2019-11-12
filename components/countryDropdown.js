import { Block, Component } from '../ui';
import countries from '../const/countries';

class CountryDropdown extends Component {
  constructor(props) {
    super(props);

    this.searchCountry = this.searchCountry.bind(this);
    this.setCountry = this.setCountry.bind(this);
  }

  toggleExpand(to = false) {
    const { store } = this.props;
    store.set('countryExpanded', to);
  }

  searchCountry() {
    const { store } = this.props;
    store.set('countryInput', event.target.value);
  }

  setCountry({ target }) {
    const cName = target.getAttribute('data-countryName');
    const cNumber = target.getAttribute('data-countryNumber')
    if (!cName || !cNumber) {
      throw new Error('Invalid country name or number!');
    }
    const { store } = this.props;
    store.set({
      countryInput: cName,
      phoneNumberPrefix: cNumber,
    });
  }

  render() {
    /**
     * 4. filter countries by input value
     */
    const { store } = this.props;

    const { countryInput, countryExpanded } = store.get(['countryInput', 'countryExpanded']);
    console.log(countryExpanded);
    console.log(`dropdown ${countryExpanded ? 'dropdown__expanded' : ''}`);
    return new Block({
      className: `dropdown ${countryExpanded ? 'dropdown__expanded' : ''}`,
      children: [
        new Block({
          tag: 'input',
          className: 'dropdown--input',
          value: countryInput,
          events: {
            input: this.searchCountry,
            focus: () => this.toggleExpand(true),
            blur: () => this.toggleExpand(false),
          },
          attributes: {
            tabindex: "0",
            placeholder: "Country",
          }
        }),
        new Block({
          className: 'dropdown--menu',
          children: countries.map((c) => new Block({
            className: 'dropdown--menu--item',
            events: this.setCountry,
            attributes: {
              'data-countryName': c.name,
              'data-countryNumber': c.number,
            },
            children: [c.name]
          }))
        })
      ]
    });
  }
}

export default CountryDropdown;
