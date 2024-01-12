import * as core from '@form8ion/core';

import sinon from 'sinon';
import {assert} from 'chai';
import any from '@travi/any';

import writeConfigFile from './write.js';

suite('write config file', () => {
  let sandbox;

  setup(() => {
    sandbox = sinon.createSandbox();

    sandbox.stub(core, 'writeConfigFile');
  });

  teardown(() => sandbox.restore());
  test('that the RC convention is applied to the file to be written', async () => {
    const configFileFormat = any.word();
    const config = any.simpleObject();
    const path = any.string();
    const name = any.word();

    await writeConfigFile({format: configFileFormat, config, path, name});

    assert.calledWith(core.writeConfigFile, {format: configFileFormat, config, path, name: `.${name}rc`});
  });
});
