import {resolve} from 'path';
import {promises as fs} from 'fs';
import {dump, load as loadYaml} from 'js-yaml';
import {fileTypes} from '@form8ion/core';
// eslint-disable-next-line import/no-extraneous-dependencies,import/no-unresolved
import {load, write} from '@form8ion/config-file';

import {After, Before, Given, Then, When} from '@cucumber/cucumber';
import stubbedFs from 'mock-fs';
import any from '@travi/any';
import assert from 'node:assert';

const pathToProjectRoot = [__dirname, '..', '..', '..', '..'];
const pathToNodeModules = [...pathToProjectRoot, 'node_modules'];
const stubbedNodeModules = stubbedFs.load(resolve(...pathToNodeModules));
const fileTypeExtensions = {
  [fileTypes.JSON]: 'json',
  [fileTypes.YAML]: 'yml',
  [fileTypes.COMMON_JS]: 'cjs'
};

function parseConfigFileContent(fileContents, format) {
  if (fileTypes.JSON === format) return JSON.parse(fileContents);
  if (fileTypes.YAML === format) return loadYaml(fileContents);

  throw new Error('desired file format is unsupported, so not parsing');
}

function serializeConfig(config, format) {
  if (fileTypes.JSON === format) return JSON.stringify(config);
  if (fileTypes.YAML === format) return dump(config);
  if (fileTypes.COMMON_JS === format) return `module.exports = ${JSON.stringify(config)}`;

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

Given('no config exists', async function () {
  return undefined;
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
  try {
    this.parsedConfig = await load({name: this.configName});
  } catch (err) {
    this.configLoadError = err;
  }
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

Then('the {string} file will have the provided config merged into it', async function () {
  // Write code here that turns the phrase above into concrete actions
  return 'pending';
});

Then('a missing-config error is thrown', async function () {
  const {message, code} = this.configLoadError;

  assert.equal(message, 'No configuration found');
  assert.equal(code, 'ENOCONFIG');
});
