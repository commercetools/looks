/*
 * SPDX-License-Identifier: MIT
 * Copyright (c) 2026 commercetools GmbH and the commercetools-labs contributors
 * Freely available, AS IS and UNSUPPORTED. See LICENSE.
 */

import fs from 'fs';
import path from 'path';

/**
 * `mc-scripts` compiles JSX with the classic runtime (`React.createElement`)
 * unless `ENABLE_NEW_JSX_TRANSFORM` is `true`. The components do not import
 * React, so without the flag the build still succeeds but the app fails in the
 * browser with "React is not defined". The flag is set on the npm scripts that
 * run mc-scripts, so the build does not depend on a local .env file.
 */
describe('build flags in the npm scripts', () => {
  const pkg = JSON.parse(
    fs.readFileSync(path.resolve(__dirname, '../package.json'), 'utf8')
  ) as { scripts: Record<string, string> };

  it.each(['build', 'start'])('%s enables the new JSX transform', (script) => {
    expect(pkg.scripts[script]).toMatch(/\bENABLE_NEW_JSX_TRANSFORM=true\b/);
  });
});
