# Whats360 Webhooks

Derived from the webhook guide inside the Whats360 dashboard. No request or integration was run to write it. Receive URLs and secrets below are placeholders.

## What is a webhook?
A URL that receives data automatically when an event happens. Example: a new WhatsApp message arrives and its data is sent to your URL. Common uses: save customers in a CRM, notify your team, trigger Zapier or Make, log chats to a database.

## Outgoing and incoming
| Type | Meaning | Use when |
|---|---|---|
| Outgoing | Whats360 sends data to your URL on events | Tell an external system about an incoming message or a failed send |
| Incoming | An external service sends data to a private URL for your account, and Whats360 turns it into a WhatsApp message | A store sends a new order and the customer gets a message |

## Events
| Event | When |
|---|---|
| Incoming message | A new message is received |
| Outgoing message | A message is sent |
| Send failure | A message fails to deliver |
| Subscription end | The subscription is near or at its end |

## Outgoing payload fields (custom webhook)
| Field | Meaning |
|---|---|
| phone | Sender or receiver number |
| sender_name | Sender name |
| message | Message text |
| message_id | Message ID |
| chat_jid | Chat ID |
| timestamp | Message time |
| media_url | Media link if any |
| instance_id | Device ID |

Add custom headers (for example Authorization) when your endpoint needs them. Respond `200 OK` quickly.

## Incoming webhook
1. Create an Incoming webhook in the dashboard. A private receive URL is generated.
2. Paste it into the external system.
3. Set Field Mapping: JSON paths for phone, message and name, matching what the sender posts.

Example request (IDs are placeholders):
```
POST /api/instances/{id}/webhooks/{webhook_id}/incoming
Content-Type: application/json

{"phone": "+201234567890", "message": "Your order #1234 is confirmed!", "name": "Ahmed"}
```
Expected response on success:
```json
{"status": "success", "message": "Webhook received successfully"}
```

## Shopify
1. Whats360: create an Incoming webhook with the Shopify template. Copy the receive URL.
2. Shopify: Settings, Notifications, Webhooks, Create Webhook. Pick the Topic, paste the URL, Format JSON.
3. Save.

Topics: orders/create, orders/updated, orders/paid, customers/create.

Sample payload:
```json
{"id": 820982911946154508, "order_number": 1234, "total_price": "199.00", "customer": {"first_name": "Ahmed", "phone": "+201234567890"}}
```
Shopify sends `X-Shopify-Hmac-SHA256`; add a Secret when creating the webhook for automatic verification. Shopify retries if it gets no 200 within 5 seconds.

## WooCommerce
1. Whats360: create an Incoming webhook with the WooCommerce template. Copy the receive URL.
2. WordPress: WooCommerce, Settings, Advanced, Webhooks, Add Webhook. Name, Status Active, Topic, paste the URL in Delivery URL.
3. In Secret, enter the same secret you set in Whats360. Save.

Topics: Order created, Order updated, Customer created, Product updated.

Sample payload:
```json
{"id": 727, "status": "processing", "total": "150.00", "billing": {"first_name": "Sara", "phone": "+966501234567"}}
```
Troubleshooting: WooCommerce, Status, Logs. WooCommerce disables a webhook after repeated failures, so make sure the endpoint returns 200 OK.

## n8n
1. Create a webhook in the Whats360 dashboard and copy the notification URL.
2. In n8n add a Webhook trigger node and paste the URL.
3. Add actions such as Google Sheets or email.
4. Activate and test by sending a WhatsApp message.

## Templates shown in the dashboard
A template existing does not guarantee a ready integration. Check each template's setup before relying on it.

| Template | Type |
|---|---|
| New order, Shopify | Incoming |
| New order, WooCommerce | Incoming |
| Custom webhook | Outgoing |
| Odoo, WhatsApp integration | Outgoing |
| Odoo, notifications | Incoming |
| Salla, store notifications | Incoming |
| Zid, store notifications | Incoming |
| EasyOrders / YouCan | Incoming |
| Meta Lead Ads | Incoming |
| Google Sheets / Forms | Incoming |
| Payment gateways | Incoming |
| Make / Zapier | Outgoing |
| Zoho CRM / HubSpot | Outgoing |
| Media routing | Outgoing |

## Testing
- Test first with a number you own and a test order.
- Make your receiver answer 200 fast.
- Use a Secret to verify the source and never share it.

## Example receiver (Node.js, outgoing webhook)
See [node-webhook-receiver.js](node-webhook-receiver.js). It only logs documented fields and returns 200.
