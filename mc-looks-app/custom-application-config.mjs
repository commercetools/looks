/*
 * SPDX-License-Identifier: MIT
 * Copyright (c) 2026 commercetools GmbH and the commercetools-labs contributors
 * Freely available, AS IS and UNSUPPORTED. See LICENSE.
 */

// Connect evaluates this file inside the container, outside the bundler, so it
// imports nothing. The permission keys follow the derivation of
// entryPointUriPathToPermissionKeys from the application shell (`acme-app`
// becomes `ViewAcmeApp` and `ManageAcmeApp`); src/constants.ts uses that
// function for the browser bundle.
const entryPointUriPath = process.env.ENTRY_POINT_URI_PATH || 'looks';
const pascalCase = entryPointUriPath
  .split('-')
  .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
  .join('');
const PERMISSIONS = {
  View: `View${pascalCase}`,
  Manage: `Manage${pascalCase}`,
};

/**
 * @type {import('@commercetools-frontend/application-config').ConfigOptionsForCustomApplication}
 */
const config = {
  name: 'Looks',
  description: 'Curated looks: look definition and set-price discount',
  entryPointUriPath: '${env:ENTRY_POINT_URI_PATH}',
  cloudIdentifier: '${env:CLOUD_IDENTIFIER}',
  env: {
    development: {
      initialProjectKey: '${env:INITIAL_PROJECT_KEY}',
    },
    production: {
      applicationId: '${env:CUSTOM_APPLICATION_ID}',
      url: '${env:APPLICATION_URL}',
    },
  },
  // The Merchant Center registration must carry the same scopes (docs/SETUP.md).
  oAuthScopes: {
    view: [
      'view_products',
      'view_key_value_documents',
      'view_cart_discounts',
      'view_orders',
      'view_project_settings',
    ],
    manage: ['manage_key_value_documents', 'manage_cart_discounts'],
  },
  icon: '${path:@commercetools-frontend/assets/application-icons/star.svg}',
  mainMenuLink: {
    defaultLabel: 'Looks',
    labelAllLocales: [
      { locale: 'de', value: 'Looks' },
      { locale: 'en', value: 'Looks' },
    ],
    permissions: [PERMISSIONS.View],
  },
  submenuLinks: [],
};

export default config;
