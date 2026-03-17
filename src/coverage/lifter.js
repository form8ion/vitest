import deepmerge from 'deepmerge';
import {remove as removeC8} from '@form8ion/c8';

import scaffoldCoverage from './scaffolder.js';

export default async function liftCoverage({projectRoot}) {
  const [removal, scaffolded] = await Promise.all([
    scaffoldCoverage(),
    removeC8({projectRoot})
  ]);

  return deepmerge(removal, scaffolded);
}
