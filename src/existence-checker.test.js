import {describe, it, expect, vi} from 'vitest';
import {when} from 'jest-when';
import any from '@travi/any';

import loadConfig from './loader.js';
import exists from './existence-checker.js';

vi.mock('./loader.js');

describe('existence-checker', () => {
  const name = any.word();
  const projectRoot = any.string();

  it('should return `true` if a config file exists', async () => {
    when(loadConfig).calledWith({name, projectRoot}).mockResolvedValue(any.simpleObject());

    expect(await exists({name, projectRoot})).toBe(true);
  });

  it('should return `false` if no config exists', async () => {
    const error = new Error();
    error.code = 'ENOCONFIG';
    when(loadConfig).calledWith({name, projectRoot}).mockRejectedValue(error);

    expect(await exists({name, projectRoot})).toBe(false);
  });

  it('should throw an error if an unexpected error occurs', async () => {
    const error = new Error();
    error.code = any.word();
    when(loadConfig).calledWith({name, projectRoot}).mockRejectedValue(error);

    await expect(exists({name, projectRoot})).rejects.toThrow(error);
  });
});
