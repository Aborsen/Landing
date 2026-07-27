---
title: Security
description: How Insightis keeps your account and your data safe — how you sign in, how to change your password or delete your account, how your connected data is protected, and how to report a security issue.
breadcrumb: Docs / Account / Security
---

## How you sign in

Insightis accounts sign in one of two ways, and you choose which when you [create your account](/docs/create-an-account):

- **Email and password** — the email you signed up with, plus a password you set.
- **Google** — click **Continue with Google** and authenticate with your Google account. There is no separate Insightis password to manage.

## Changing your password

Open the account menu at the bottom of the sidebar, choose **My Account**, and use **Change password**. If you signed in with Google there is no Insightis password to change — your Google account controls access.

Locked out? Use the **Forgot password?** link on the [sign-in page](/auth/sign-in) to receive a reset link at your account email.

## How your connected data is protected

Insightis is designed to read your systems, not to copy them:

- **Read-only access.** Connectors request the minimum permission needed to read the data you selected — never to write or delete.
- **Encrypted in transit and at rest.** Traffic uses TLS, and stored data is encrypted on disk.
- **Credentials are kept separate.** Connection credentials are stored encrypted, are not displayed again after you enter them, and are never sent to the AI models that answer your questions.
- **Never used to train AI models.** Your data is not used to train models.

See [Data Storage](/docs/data-storage) for exactly what is stored, and the [Privacy Policy](/security/privacy) for the formal commitments.

## Deleting your account

From **My Account** you can delete your Insightis account outright. Deleting is permanent: the datasets you have connected or uploaded and your chat sessions are cleared as well. If you only want to stop being billed, change your plan from **Manage Plan** instead — see [Payments & Billing](/docs/payments-billing).

## Reporting a security issue

If you believe you have found a vulnerability in Insightis, email **security@insightis.ai**. We acknowledge reports within one business day and aim to ship fixes for confirmed issues within thirty days. Responsible disclosure is welcomed.

For anything else security-related, [contact us](/company/contacts) or reach the team from **Support** in the account menu.
