# Setting up Looks

Looks is a Merchant Center custom application. Registering it, installing it and giving teams access are manual steps in the Merchant Center. The application is built and hosted on **Connect**: the repository is a Connect connector with one application, `mc-looks-app`.

## 1. Configuration

Per-project values are read in one module, `mc-looks-app/src/config.ts`, from environment variables (see `.env.example`), with the defaults below as fallback.

| Value | Variable | Default | Meaning |
|---|---|---|---|
| Variant attributes | `VARIANT_ATTRIBUTES` | `size` | Comma-separated product-variant attributes that tell the variants of a product apart, in display order, named exactly as in the product type, e.g. `search-color,search-finish,size`. A variant is shown as the values joined with " / " (text, number, enum, localized or set values). Variants without any value are listed by SKU, and a product with a single such variant is "one size". |

Each look gets one Discount Group (`look-<key>`) that holds its country Cart Discounts (one per country with set prices). The app assumes the `view_cart_discounts` and `manage_cart_discounts` scopes also cover Discount Groups. Confirm this on a live project before you rely on it.

Prices come from the list prices of the master variant (other variants only for currency and country combinations the master lacks), per currency and country, valid now. Prices restricted to a customer group or channel are never used. Product search needs the project's Product Search index to be active.

Product stock is read from the default inventory (inventory entries without a supply channel). Currencies and the languages of the look name are the project's currencies and languages, read from the project settings (hence the `view_project_settings` scope).

### Deployment values (Connect)

| Key | Required | Meaning |
|---|---|---|
| `CUSTOM_APPLICATION_ID` | yes | The Application ID from the Merchant Center registration |
| `ENTRY_POINT_URI_PATH` | yes, default `looks` | The entry point path of the registration; it must match exactly |
| `INITIAL_PROJECT_KEY` | yes | The project the local development server opens; the build reads it too |
| `CLOUD_IDENTIFIER` | yes, default `gcp-eu` | One of `gcp-eu`, `gcp-us`, `aws-eu`, `aws-us`; the same region as the project |
| `VARIANT_ATTRIBUTES` | no, default `size` | See above |

Connect provides `APPLICATION_URL` itself. Do not declare it.

## 2. Register the application (Organization admin)

1. Merchant Center, profile icon, "Manage organizations & teams", the Organization, tab "Custom Applications", "Configure Custom Applications". Verify the contact email once.
2. "Add a Custom Application": name "Looks", entry point URI path `looks`, main menu label "Looks" (de and en), and these OAuth scopes:
   - View: `view_products`, `view_key_value_documents`, `view_cart_discounts`, `view_orders`, `view_project_settings`
   - Manage: `manage_key_value_documents`, `manage_cart_discounts`

   Use a placeholder Application URL until the first deployment. Note the Application ID; it is the `CUSTOM_APPLICATION_ID` value.
3. Teams: give the merchandising teams **Manage** (create, switch, reprice) and others **View**. A user with Manage can edit every look; there is no fencing by brand or store.

## 3. Deploy on Connect

1. `connect.yaml` at the repository root declares one application, `mc-looks-app`, of type `merchant-center-custom-application`. Connect builds it from the folder `mc-looks-app/`, which has the same name. The application has no endpoint and no secured configuration.
2. Make the repository available to Connect. If it is private, use the SSH URL and grant read access to the `connect-mu` machine user, as the [Connect documentation](https://docs.commercetools.com/merchant-center-customizations/deployment/commercetools-connect) describes.
3. Create a Connector for the repository and a release tag, publish it for private use, and deploy it with the deployment values above. The Merchant Center or the Connect API can do this, and the same documentation covers both.
4. Set the Application URL of the registration to the URL Connect reports for `mc-looks-app`, set the state to "Ready" and install the application for the project. The URL is known only after the first deployment. If the application does not load after this, redeploy the same tag once.

## 4. Local development

```shell
cd mc-looks-app
npm install                     # also generates the Nimbus theme types
cp ../.env.example .env.local   # set INITIAL_PROJECT_KEY, CUSTOM_APPLICATION_ID, ...
npm start                       # development server on http://localhost:3001
```

The `start` and `build` scripts set `ENABLE_NEW_JSX_TRANSFORM` themselves, so no `.env` file is needed for the build.

`npm run generate-types:ctp` opens a browser for a Merchant Center login and writes the GraphQL types. A person must run it; it cannot run in a headless job.

## 5. Permissions check

A user with neither View nor Manage has no "Looks" menu entry, and a direct URL shows the Merchant Center's no-permission page. Record the result of this check for your project here when you run it.
