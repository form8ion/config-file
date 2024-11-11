# config-file

form8ion utility for managing RC files

<!--status-badges start -->

[![Node CI Workflow Status][github-actions-ci-badge]][github-actions-ci-link]
[![Codecov][coverage-badge]][coverage-link]
![SLSA Level 2][slsa-badge]

<!--status-badges end -->

## Table of Contents

* [Usage](#usage)
  * [Installation](#installation)
  * [Example](#example)
  * [API](#api)
    * [`write`](#write)
      * [`format` __string__ (_required_)](#format-string-required)
      * [`name` __string__ (_required_)](#name-string-required)
      * [`path` __string__ (_required_)](#path-string-required)
      * [`config` __object__ (_required_)](#config-object-required)
* [Contributing](#contributing)
  * [Dependencies](#dependencies)
  * [Verification](#verification)

## Usage

<!--consumer-badges start -->

[![MIT license][license-badge]][license-link]
[![npm][npm-badge]][npm-link]
[![Try @form8ion/config-file on RunKit][runkit-badge]][runkit-link]

<!--consumer-badges end -->

### Installation

```sh
$ npm install @form8ion/config-file --save-prod
```

### Example

```javascript
import {fileTypes} from '@form8ion/core';
import {write} from '@form8ion/config-file';
```

```javascript
(async () => {
  await write({
    format: fileTypes.JSON,
    name: 'tool-name',
    path: process.cwd(),
    config: {foo: 'bar', baz: 'qux'}
  });
})();
```

### API

#### `write`

Writes the provided config to the appropriate rc file for the named tool

Takes a single options object as an argument, containing:

##### `format` __string__ (_required_)

Format of the file to be written

##### `name` __string__ (_required_)

Name of the tool that the config file is for

##### `path` __string__ (_required_)

Path to the directory that will contain the config file

##### `config` __object__ (_required_)

Configuration to be written to the file

## Contributing

<!--contribution-badges start -->

[![PRs Welcome][PRs-badge]][PRs-link]
[![Commitizen friendly][commitizen-badge]][commitizen-link]
[![Conventional Commits][commit-convention-badge]][commit-convention-link]
[![semantic-release: angular][semantic-release-badge]][semantic-release-link]
[![Renovate][renovate-badge]][renovate-link]

<!--contribution-badges end -->

### Dependencies

```sh
$ nvm install
$ npm install
```

### Verification

```sh
$ npm test
```

[PRs-link]: http://makeapullrequest.com

[PRs-badge]: https://img.shields.io/badge/PRs-welcome-brightgreen.svg

[commitizen-link]: http://commitizen.github.io/cz-cli/

[commitizen-badge]: https://img.shields.io/badge/commitizen-friendly-brightgreen.svg

[commit-convention-link]: https://conventionalcommits.org

[commit-convention-badge]: https://img.shields.io/badge/Conventional%20Commits-1.0.0-yellow.svg

[semantic-release-link]: https://github.com/semantic-release/semantic-release

[semantic-release-badge]: https://img.shields.io/badge/semantic--release-angular-e10079?logo=semantic-release

[renovate-link]: https://renovatebot.com

[renovate-badge]: https://img.shields.io/badge/renovate-enabled-brightgreen.svg?logo=renovatebot

[github-actions-ci-link]: https://github.com/form8ion/config-file/actions?query=workflow%3A%22Node.js+CI%22+branch%3Amaster

[github-actions-ci-badge]: https://img.shields.io/github/actions/workflow/status/form8ion/config-file/node-ci.yml.svg?branch=master&logo=github

[coverage-link]: https://codecov.io/github/form8ion/config-file

[coverage-badge]: https://img.shields.io/codecov/c/github/form8ion/config-file?logo=codecov

[license-link]: LICENSE

[license-badge]: https://img.shields.io/github/license/form8ion/config-file.svg

[npm-link]: https://www.npmjs.com/package/@form8ion/config-file

[npm-badge]: https://img.shields.io/npm/v/@form8ion/config-file?logo=npm

[runkit-link]: https://npm.runkit.com/@form8ion/config-file

[runkit-badge]: https://badge.runkitcdn.com/@form8ion/config-file.svg

[slsa-badge]: https://slsa.dev/images/gh-badge-level2.svg
