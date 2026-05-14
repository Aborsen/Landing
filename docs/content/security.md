---
title: Security
description: How Insightis keeps your account and your data safe — authentication, single sign-on, two-factor, session controls, and the audit log that records every action.
breadcrumb: Docs / Account / Security
---

## Authentication options

Out of the box, every Insightis account supports email-and-password sign-in plus social sign-in through Google and Microsoft. Business and Enterprise workspaces can enforce single sign-on through any SAML 2.0 identity provider — once enforced, members can only sign in through your IdP and password auth is disabled for the workspace.

## Two-factor authentication

Two-factor authentication (2FA) is available to every user and can be required for everyone in a workspace by an Admin. Insightis supports time-based one-time passwords (TOTP) from any standard authenticator app, and security keys using WebAuthn — including platform authenticators like Touch ID and Windows Hello. Backup codes are generated when 2FA is enabled so you can recover access if you lose your device.

## Sessions and devices

The **Settings → Security** page lists every active session — browser, IP, last activity — and lets you revoke any of them with a single click. Sessions expire automatically after a configurable idle period; Enterprise plans can tighten this down to as little as fifteen minutes. Signing out of one device does not affect the others unless you explicitly revoke the session.

## Audit log

Every action that touches data, permissions, or billing is recorded in the workspace audit log. Admins can filter by user, by action type, or by time range, and export the log as CSV or JSON. Enterprise plans support streaming the log to your own SIEM (Splunk, Datadog, or any S3-compatible bucket) so it lives alongside the rest of your security telemetry. Audit log retention follows the windows described on the Data Storage page.

## Reporting a security issue

If you believe you have found a vulnerability in Insightis, please report it to security@insightis.ai. We acknowledge reports within one business day and aim to ship fixes for confirmed issues within thirty days. Responsible disclosure is welcomed and we publish a credit list for researchers whose findings are validated.
