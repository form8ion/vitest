# vitest

test framework plugin for form8ion

<!--status-badges start -->

[![Node CI Workflow Status][github-actions-ci-badge]][github-actions-ci-link]
[![Codecov][coverage-badge]][coverage-link]

<!--status-badges end -->

## Table of Contents

* [Usage](#usage)
  * [Installation](#installation)
  * [Example](#example)
    * [Import](#import)
    * [Execute](#execute)
  * [API](#api)
    * [scaffold](#scaffold)
      * [`projectRoot` __string__ (_required_)](#projectroot-string-required)
* [Contributing](#contributing)
  * [Dependencies](#dependencies)
  * [Verification](#verification)

## Usage

<!--consumer-badges start -->

[![MIT license][license-badge]][license-link]
[![npm][npm-badge]][npm-link]
[![Try @form8ion/vitest on RunKit][runkit-badge]][runkit-link]
![node][node-badge]

<!--consumer-badges end -->

### Installation

```sh
$ npm install @form8ion/vitest --save-prod
```

### Example

#### Import

```javascript
import {scaffold} from '@form8ion/vitest';
```

#### Execute

```javascript
(async () => {
  await scaffold({projectRoot: process.cwd()});
})();
```

### API

#### scaffold

Scaffolder for configuring [Vitest](https://vitest.dev/) as the unit-test
framework for the project

Takes a single options object as an argument, containing:

##### `projectRoot` __string__ (_required_)

path to the root of the project

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

[github-actions-ci-link]: https://github.com/form8ion/vitest/actions?query=workflow%3A%22Node.js+CI%22+branch%3Amaster

[github-actions-ci-badge]: https://github.com/form8ion/vitest/workflows/Node.js%20CI/badge.svg

[coverage-link]: https://codecov.io/github/form8ion/vitest

[coverage-badge]: https://img.shields.io/codecov/c/github/form8ion/vitest?logo=codecov

[license-link]: LICENSE

[license-badge]: https://img.shields.io/github/license/form8ion/vitest.svg

[npm-link]: https://www.npmjs.com/package/@form8ion/vitest

[npm-badge]: https://img.shields.io/npm/v/@form8ion/vitest?logo=npm

[runkit-link]: https://npm.runkit.com/@form8ion/vitest

[runkit-badge]: https://badge.runkitcdn.com/@form8ion/vitest.svg

[node-badge]: https://img.shields.io/node/v/@form8ion/vitest?logo=node.js
