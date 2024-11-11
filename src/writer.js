import {writeConfigFile} from '@form8ion/core';

export default function ({format, config, path, name}) {
  return writeConfigFile({format, config, path, name: `.${name}rc`});
}
