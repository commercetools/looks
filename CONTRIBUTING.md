# Contributing

Thank you for wanting to improve Looks. The code is shared as reference code (see [`SUPPORT.md`](./SUPPORT.md)), so reviews may take a while. Small, focused changes with a clear reason are the easiest to review. Open an issue first for anything larger.

## Before you open a pull request

From `mc-looks-app/`, these must pass:

```shell
npm run lint
npm run typecheck
npm test
npm run build
```

## Conventions

- Components are arrow functions typed with `FC`, with the props in a `type <Name>Props` above them.
- Every UI text goes through react-intl. The English default lives in the component's `messages.ts`, the German text in `src/i18n/data/de.json`. After changing a message, run `npm run extract-intl` and add the German text by hand.
- Controls that need Manage permission are disabled for users without it, never hidden.
- New source files carry the SPDX header that the existing files use.

By contributing you agree that your contribution is licensed under the MIT license of this repository.
