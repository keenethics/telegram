# Telegram client

## UI 'framework' api

### Component types
+ String. Will be inserted as text node. No parsing from string to html!
+ Block. Creates HTMLElement instance with supplied parameters.
+ BaseComponent class: in progress.

### Block
Block is a constructor for DOM nodes. Note that calling `new Block` will immediatly render component.
So your components should be arrow functions that are passing props to block constructor (see example).
`this.options` will contain `options` object passed to constructor.

```javascript
const childComponent = (props) => new Block(props);

parentComponent = () => new Block({
  children: [
    childComponent({
      tag: 'button', // default to div
      className: 'btn',
      id: 'btn-id',
      options: {
        shouldLog: true,
      },
      events: {
        // it isn't recommended to pass arrow functions if you need to access Block options.
        // simple `function` will have `this` pointing to Block.
        click: function (event) {
          if (this.options.shouldLog) {
            console.log(`${event.target} clicked`);
          }
        },
      },
      // must be array, even if you pass one child
      children: [
        'Button label',
      ],
    })
  ]
})
```