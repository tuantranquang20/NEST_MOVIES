import { Paginator } from './paginator';
import { DelegatesToResource } from './delegatesToResource';

export class Resource<S> extends DelegatesToResource {
  constructor(object: S, wrap = false) {
    super(object);

    const data = this.toArray();

    if (wrap) {
      return {
        data,
      } as unknown as Resource<S>;
    }

    return data as unknown as Resource<S>;
  }

  /**
   * transform response
   * @param array
   * @param wrap if wrap = true response will wrap data with items : {items: data}
   * @returns array | object
   */
  static collection(array, wrap = false) {
    const collection = array || [];

    const data = collection.map((item) => new this(item, false));

    if (wrap) {
      return {
        items: data,
      };
    }

    return data;
  }

  /**
   * transform response with total of items
   * @param array
   * @param total total of array
   * @returns object {items: data, totalItems: 0}
   */
  static collectionWithPaginate(array, total) {
    const collection = array || [];

    const data = collection.map((item) => new this(item, false));

    return new Paginator(data, total);
  }

  toArray() {
    return Object.assign({}, this.tmpResource);
  }
}
