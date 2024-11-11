import {cosmiconfig} from 'cosmiconfig';

import any from '@travi/any';
import {beforeEach, describe, expect, it, vi} from 'vitest';
import {when} from 'jest-when';

import loadConfig from './loader.js';

vi.mock('cosmiconfig');

describe('config loader', () => {
  const name = any.word();
  const search = vi.fn();

  beforeEach(() => {
    when(cosmiconfig).calledWith(name).mockReturnValue({search});
  });

  it('should load the config from the existing file', async () => {
    const config = any.simpleObject();
    search.mockResolvedValue({config});

    expect(await loadConfig({name})).toEqual(config);
  });

  it('should throw an error if the config file does not exist', async () => {
    search.mockResolvedValue(null);

    await expect(loadConfig({name})).rejects.toThrow('No configuration found');
  });
});
