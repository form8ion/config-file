import * as cosmiconfig from 'cosmiconfig';

import sinon from 'sinon';
import any from '@travi/any';
import {assert} from 'chai';

import loadConfig from './loader';

suite('config loader', () => {
  let sandbox;

  setup(() => {
    sandbox = sinon.createSandbox();

    sandbox.stub(cosmiconfig, 'cosmiconfig');
  });

  teardown(() => sandbox.restore());

  test('that the config is loaded from the existing file', async () => {
    const name = any.word();
    const search = sinon.stub();
    const config = any.simpleObject();
    cosmiconfig.cosmiconfig.withArgs(name).returns({search});
    search.resolves({config});

    assert.equal(await loadConfig({name}), config);
  });
});
