# HookURL: receive events from stores

HookURL gives you **one receive link per device** (WhatsApp number). Give the link to an external store (Shopify, Salla, Zid or any custom app) so it can send you events. You can then use these events in the existing Webhook section of the dashboard.

## What the dashboard page says
- Each link is tied to exactly one device.
- Create a link: give it a name that describes the use (for example "Shopify Orders"), then Create.
- **Secret (optional)**: sent in the `X-Hook-Secret` header. If it is empty, any request that carries the token is accepted. If it is set, the caller must send that header.

## Recommendation
Set a secret. Without one, anyone who learns the link can post events to it.

## Not documented (so not invented here)
The link format, the event payload shape, retry behavior and how events map to Webhook rules. Treat the link and secret like passwords. Never put them in a public repository or issue.

Related: [webhooks guide](webhooks-guide.md) · [WooCommerce guide](https://github.com/whats360-api/whats360-integration-examples/blob/main/woocommerce-no-code.md)
