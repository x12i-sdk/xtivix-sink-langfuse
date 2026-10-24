import assert from 'node:assert/strict';
import { canonicalAdapter } from '@x12i/xtivix-adapter-canonical';
import { langfuseSink } from '@x12i/xtivix-sink-langfuse';
const source = { id: 'demo-source', provider: 'custom', store_content: true };
const input = {
  provider_record_id: 'call-1', started_at: '2026-01-01T00:00:00.000Z', operation: 'chat', model: { raw: 'demo/model' }, status: 'ok', metadata: { purpose: 'example' },
  request: { messages: [{ role: 'user', parts: [{ type: 'text', text: 'Hello' }] }] },
  response: { messages: [{ role: 'assistant', parts: [{ type: 'text', text: 'A local fixture' }] }] },
  usage: { input_tokens: 3, output_tokens: 4 }, cost: { source: 'none' },
};
const parsed = canonicalAdapter.parse(input, { source, receivedAt: '2026-01-01T00:00:01.000Z' });
assert.equal(parsed.rejections.length, 0, JSON.stringify(parsed.rejections));
assert.equal(parsed.records.length, 1);
const record = parsed.records[0];
const calls = [];
const context = {
  config: { id: 'demo-sink', type: 'langfuse', settings: { host: 'https://langfuse.example.invalid', public_key: 'fixture-public', secret_key: 'fixture-secret' } },
  signal: new AbortController().signal,
  log: { debug() {}, info() {}, warn() {}, error() {} },
  fetch: async (url, init) => {
    assert.equal(new URL(url).pathname, '/api/public/otel/v1/traces');
    const body = JSON.parse(init.body);
    assert.equal(body.resourceSpans[0].scopeSpans[0].spans.length, 1);
    calls.push({ url: String(url), spans: 1 });
    return Response.json({});
  },
};
const results = await langfuseSink.deliver([record], context);
assert.equal(results[0].outcome, 'delivered');
assert.equal(calls.length, 1);
console.log({ calls, results });
