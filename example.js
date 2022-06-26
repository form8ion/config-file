// remark-usage-ignore-next 2
import stubbedFs from 'mock-fs';
/* eslint-disable-next-line no-unused-vars */
import {fileTypes} from '@form8ion/core';
import {write} from './lib/index.js';

// remark-usage-ignore-next
stubbedFs({});

(async () => {
  await write({
    format: fileTypes.JSON,
    name: 'tool-name',
    path: process.cwd(),
    config: {foo: 'bar', baz: 'qux'}
  });
})();
