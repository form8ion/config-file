import {cosmiconfig} from 'cosmiconfig';

export default async function ({name}) {
  const explorer = cosmiconfig(name);

  const {config} = await explorer.search();

  return config;
}
