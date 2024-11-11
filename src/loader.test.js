import {cosmiconfig} from 'cosmiconfig';

import any from '@travi/any';
import {describe, it, expect, vi} from 'vitest';
import {when} from 'jest-when';

import loadConfig from './loader.js';

vi.mock('cosmiconfig');

describe('config loader', () => {
  it('should load the config from the existing file', async () => {
    const name = any.word();
    const search = vi.fn();
    const config = any.simpleObject();
    when(cosmiconfig).calledWith(name).mockReturnValue({search});
    search.mockResolvedValue({config});

    expect(await loadConfig({name})).toEqual(config);
  });
});
