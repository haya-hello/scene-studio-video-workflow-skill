---
name: scene-studio-video-workflow
description: Run an end-to-end AI video production workflow from reference intake and product briefing through script, prompt, provider submission, local caching, QA, and delivery. Use when a user wants a complete video generation pipeline or a repeatable production handoff; do not use for prompt-only polishing or generic video advice.
metadata:
  short-description: End-to-end video production workflow
---

# Scene Studio Video Workflow

Use this skill to turn a video request into a traceable, reviewable production run. Keep content decisions, provider decisions, paid actions, and delivery evidence separate so a later agent can resume without guessing.

## Operating contract

- Start from the user's requested stage. If the user already has a script or prompt, preserve it and begin at the next missing gate.
- Keep a single production folder or record per attempt. Never overwrite an earlier attempt, provider response, prompt, or QA result.
- Treat reference material as evidence. Record source identity, duration, aspect ratio, readable dialogue, product facts, and uncertain observations separately.
- Separate confirmed product facts from creative invention. Never turn an unverified feature, price, specification, or guarantee into a factual claim.
- Before any paid upload or generation, show the frozen prompt, provider/model, duration, resolution, aspect ratio, reference count, expected cost or pricing basis, and retry policy. Execute only with authorization for that concrete submission.
- Submit once per authorization. If the response is missing, ambiguous, or has no trustworthy task ID, mark the attempt `UNKNOWN`, ask the user to check the provider, and do not retry automatically.
- Query and download an existing task are safe continuation actions; they must never create a new generation.
- Keep credentials, user media, signed URLs, task records, and generated videos outside the public package and outside public documentation.

## Workflow

1. **Intake and routing.** Identify the intended output, source materials, target platform, duration, aspect ratio, resolution, language or dialect, product, audience, and current stage. Create a production ID and read only the references needed for that stage.
2. **Evidence pass.** For a reference video, verify identity, preserve the original file, extract timestamps and machine transcription, and mark what still requires human listening or visual review. For a product video, collect the product brief or merchant questionnaire before writing claims.
3. **Creative pass.** Draft or revise the script, then run a self-review for continuity, shootability, dialogue, product visibility, and conversion handoff. Freeze the approved script before converting it to a generation prompt.
4. **Prompt and preflight.** Convert the script into a model-compatible prompt while preserving approved dialogue and timing. Check model capabilities, input order, audio or video reference support, duration limits, resolution, ratio, prompt length, and expected charges. Save a preflight snapshot.
5. **Submission.** Use a provider adapter with explicit capability validation, credential isolation, safe URL validation, and a persisted `SUBMITTING` state before the network mutation. Save the exact request summary and returned task ID. Never hide a provider-specific rejection behind a generic success state.
6. **Polling and local save.** Poll the original task with bounded concurrency. When complete, download to a partial file, resume with `Range` and validators when supported, verify the result, and only then expose it as playable. A playback optimization may remux without re-encoding; preserve the original output.
7. **QA and delivery.** Check container decodability, duration, resolution, frame rate, audio presence, sampled frames, dialogue/transcription, continuity, product visibility, and known uncertainties. Deliver the file with its prompt, manifest, QA note, and limitations. Do not claim full visual or audio fidelity when only sampling or ASR was performed.
8. **Publish handoff.** If the user requests publishing, treat it as a separate authorization and preserve the final artifact, platform identifier, URL, timestamp, and publication result. Do not bundle publishing into generation approval.

## Stage routing

- Read [references/workflow.md](references/workflow.md) for stage gates, artifacts, and resumption rules.
- Read [references/provider-contract.md](references/provider-contract.md) when adding or selecting a provider adapter.
- Read [references/qa-and-delivery.md](references/qa-and-delivery.md) before calling a result final.
- Read [references/public-release.md](references/public-release.md) when packaging this workflow or any project for a public repository.

## Default artifact set

Use the smallest set that makes the run reproducible: `BRIEF.md`, `reference.md` or `evidence.md`, `script.md`, `prompt.txt`, `preflight.json`, `manifest.json`, `state.json`, and `QA.md`. Store private media and credentials in ignored local directories; store only schemas, redacted examples, and workflow guidance in a public package.

## Stop conditions

Stop and request input when the source identity is uncertain, a product claim is unverified, the selected model cannot satisfy the requested inputs, cost or authorization is missing, or a provider response leaves submission status unknown. Stop delivery when decoding, duration, dimensions, or the requested content cannot be verified.
