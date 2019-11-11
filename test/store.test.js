import Store from '../ui/store';

describe("Store", () => {
  let store = null;
  const createStore = () => store = new Store({ counter: 0, text: '', check: true, });
  
  describe('Getter', () => {
    beforeEach(createStore);

    it('Gets store value when no key provided', () => {
      const result = store.get();
      expect(result).toBeDefined();
      expect(result.counter).toBe(0);
      expect(result.text).toBe('');
      expect(result.check).toBeTruthy();
    });
  
    it('Gets store value by single key', () => {
      expect(store.get('counter')).toBe(0);
      expect(store.get('text')).toBe('');
      expect(store.get('check')).toBeTruthy();
    });

    it('Fails when non-existent key provided', () => {
      expect(() => store.get('some-key')).toThrow('Field some-key doesn\'t exist in store');
    });

    it('Gets store values by array of keys', () => {
      expect(store.get(['counter', 'check'])).toMatchObject({
        counter: 0,
        check: true,
      });
    });

    it('Fails when key in array doesn\'t exist in store', () => {
      expect(() => {
        store.get(['counter', 'check', 'some-key']);
      }).toThrow();
    });
  });

  describe('Setter', () => {
    beforeEach(createStore);

    it('Updates store by providing `key` and `value` parts', () => {
      expect(store.set('counter', 123)).toBeTruthy();
      expect(store.get('counter')).toBe(123);
      expect(store.get('text')).toBe('');
    });

    it('Fails when trying to update non-existent field', () => {
      expect(() => {
        store.set('some-key', 'some-value');
      }).toThrow();
    });

    it('Updates store by providing object', () => {
      store.set({ text: 'halo', check: false });
      expect(store.get('text')).toBe('halo');
      expect(store.get('check')).toBeFalsy();
      expect(store.get('counter')).toBe(0);
    });

    it('Fails when provided object contains non-existent fields', () => {
      expect(() => {
        store.set({ counter: 1, 'some-key': 'some-value' });
      }).toThrow();
    });
  });

  // describe('Subscriptions', () => {
  //   beforeEach(createStore);

  //   it('Succesfully subscribes on updates of single field', () => {
      
  //   });

  //   it('Calls callback when single field updates', () => {

  //   });

  //   it('Calls callback when subscribed to whole store update', () => {

  //   });

  //   it('Fails when trying to subscribe to non-existent field by single key', () => {

  //   });

  //   it('Fails when trying to subscribe to non-existent field by array of keys', () => {

  //   });

  //   it('Doesn\'t call callback on updates of unwanted fields', () => {

  //   });
  // })
});
