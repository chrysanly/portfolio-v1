# Design Skills Prompt — portable UI/UX brief for any AI coding agent

**How to use this file:** copy it into the root of any project, then tell your agent:

> Read `DESIGN_SKILLS_PROMPT.md` and follow it for this task: <describe your UI task>

This file is deliberately project-agnostic and tool-agnostic. It works with Claude Code,
Codex CLI, Cursor, Cline, Copilot, Amp, Antigravity, Windsurf, Gemini CLI, or any other
agent that can read files and run shell commands.

---

## PART 0 — MANDATORY FIRST STEP: verify the skills are installed

Do this **before** writing any code. Do not skip it and do not assume.

The skills below live in one of these locations, depending on the harness:

| Location | Used by |
| --- | --- |
| `.agents/skills/<name>/SKILL.md` | Universal (Codex, Cline, Copilot, Amp, Antigravity, Cursor, …) |
| `.claude/skills/<name>/SKILL.md` | Claude Code (project scope) |
| `~/.claude/skills/<name>/SKILL.md` | Claude Code (user scope, all projects) |

### Step 0.1 — Check what exists

Run this from the project root (bash / git-bash / WSL):

```bash
for s in emil-design-eng apple-design review-animations improve-animations \
         find-animation-opportunities animation-vocabulary pick-ui-library prototype \
         impeccable frontend-design design-taste-frontend stitch-design-taste \
         ui-ux-pro-max ui-styling design design-system brand high-end-visual-design \
         redesign-existing-projects minimalist-ui industrial-brutalist-ui gpt-taste; do
  if [ -f ".agents/skills/$s/SKILL.md" ] || [ -f ".claude/skills/$s/SKILL.md" ] \
     || [ -f "$HOME/.claude/skills/$s/SKILL.md" ]; then
    echo "OK      $s"
  else
    echo "MISSING $s"
  fi
done
```

PowerShell equivalent:

```powershell
$skills = @('emil-design-eng','apple-design','review-animations','improve-animations',
  'find-animation-opportunities','animation-vocabulary','pick-ui-library','prototype',
  'impeccable','frontend-design','design-taste-frontend','stitch-design-taste',
  'ui-ux-pro-max','ui-styling','design','design-system','brand','high-end-visual-design',
  'redesign-existing-projects','minimalist-ui','industrial-brutalist-ui','gpt-taste')
foreach ($s in $skills) {
  $found = @(".agents\skills\$s\SKILL.md", ".claude\skills\$s\SKILL.md",
             "$HOME\.claude\skills\$s\SKILL.md") | Where-Object { Test-Path $_ }
  if ($found) { "OK      $s" } else { "MISSING $s" }
}
```

### Step 0.2 — If anything is MISSING, install it, then re-run the check

**Tell the user plainly which skills were missing and that you are installing them.**
Each command is safe to re-run; it upgrades in place.

```bash
# 1. Emil Kowalski — animation + UI polish
#    Provides: emil-design-eng, apple-design, review-animations, improve-animations,
#              find-animation-opportunities, animation-vocabulary, pick-ui-library, prototype
npx --yes skills@latest add emilkowalski/skills
```

```bash
# 2. Impeccable — design review/audit engine + pre-commit design hooks
#    Provides: impeccable  (also installs hooks into .claude / .agents)
npx --yes impeccable install
```

```bash
# 3. Taste skill — anti-generic frontend direction
#    Provides: design-taste-frontend, design-taste-frontend-v1, stitch-design-taste,
#              brandkit, high-end-visual-design, redesign-existing-projects,
#              minimalist-ui, industrial-brutalist-ui, gpt-taste, image-to-code, …
npx --yes skills@latest add Leonxlnx/taste-skill
```

```bash
# 4. UI/UX Pro Max — searchable design database
#    84 styles, 192 palettes, 74 font pairings, 98 UX guidelines, 16 GSAP presets,
#    25 chart types across 22 stacks
#    Provides: ui-ux-pro-max, ui-styling, design, design-system, brand, banner-design, slides
npx --yes skills@latest add nextlevelbuilder/ui-ux-pro-max-skill
```

```bash
# 5. Anthropic frontend-design (Claude Code only; skip on other harnesses)
#    Provides: frontend-design
claude plugin marketplace add anthropics/claude-plugins-official
claude plugin install frontend-design@claude-plugins-official
```

**Fallback for #5** if the `claude` CLI is unavailable or you are not on Claude Code —
vendor the single file directly:

```bash
mkdir -p .agents/skills/frontend-design
curl -fsSL -o .agents/skills/frontend-design/SKILL.md \
  https://raw.githubusercontent.com/anthropics/claude-plugins-official/main/plugins/frontend-design/skills/frontend-design/SKILL.md
```

> **Note on `npx skills`:** it writes the real skill to `.agents/skills/` and symlinks it
> into `.claude/skills/`. Both paths are expected — that is not duplication.
>
> **Note on trust:** these are third-party skills that execute with full agent
> permissions. If the user has not installed them before, say so and get confirmation
> before running the installers.

### Step 0.3 — Load the skills before designing

Once present, actually read them. Do not design from memory of this file alone.

- **Claude Code / Codex:** invoke them by name (e.g. `/impeccable`, or the Skill tool with
  `frontend-design`, `ui-ux-pro-max`, `emil-design-eng`, `design-taste-frontend`).
- **Any other agent:** `Read` the `SKILL.md` files for the skills relevant to the task and
  follow their instructions as if they were part of this prompt.

Pick by task — you do not need all of them at once:

| Task | Load these |
| --- | --- |
| New page / greenfield UI | `frontend-design`, `design-taste-frontend`, `ui-ux-pro-max` |
| Redesigning existing UI | `redesign-existing-projects`, `impeccable`, `frontend-design` |
| Colour / type / spacing decisions | `ui-ux-pro-max`, `design-system` |
| Animation & motion | `emil-design-eng`, `apple-design`, `improve-animations` |
| Reviewing a diff or auditing | `impeccable`, `review-animations` |
| Choosing a library vs building | `pick-ui-library` |
| Naming a motion effect | `animation-vocabulary` |

---

## PART 1 — Non-negotiable rules

These override any default habit you have.

1. **Audit before you touch anything.** On an existing UI, read the current CSS/tokens and
   name what is actually wrong before proposing a redesign. Do not restyle working code to
   express a preference.
2. **Respect the existing design language.** If the project has tokens, a mockup, or a
   design system, extend it. Do not import a different aesthetic on top of it.
3. **Verify in a real browser, not in your head.** Build, serve, and inspect computed
   styles. A rule that exists in the source file is not proof it applies to the element.
4. **Check CSS specificity explicitly.** Element resets (`.root ul { padding: 0 }`) silently
   outrank single component classes (`.my-list`). This is the single most common cause of
   "the CSS is right but the page is wrong". Confirm with
   `getComputedStyle(el)` — not by reading the stylesheet.
5. **Keep class names in sync with markup.** A CSS rule whose selector no element carries is
   dead code that looks like working code. Grep every new class against the templates.
6. **No magic numbers for content-driven sizes.** If content is editable (CMS, database,
   admin panel), it will outgrow any hardcoded `max-height`. Use
   `grid-template-rows: 0fr → 1fr`, `height: auto` interpolation, or measure at runtime.
7. **Meet the accessibility floor, every time.** Text contrast ≥ 4.5:1 (≥ 3:1 for ≥ 24px or
   bold ≥ 19px), visible `:focus-visible`, keyboard operable, `prefers-reduced-motion`
   respected, and a real hit target (≥ 44×44 CSS px on touch).
8. **Verify contrast numerically when you change any colour.** Do not eyeball it. Compute
   the ratio (see snippet in Part 3).
9. **Test the extremes.** 320px wide and ≥ 1440px wide. Longest realistic string, and the
   empty state.
10. **Spend boldness in one place.** One memorable signature element; everything around it
    quiet. Then remove one accessory.
11. **Do not delete or rewrite content to make a layout work.** Fix the layout.
12. **Report honestly.** If you could not visually confirm something, say exactly that and
    say what you verified instead.

---

## PART 2 — Workflow

### 1. Frame it
State in one or two sentences: the subject, the audience, and the single job of this
screen. If the brief does not pin these down, choose and say what you chose.

### 2. Audit (existing UI only)
List concrete defects with file:line references. Separate **bugs** (it does not do what the
code says) from **taste** (it works but reads as generic). Bugs are fixed first, and they
are usually the actual reason it "looks bad".

Common culprits worth checking directly:
- a class in CSS that no component uses (or vice-versa)
- an element reset outranking a component class
- inline `<span>`s that needed `display: block`, so text runs together
- `margin` on an inline element (inert)
- a fixed `max-height` clipping grown content
- a hardcoded neutral hue fighting a themeable accent

### 3. Plan the tokens
Before code, write a compact plan:
- **Colour:** 4–6 named values. State the contrast ratio of each text colour on its background.
- **Type:** 2–3 roles — display, body, and utility/mono. Name the actual families and the scale.
- **Layout:** the grid/rhythm in one sentence, plus an ASCII wireframe if it clarifies.
- **Signature:** the one element this screen is remembered by.
- **Motion:** what animates, why, duration + easing. Default to less.

### 4. Self-critique the plan before building
Ask: *would I have produced this for any other brief?* If yes, it is a default, not a
choice — revise it and say what changed.

Known AI-default looks to avoid unless the brief explicitly asks:
- cream `#F4F1EA` background + high-contrast serif + terracotta accent
- near-black + one acid-green or vermilion accent
- broadsheet layout, hairline rules, zero radius, dense columns
- gradient text on headings and metrics
- `01 / 02 / 03` numbered markers on content that is not a sequence
- glassmorphism blur on everything
- an emoji standing in for an icon

### 5. Build
Follow the plan. Derive every colour and size from the tokens.

### 6. Verify (required — see Part 3)

### 7. Report
What changed and why, what you verified and how, what you could not verify, and anything
you deliberately left alone.

---

## PART 3 — Verification

Run the project's own gates first — build, typecheck, lint, format, tests. All must pass:

```bash
# adapt to the project
npm run build && npm run lint && npx tsc --noEmit
```

Then check the rendered result in a browser. Verify **computed** values, not source:

```js
// Does the rule actually apply?
const el = document.querySelector('.my-element');
console.log(getComputedStyle(el).padding, getComputedStyle(el).display);

// Is any class dead? (in CSS but on no element)
console.log(document.querySelectorAll('.my-class').length);  // 0 === dead

// No horizontal overflow at any width
console.log(document.documentElement.scrollWidth <= window.innerWidth + 1);

// Is a collapsible clipping its content?
const p = document.querySelector('.panel');
console.log(p.scrollHeight <= p.getBoundingClientRect().height + 1);
```

Contrast, computed properly — `getComputedStyle` may return `oklab()`/`oklch()`, which you
cannot parse as RGB. Round-trip through canvas:

```js
const cv = document.createElement('canvas'); cv.width = cv.height = 1;
const ctx = cv.getContext('2d', { willReadFrequently: true });
const probe = document.createElement('span'); document.body.appendChild(probe);
const toRgb = (v) => {
  probe.style.color = v;
  ctx.fillStyle = '#000';
  ctx.fillStyle = getComputedStyle(probe).color;   // canvas normalises any colour space
  ctx.fillRect(0, 0, 1, 1);
  const d = ctx.getImageData(0, 0, 1, 1).data;
  return [d[0], d[1], d[2]];
};
const lin = (c) => (c /= 255) <= 0.03928 ? c / 12.92 : Math.pow((c + 0.055) / 1.055, 2.4);
const lum = ([r, g, b]) => 0.2126 * lin(r) + 0.7152 * lin(g) + 0.0722 * lin(b);
const ratio = (a, b) => {
  const [x, y] = [lum(a), lum(b)];
  return +(((Math.max(x, y) + 0.05) / (Math.min(x, y) + 0.05))).toFixed(2);
};
console.log('body text:', ratio(toRgb('var(--fg)'), toRgb('var(--bg)')));  // want >= 4.5
probe.remove();
```

**If the page is themeable, verify every theme and every accent setting** — not just the
default. A palette that only works at one hue is a latent bug.

### Two environment traps that produce false failures

1. **A hidden/backgrounded browser tab does not run `requestAnimationFrame`, CSS
   transitions, or `IntersectionObserver`.** Transition-driven values freeze at their start
   value, so an element can report `data-open="true"` while its height stays `0`. Check
   `document.visibilityState` before concluding anything is broken. To measure layout
   deterministically, disable transitions first:
   ```js
   const s = document.createElement('style');
   s.textContent = '.panel { transition: none !important }';
   document.head.appendChild(s);
   ```
2. **A stale dev-server handoff file makes your build irrelevant.** Laravel/Vite writes
   `public/hot`; while it exists the page loads assets from the dev server and ignores
   `npm run build`. Other stacks have equivalents. If your CSS change "does nothing", check
   for it — and restore it when you are done.

---

## PART 4 — Definition of done

- [ ] Skills verified present (Part 0), missing ones installed, user told which
- [ ] Relevant `SKILL.md` files actually read/loaded
- [ ] Bugs separated from taste, bugs fixed first
- [ ] Every new/renamed class confirmed present on a real element
- [ ] Computed styles confirm the intended rules win the cascade
- [ ] Contrast ratios computed and passing, in every theme and accent setting
- [ ] 320px and ≥ 1440px both clean, no horizontal overflow
- [ ] Keyboard focus visible; `prefers-reduced-motion` honoured
- [ ] No content-driven magic numbers
- [ ] Build, typecheck, lint, format, tests all pass
- [ ] Dev-server hot file restored if it was moved
- [ ] Report states what was verified, how, and what was not
