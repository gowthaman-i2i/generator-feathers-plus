
/// <reference types="mocha"/>
import { HookContext } from '@feathersjs/feathers';

import assert from 'assert';
import hookNedb12 from '../../src1/hooks/hook.nedb12';

describe('Test /hooks/hook.nedb12.unit.test.ts', () => {
  let contextBefore: HookContext, contextAfterPaginated: HookContext,
    // tslint:disable-next-line:no-unused-variable
    contextAfter: HookContext, contextAfterMultiple: HookContext;

  beforeEach(() => {
    contextBefore = {
      service: null!,
      type: 'before',
      params: { provider: 'socketio' },
      data: {

      }
    };

    contextAfter = {
      service: null!,
      type: 'after',
      params: { provider: 'socketio' },
      result: {

      }
    };

    contextAfterMultiple = {
      service: null!,
      type: 'after',
      params: { provider: 'socketio' },
      result: [

      ]
    };

    contextAfterPaginated = {
      service: null!,
      type: 'after',
      method: 'find',
      params: { provider: 'socketio' },
      result: {
        data: [

        ]
      } };
    contextAfterPaginated.result.total = contextAfterPaginated.result.data.length;
  });

  it('Hook exists', () => {
    assert(typeof hookNedb12 === 'function', 'Hook is not a function.');
  });

  it('???', () => {
    contextBefore.method = 'create';
    assert(true);

    /*
    hookNedb12()(contextBefore);

    assert.deepEqual(contextBefore.data, {

    });
    */
  });
});
