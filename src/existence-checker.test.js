import {describe, it, expect, vi} from 'vitest';
import {when} from 'jest-when';
import any from '@travi/any';

import loadConfig from './loader.js';
import exists from './existence-checker.js';

vi.mock('./loader.js');

describe('existence-checker', () => {
  const name = any.word();

  it('should return `true` if a config file exists', async () => {
    when(loadConfig).calledWith({name}).mockResolvedValue(any.simpleObject());

    expect(await exists({name})).toBe(true);
  });

  it('should return `false` if no config exists', async () => {
    const error = new Error();
    error.code = 'ENOCONFIG';
    when(loadConfig).calledWith({name}).mockRejectedValue(error);

    expect(await exists({name})).toBe(false);
  });

  it('should throw an error if an unexpected error occurs', async () => {
    const error = new Error();
    error.code = any.word();
    when(loadConfig).calledWith({name}).mockRejectedValue(error);

    await expect(exists({name})).rejects.toThrow(error);
  });
});
