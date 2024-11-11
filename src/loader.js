import {cosmiconfig} from 'cosmiconfig';

export default async function ({name}) {
  const explorer = cosmiconfig(name);

  const searchResult = await explorer.search();

  if (null === searchResult) throw Object.assign(new Error('No configuration found'), {code: 'ENOCONFIG'});

  return searchResult.config;
}
