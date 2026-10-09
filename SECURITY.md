# Security Policy

## Supported versions

| Code version | Security support |
| --- | --- |
| Current `main` branch | Security reports accepted; fixes evaluated on a best-effort basis |
| Previous commits and unreleased forks | No guaranteed security maintenance |

This repository does not currently document a separately supported release series. Include the deployed commit SHA when reporting an issue.

## Scope

Please report vulnerabilities involving this repository's code, particularly:

- Soroban contract logic and authorization under `contracts/sampled/src/`
- Wallet connections, signing, and network selection in `src/util/wallet.ts` and `src/hooks/useSampledContract.ts`
- Pinata upload and credential handling in `src/hooks/usePinata.ts` and the related environment configuration
- User data, purchase access, local storage, and downloadable asset handling in `src/`

For vulnerabilities in third-party libraries or hosted services outside this repository, report directly to the corresponding maintainer or provider.

## Private vulnerability reporting

Use GitHub's [private vulnerability report form](https://github.com/sampled-labs/sampled/security/advisories/new) (repository **Security** tab, then **Report a vulnerability**) if that option is enabled. Do not post vulnerability details, proof-of-concept exploits, private keys, Pinata credentials, or personal data in public issues or pull requests.

If GitHub does not offer the private reporting form, contact a repository maintainer through a private contact method listed on their GitHub profile and request a secure reporting channel **without disclosing the exploit in public**. The project should enable GitHub private vulnerability reporting if it is not already available.

Include the affected commit/version, impact, clear reproduction steps, environment, and any suggested mitigation; redact secrets and other users' data.

## Response and disclosure

The proposed acknowledgment target is **five business days**, on a best-effort basis rather than a guaranteed SLA. The maintainers will need to confirm their actual response capacity and coordinate triage, remediation, and disclosure with the reporter. Please allow reasonable time to resolve an issue before making technical details public.
