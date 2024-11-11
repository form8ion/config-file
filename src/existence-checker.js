import loadConfig from './loader.js';

export default async function ({name}) {
  try {
    await loadConfig({name});

    return true;
  } catch (e) {
    if ('ENOCONFIG' === e.code) return false;

    throw e;
  }
}
