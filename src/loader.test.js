import {cosmiconfig} from 'cosmiconfig';

import any from '@travi/any';
import {beforeEach, describe, expect, it, vi} from 'vitest';
import {when} from 'jest-when';

import loadConfig from './loader.js';

vi.mock('cosmiconfig');

describe('config loader', () => {
  const projectRoot = any.string();
  const name = any.word();
  const search = vi.fn();

  beforeEach(() => {
    when(cosmiconfig).calledWith(name).mockReturnValue({search});
  });

  it('should load the config from the existing file', async () => {
    const config = any.simpleObject();
    when(search).calledWith(projectRoot).mockResolvedValue({config});

    expect(await loadConfig({name, projectRoot})).toEqual(config);
  });

  it('should throw an error if the config file does not exist', async () => {
    when(search).calledWith(projectRoot).mockResolvedValue(null);

    await expect(loadConfig({name, projectRoot})).rejects.toThrow('No configuration found');
  });
});
