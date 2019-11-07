# Telegram client

## UI 'framework' api

### Component types
+ String. Will be inserted as text node. No parsing from string to html!
+ Block. Creates HTMLElement instance with supplied parameters.
+ BaseComponent class: in progress.

### Block
Block is a constructor for DOM nodes.
```javascript
const component = new Block({
  tag: 'div',
  className: 'class-example',
  id: 'id-example',
  eventHandlers: {
    // it isn't recommended to pass arrow functions if you need to access Block methods.
    // simple `function` will have `this` pointing to Block.
    click: function (event) { console.log(`${event.target} clicked`) },
    <another dom event>: function() { return null; }
  },
  // must be array, even if you pass one child
  children: [
    'hello i am string',
    new Block({ tag: 'span', children: [
      'i am nested string',
      new Block({ tag: 'em', children: ['i am emphasised text inside of span'] }),
    ] }),
  ],
})
```