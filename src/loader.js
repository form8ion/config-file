import {cosmiconfig} from 'cosmiconfig';

export default async function load({name, projectRoot}) {
  const explorer = cosmiconfig(name);

  const searchResult = await explorer.search(projectRoot);

  if (null === searchResult) throw Object.assign(new Error('No configuration found'), {code: 'ENOCONFIG'});

  return searchResult.config;
}
