# Workflow stages and handoff contract

This document describes the portable workflow behind the local Scene Studio project. It is intentionally provider-neutral; provider-specific API details belong in an adapter, not in the skill entrypoint.

## 1. Intake

Create a production ID before collecting files. Record:

- requested output and intended platform;
- source files, links, hashes, and access status;
- target duration, ratio, resolution, language, dialect, and style;
- product, audience, scene, call to action, and publishing boundary;
- user authorization boundary, including whether generation or publication is authorized.

If a reference link cannot be downloaded or identified, keep the request at intake. Do not infer the source from a short link or filename alone.

## 2. Evidence and brief

Preserve source media read-only. Record measurable facts separately from interpretation:

| Evidence | Record | Mark uncertain when |
| --- | --- | --- |
| Media | duration, dimensions, frame rate, codecs, audio tracks, hash | the file is partial or decoder output conflicts |
| Dialogue | timestamped transcription and speaker order | only ASR is available or wording is hard to hear |
| Product | confirmed specifications, price, stock, claims, CTA | the user or merchant has not supplied proof |
| Visuals | shot boundaries, camera movement, characters, props | sampling does not cover the full segment |

For commerce or branded work, collect the merchant brief before finalizing claims. A creative beat may be written with placeholders, but the prompt must not present the placeholder as a verified fact.

## 3. Script and self-review

Freeze the script only after checking:

1. one continuous causal line or an intentional montage structure;
2. visible product presence at the beats where the claim is spoken;
3. dialogue that fits the requested duration and language register;
4. action, wardrobe, props, and locations that can be generated or filmed;
5. a clear ending, CTA, or handoff when the user requested conversion.

Keep revisions as separate versions. The approved script is the only source used for the final prompt.

## 4. Prompt and preflight

The prompt should state subject, action, camera, environment, continuity, dialogue or audio direction, timing, and exclusions at the level supported by the selected model. Do not silently add subtitles, music, voice-over, or post-production.

Before submission, persist a preflight snapshot containing:

```json
{
  "provider": "provider-name",
  "model": "model-id",
  "duration": 30,
  "resolution": "720p",
  "ratio": "16:9",
  "image_count": 2,
  "audio_reference": false,
  "video_reference": false,
  "estimated_cost": null,
  "authorization_scope": "one submission"
}
```

The values are examples of fields, not defaults. The selected model's live capability record wins over a remembered catalog.

## 5. Submission and resumption

Persist intent before uploading or submitting. A minimal state machine is:

`DRAFT → PREFLIGHTED → UPLOADING → SUBMITTING → IN_QUEUE → IN_PROGRESS → COMPLETED`

Terminal alternatives are `FAILED` and `UNKNOWN`. `UNKNOWN` means the client cannot prove whether the provider accepted the request. It is never a reason to submit the same request again automatically.

On resume, use the production ID and provider task ID to query the original task. If no trustworthy task ID exists, require a human check in the provider console before starting a new attempt.

## 6. Local save and QA

Download completed media to a partial file, verify byte completion, then atomically rename it. If the provider supports validators, resume interrupted downloads with `Range` and `If-Range`. Remuxing for fast playback is allowed only when the audio and video streams are copied; preserve the original file.

QA must distinguish:

- technical checks that were actually run;
- visual or audio checks performed by sampling;
- machine transcription clues;
- unresolved issues requiring user review.

## 7. Delivery

The delivery record should link the final file to its prompt, manifest, provider task, and QA note. Include known limitations such as incomplete listening, sampled frames, provider-added subtitles, or unverified billing. Do not present a provider estimate as a settled invoice.
