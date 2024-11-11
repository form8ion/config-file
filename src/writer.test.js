import {writeConfigFile} from '@form8ion/core';

import any from '@travi/any';
import {describe, it, expect, vi} from 'vitest';

import writeConfig from './writer.js';

vi.mock('@form8ion/core');

describe('config-file writer', () => {
  it('should apply the RC convention to the file to be written', async () => {
    const configFileFormat = any.word();
    const config = any.simpleObject();
    const path = any.string();
    const name = any.word();

    await writeConfig({format: configFileFormat, config, path, name});

    expect(writeConfigFile).toHaveBeenCalledWith({format: configFileFormat, config, path, name: `.${name}rc`});
  });
});
