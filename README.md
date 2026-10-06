# agenticworkflow

## React + TypeScript playground

`copilot-playground` is a small Vite app for experimenting with GitHub Copilot.

```powershell
cd copilot-playground
npm install
npm run dev
```

Open the local URL printed in the terminal. See the playground's README for
build commands and feature ideas.

## Function comment review agent

The **Function Comment Review** GitHub Actions agent runs on opened, updated,
reopened, or ready-for-review PRs touching `copilot-playground/src/**`. Draft PRs
are skipped. It checks every implemented function in added, modified, or renamed
JavaScript/TypeScript files within that folder at the PR head revision, including
React components, methods, arrow functions, and anonymous callbacks. Complete
files are reviewed, so unchanged functions within a modified file are included,
but untouched and deleted files are ignored. Renames use the new file path.
Assets, declaration files, and symbolic links are excluded. Incomplete changed-file
lists (including PRs exceeding GitHub's 3,000-file limit) fail explicitly.

A directly associated JSDoc, block, line, or JSX comment must explain the
function's purpose. Empty comments, TODO-only notes, unrelated headers, and a
parent function's comment do not document nested callbacks. No particular format
or parameter/return tags are required.

Missing explanations produce one advisory PR comment with file names and line
numbers. Clean reviews and duplicate reports produce no comment. The agent
does not change source or block merging; it is an AI review, not a deterministic
lint rule.

GitHub Actions and Copilot access must be enabled for the repository. The workflow
uses `copilot-requests: write` for the default Copilot engine; repository and PR
access in the agent job remain read-only, with comments handled by gh-aw safe
outputs. Default gh-aw team-only trigger protections apply. The compiled workflow
skips fork PRs; it does not use `pull_request_target` or execute PR source to bypass
those restrictions.

The source is `.github/workflows/function-comment-review.md`. After editing it,
run `gh aw compile function-comment-review --strict` and commit the generated
`.github/workflows/function-comment-review.lock.yml` alongside it.

## Manual full-source audit

**Function Comment Audit** is a separate manually triggered workflow that checks
all JavaScript/TypeScript functions in `copilot-playground/src`, using the same
comment rules as the PR reviewer. It creates one issue containing the full list
of missing explanations with file paths, line numbers, and callback names.
Clean audits also create an issue showing zero findings. Previous issues are
retained as history; source code is never modified.

After the workflow is merged into the default branch, open **Actions > Function
Comment Audit > Run workflow**, select the branch to audit, and start the run.
Alternatively, run:

```powershell
gh workflow run function-comment-audit.lock.yml --repo Bovfir/agenticworkflow --ref main
```

The report identifies the exact audited commit and links to its Actions run.
The same Actions/Copilot prerequisites apply. Assets, declaration files, and
symbolic links are excluded. Incomplete source collection or reports too large
for one issue are reported as incomplete, not silently truncated.

After editing `.github/workflows/function-comment-audit.md`, run
`gh aw compile function-comment-audit --strict` and commit its generated lock file.