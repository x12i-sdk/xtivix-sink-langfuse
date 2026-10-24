# @x12i/xtivix-sink-langfuse usage example

xtivix sink that sends records to Langfuse as OpenTelemetry GenAI spans.

This consuming application demonstrates **deliver an otlp span to a local http fixture** using the published npm package, pinned to `1.2.0`.

## Run

Requires Node.js 24 or newer and npm. The example needs no service credentials.

```sh
npm install --ignore-scripts
npm start
```

## Example

[`src/index.mjs`](src/index.mjs) contains the complete example. Assertions check the demonstrated behavior and the program prints a small result.

## When to use the package

- Convert canonical xtivix records into OpenTelemetry GenAI spans for Langfuse.
- Add Langfuse delivery to a collector without embedding it in each provider adapter.

## Links

- [npm package](https://www.npmjs.com/package/@x12i/xtivix-sink-langfuse)
- [Implementation monorepo](https://github.com/x12i/xtivix)
- [Reviewed package source](https://github.com/x12i/xtivix/tree/a87970694c9ee67967a2c51cfdbad8d39130db7a/packages/sinks/langfuse)

The `package.json` in this repository is private to prevent accidental publication of the example application under an npm package name.

## Synthetic provider data

All calls, models and messages in the source are local fixtures for the pinned package API. No provider endpoint is queried and no real log data or credential is used. The sink example injects an HTTP fixture, so its result does not establish acceptance by a deployed Langfuse service.
