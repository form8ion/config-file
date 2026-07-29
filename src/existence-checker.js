import loadConfig from './loader.js';

export default async function exists({name, projectRoot}) {
  try {
    await loadConfig({name, projectRoot});

    return true;
  } catch (e) {
    if ('ENOCONFIG' === e.code) return false;

    throw e;
  }
}
