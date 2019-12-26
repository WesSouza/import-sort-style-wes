# import-sort-style-wes

Wes' personal style for [import-sort](https://github.com/renke/import-sort).

## Sorting Example

```js
// Modules without members
import '@scoped/module';
import 'first-module';
import 'second-module';
import '~/local-module';

// Installed and scoped modules
import scoped from '@scoped/thing';
import whatever from 'module-a';
import anything from 'module-b';

// Local resolved modules
import exported from '~/project-root-file';

// Siblings and parents
import things from '../grand-parent';
import name from '../parent';
import sibling from './sibling';
```

## Why `~`?

Not all characters can be used at a module path, because of `npm` registry
rules, and file system constraints. `npm` already uses the `@` prefix to scope
organizations and teams.

Inspired by [Parcel](https://parceljs.org), which resolves `~` to the project
source directory by default, I decided to define `~` as the de facto reference
for all of my packages root source directories.

Some projects prefer to have every folder on the project source as its own
resolve alias. I find this bad especially for use cases like this, where one
would need to read the file system to determine if an import is within
`node_modules` or the project's source folder. Given that these can be
configured in a multitude of ways, I decided to not support that at all.

## Usage

These instrutions use [prettier](https://prettier.io), which is my preferred
method of enforcing import sort order.

```sh
# Install prettier-plugin-import-sort
yarn add -D prettier-plugin-import-sort

# Install import-sort-style-wes
yarn add -D import-sort-style-wes
```

Then add on your root `package.json`:

```json
{
  "importSort": {
    ".js, .jsx": {
      "parser": "babylon",
      "style": "wes"
    },
    ".ts, .tsx": {
      "parser": "typescript",
      "style": "wes"
    }
  }
}
```

## Development

I've used [yarn](https://yarnpkg.com/en/), and
[tsdx](https://github.com/jaredpalmer/tsdx), which provides scaffolding for
TypeScript libraries.

```sh
# Install yarn, if you don't have it
curl -o- -L https://yarnpkg.com/install.sh | bash

# Install dependencies
yarn install

# Build upon changes (development mode)
yarn run dev

# Lint code
yarn run lint

# Test code
yarn run test

# Build code
yarn run build
```

## License

MIT, https://wes.dev/LICENSE.txt
