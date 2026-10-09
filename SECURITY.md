# Security Policy

## Supported Versions

Security reports are accepted for the latest source on the `main` branch. Maintainers prioritize fixes for that line; older commits, tags, downstream forks, and independently deployed contracts are not guaranteed security updates. Please reproduce issues against current `main` where possible.

| Version | Security support |
| --- | --- |
| Latest `main` | In scope for security triage and fixes |
| Older revisions and third-party forks | Best effort; no guaranteed backports |

## In Scope

- Soroban sample marketplace contract, storage, payments, and authorization: `contracts/sampled/src/lib.rs`, `contracts/sampled/src/storage_key.rs`, and related contract code.
- Wallet connections and transaction signing: `src/util/wallet.ts`, `src/hooks/useWallet.ts`, `src/providers/WalletProvider.tsx`, and `src/hooks/useSampledContract.ts`.
- Pinata upload integration, credential handling, and exposure risk: `src/hooks/usePinata.ts`, `.env.example`, and the upload flow in `src/components/upload/`.
- Frontend issues that could compromise user funds, credentials, sessions, or private user data.

Third-party wallet providers, Pinata's hosted infrastructure, Stellar network consensus, and unrelated services are outside this repository's direct control. Reports of an unsafe integration or misuse within this codebase are in scope.

## Reporting a Vulnerability

**Please do not disclose exploitable details, credentials, or proof-of-concept payloads in public issues or pull requests.**

1. Use GitHub's private vulnerability reporting flow for this repository: [Report a vulnerability](https://github.com/sampled-labs/sampled/security/advisories/new) (under **Security → Advisories** when private reporting is enabled).
2. Include the affected commit/version, component paths, impact, reproduction steps, and a safe proof of concept. Redact access tokens, wallet secrets, personal information, and private infrastructure details.
3. If GitHub does not offer a private-report option, open a **non-sensitive** repository issue requesting a private contact channel. Do not put the vulnerability itself in that public request.

The proposed response target is **an acknowledgement within five business days**, with an initial triage update within **ten business days**. These are targets for maintainer confirmation, not a guaranteed response or remediation deadline. Reporters can coordinate disclosure timing with maintainers once a fix or mitigation is ready.
