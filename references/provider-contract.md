# Provider adapter contract

Use this contract when a local video workbench supports multiple providers. The adapter isolates credentials and provider quirks from the creative workflow.

## Required operations

Each adapter should expose equivalents of:

- `discoverModels()` or a checked capability catalog;
- `validateInput(input, capability)`;
- `uploadReferences(input, credentials)`;
- `submit(input, credentials)`;
- `query(taskId, credentials)`;
- `fetchResult(taskId, credentials)`;
- `verifyConnection(credentials)`.

Return normalized fields such as `provider`, `model`, `requestId`, `status`, `videoUrl`, `assets`, and structured error metadata. Keep the raw provider response in a private run record when debugging requires it.

## Capability checks

Validate before upload whenever possible:

- allowed duration and whether it is integer-only;
- ratio and resolution;
- image, audio, and video reference limits;
- whether references are positional;
- prompt length and language constraints;
- audio or avatar prerequisites;
- billing unit and known upload or storage fees.

Reject unsupported input locally. A local rejection must not upload media or create a paid task.

## Credential and URL boundaries

- Read the key only from a local secret store or environment variable.
- Never place a key in a job response, public log, prompt, screenshot, or Git history.
- Accept only HTTPS result URLs from an allowlisted provider origin. Reject credentials embedded in URLs, cross-origin paths, and unexpected redirects.
- If a provider returns a root-relative asset path, resolve it against that provider's origin, never against the local web page origin.

## Submission safety

Write `SUBMITTING` before the mutation. On any timeout, connection reset, malformed success response, or missing task ID, return an `uncertain` error and persist `UNKNOWN`. The caller must show the user how to verify the original request and must not retry silently.

## Query and download safety

Querying an existing task is idempotent. Downloading or remuxing an existing result is idempotent. A failed download may be retried; a failed or uncertain generation submission may not be retried without a new authorization and a new production attempt.
