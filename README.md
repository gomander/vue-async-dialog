# vue-async-dialog

This is a proof-of-concept for a reusable asynchronous dialog pattern.

## Goals

- Stay lightweight and fast as the number of dialogs in your app grows
- Avoid template bloat from having multiple dialog components
- Enable effective code-splitting
- Provide a simple API
- Use native browser APIs to be as accessible as possible
- Allow a wide range of customization

## Usage

Grab `AsyncDialog.vue` and paste it into your app. Check `App.vue` for how to
use it.

## Alternative non-modal implementation

In cases where the HTML `<dialog>` element's modal nature causes issues for other
components that you want to be able to appear on top,
`AsyncDialogAlternative.vue` may work better.

## Contributing

Issues and pull requests welcome!
