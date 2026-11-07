# QA and delivery checklist

Use the checks that match the requested output and label every check as passed, failed, skipped, or uncertain.

## Technical checks

- the file opens with a real decoder;
- duration is within the requested tolerance;
- width, height, frame rate, codec, and pixel format are recorded;
- expected audio tracks exist and are decodable;
- the file is complete and not a partial download;
- the playback copy, when present, has the same encoded stream content as the original.

## Content checks

- the requested subject, product, and reference relationship are visible;
- the shot order or causal story is understandable;
- dialogue and timing are checked by listening when wording matters;
- captions, music, voice-over, logos, and watermarks match the request;
- character, wardrobe, location, and prop continuity is sampled across transitions;
- product claims are limited to confirmed facts.

Sampling evidence is useful but does not prove every frame or every spoken word. Say exactly what was sampled and what remains for the user to watch or hear.

## Delivery record

Keep a small `QA.md` or JSON record with:

```json
{
  "artifact": "final.mp4",
  "task_id": "redacted-or-local-id",
  "technical": {"decode": "passed", "duration_seconds": 30.048},
  "content": {"frame_sampling": "passed", "full_listening": "uncertain"},
  "known_limits": ["billing not independently verified"]
}
```

The delivery response should include the playable file, prompt or script reference, provider/model, task status, and known limitations. Never claim exact prompt fidelity or full audiovisual acceptance from metadata alone.
