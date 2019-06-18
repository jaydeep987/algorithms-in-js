import * as chai from 'chai';
import { swapArrayItem } from '~utils/basic-utils';

const assert = chai.assert;

describe('Test Basic Utils', () => {
  describe('Test swapArrayItem', () => {
    it('should swap given two items in array', () => {
      const sourceArr = [1, 2, 3, 4];
      const expectedArr = [1, 3, 2, 4];

      swapArrayItem(sourceArr, 1, 2);

      assert.deepStrictEqual(sourceArr, expectedArr);
    });
  });
});
