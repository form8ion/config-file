import {resolve} from 'path';
import {promises as fs} from 'fs';
import {dump, load as loadYaml} from 'js-yaml';
import {fileTypes} from '@form8ion/core';
// eslint-disable-next-line import/no-extraneous-dependencies,import/no-unresolved
import {write, load} from '@form8ion/config-file';

import {After, Before, Given, Then, When} from '@cucumber/cucumber';
import {assert} from 'chai';
import stubbedFs from 'mock-fs';
import any from '@travi/any';

const pathToProjectRoot = [__dirname, '..', '..', '..', '..'];
const pathToNodeModules = [...pathToProjectRoot, 'node_modules'];
const stubbedNodeModules = stubbedFs.load(resolve(...pathToNodeModules));
const fileTypeExtensions = {
  [fileTypes.JSON]: 'json',
  [fileTypes.YAML]: 'yml'
};

function parseConfigFileContent(fileContents, format) {
  if (fileTypes.JSON === format) return JSON.parse(fileContents);
  if (fileTypes.YAML === format) return loadYaml(fileContents);

  throw new Error('desired file format is unsupported, so not parsing');
}

function serializeConfig(config, format) {
  if (fileTypes.JSON === format) return JSON.stringify(config);
  if (fileTypes.YAML === format) return dump(config);

  throw new Error('desired file format is unsupported, so not serializing');
}

Before(function () {
  stubbedFs({
    node_modules: stubbedNodeModules
  });

  this.config = any.simpleObject();
  this.configName = any.word();
  this.configPath = process.cwd();
});

After(function () {
  stubbedFs.restore();
});

Given('the desired config file format is {string}', async function (format) {
  this.desiredConfigFileFormat = format;
});

Given('a {string} config file exists', async function (format) {
  this.desiredConfigFileFormat = format;

  await fs.writeFile(
    `${this.configPath}/.${this.configName}rc.${fileTypeExtensions[format]}`,
    serializeConfig(this.config, format)
  );
});

When('the config file is written', async function () {
  await write({
    format: this.desiredConfigFileFormat,
    config: this.config,
    path: this.configPath,
    name: this.configName
  });
});

When('the config file is loaded', async function () {
  this.parsedConfig = await load({name: this.configName});
});

When('the provided config is merged into the existing file', async function () {
  // Write code here that turns the phrase above into concrete actions
  return 'pending';
});

Then('the config is defined in the file', async function () {
  const {desiredConfigFileFormat} = this;
  const fileContents = await fs.readFile(
    `${this.configPath}/.${this.configName}rc.${fileTypeExtensions[desiredConfigFileFormat]}`,
    'utf-8'
  );
  const config = parseConfigFileContent(fileContents, desiredConfigFileFormat);

  assert.deepEqual(config, this.config);
});

Then('the config is parsed from the file', async function () {
  assert.deepEqual(this.parsedConfig, this.config);
});

Then('the {string} file will have the provided config merged into it', async function (string) {
  // Write code here that turns the phrase above into concrete actions
  return 'pending';
});
