# Public release checklist

Use this checklist before publishing the skill or a project-derived package to a public repository.

## Keep

- `SKILL.md`, `agents/openai.yaml`, focused references, validation scripts, and redacted examples;
- provider-neutral interfaces and reproducible local checks;
- links to upstream projects that influenced the structure, with the adopted portion explained;
- a license and a README that states what the package does and how to install it.

## Remove or redact

- API keys, cookies, access tokens, signed URLs, local absolute paths, database files, task exports, private logs, user images, reference videos, generated videos, and merchant or customer data;
- provider account identifiers, private endpoints, filenames that expose a person or campaign, and screenshots containing browser state;
- exact production prompts or scripts when they contain unpublished client material.

Run a secret scan and inspect the staged diff. A `.gitignore` rule is not enough if a sensitive file was already staged or committed.

## Repository contract

- The repository must be public only after the staged contents have been reviewed.
- The default branch should contain a clean installable skill directory.
- The README should point to the skill entrypoint and the validation command.
- Record the upstream references used during design and state what was adapted.
- Public visibility is a repository setting; it does not make private source media or credentials safe to include.
