# Aithello Site Design Spec

Version 1.1
Date: 2026-09-18
Status: Brand layer resolved. Type system open. See section 10.

Derived from source-level analysis of two reference sites, nobl.io and
to-top.ch, performed 2026-09-16.

---

## 1. Scope

Rebuild of the Aithello front end on the existing Next.js / TypeScript
codebase, deployed on Vercel. Backend, tool catalog, and data layer in
`src/lib/data/` are unchanged. This spec covers the landing page and the
design system it establishes.

---

## 2. Positioning constraint that drives the design

The homepage is the consulting site. The tool directory is a section of
it, not a co-equal occupant of the first screen.

Both reference sites lead with a proposition aimed at a single buyer and
make the visitor scroll to reach the offer. Neither attempts to serve two
audiences above the fold. That resolves the audience-collision problem
structurally: someone arriving to browse tools reaches them in one click
from the nav rather than being accommodated in the hero.

---

## 3. Brand assets

**Wordmark:** Brandmark (brandmark.io) Designer package, purchased
2026-09-18. High-contrast serif, lowercase-feel with a custom "th"
ligature where the h flows out of the t.

Four variants as outlined SVG: regular (cobalt on light), inverse (white
artwork intended for placement on a cobalt background supplied in CSS;
the file itself contains no background), black, white. Stored in
`public/brand/`.

**Critical constraint:** the underlying typeface is not identifiable.
Brandmark labels it "Classic Serif" in the editor and
`Brandmark-Classic-Serif` in the SVG metadata, and support declined to
name the foundry. No web license is obtainable. The wordmark is outlined
paths only.

Consequence: the display typeface for headlines is an independent
decision and will not match the wordmark. This is acceptable. The "th"
ligature appears to be Brandmark's own construction rather than a native
feature of the underlying face, so licensing the font would not have
reproduced the mark regardless.

**File hygiene:** completed 2026-09-18. The primary file alone contained
hidden `<text>` elements with `fill-opacity: 0` carrying stray characters
alongside the outlined paths; these were removed. All four files were
stripped of editor metadata and normalized to a shared tight viewBox.

**Tagline:** "AI, sorted." Set in orange beneath the wordmark in the
lockup.

Open: whether the tagline travels with the mark as a locked unit, or the
mark stands alone in nav and the tagline appears only in the hero and
footer.

---

## 4. Stack decisions

| Layer | Decision | Rationale |
|---|---|---|
| Scroll feel | Lenis | Both reference sites use it. Largest single contributor to perceived quality. |
| Reveal triggers | IntersectionObserver | NOBL's effect is a one-time class toggle. No animation library needed. |
| Reveal animation | CSS keyframes | Same. Confirmed by source review. |
| Animation library | None | GSAP is not required for anything in this spec. |
| Type sizing | cqw units on a size container | Fluid scaling with no breakpoint jumps. |

**Explicitly not doing:** GSAP, ScrollTrigger scrub, pinning, multi-layer
image parallax, Spline, Lottie. These are agency-maintained techniques
with ongoing cost. This site is maintained by one person.

---

## 5. Color system

Ground and hierarchy confirmed 2026-09-18.

### Palette

| Token | Value | Role |
|---|---|---|
| `--brand-cobalt` | #2A52BE | Identity. Wordmark, display headlines. |
| `--brand-orange` | #FF6E40 | Functional accent only. |
| `--brand-ground` | ~#F7F9FC | Page ground. Near-white, slightly cool. |
| `--brand-charcoal` | TBD | Body text, secondary marks. |
| `--brand-white` | #ffffff | Reserved. Cards, reveal masks. |

Cobalt confirmed from the SVG as `rgb(42,82,190)`.

Light ground. Both reference sites are dark and their color logic does
not transfer directly.

### Hierarchy

Cobalt carries identity. Orange is functional and does not appear in the
wordmark.

Orange usage: primary CTA fill, hover states, the tagline in the lockup,
decorative marks only, interactive affordances. Icons carrying meaning
use cobalt or charcoal.

The primary action is distinguished by shape and fill. A filled circular
CTA in orange. Secondary actions: ground fill, cobalt #2A52BE outline,
cobalt text. Cobalt on the ground (#F7F9FC) is 6.53:1, which passes WCAG
AA for normal text (4.5:1) and for non-text UI components such as the
outline (3:1).

### Implications of the light ground

- Contrast is carried by charcoal and cobalt type on near-white, not
  white type on dark. Charcoal's exact value matters more than it would
  on a dark ground.
- #FF6E40 on the light ground is roughly 2.6:1 and fails WCAG AA even
  for large text. Orange is a fill color only, always with dark or white
  text on top. It is never used as text on the page ground. The orange
  tagline in the wordmark lockup is exempt as branding, but must not be
  reproduced as live HTML text in that color.
- Depth comes from spacing, rule lines, and type weight. Not glow,
  gradient, or atmospheric imagery. The reference sites' shadow and glow
  treatments do not port.
- The ground is not pure white. Use the token, not `#ffffff`, or adjacent
  surfaces will read wrong.

---

## 6. Type system

Three families, three jobs, no overlap.

| Role | Usage | Weight |
|---|---|---|
| Display | Hero headline, section headings | 700 |
| Personality | One accent line per major section, sparingly | 400 |
| Interface | Nav, buttons, body, labels | 400 to 700 |

All three are open decisions. See section 10.

The display face must be open-licensed or web-licensed, carry a genuine
700 weight, and survive the 40% line-height treatment. It sits beside the
wordmark rather than matching it, so choose a companion that shares the
high-contrast character without imitating it.

Consider restricting the display face to the hero and h2, letting the
interface sans handle h3 and below. A high-contrast serif on a light
ground dominates, which is right in the hero and potentially overbearing
throughout.

### Headline metrics

- Size: `cqw` against a size container, container width = viewport minus
  page padding
- Line-height: **40%**. Lines visually overlap so the headline reads as a
  mass rather than as text. Highest-impact single value in this spec.
- Letter-spacing: `-0.05em` first line, `-0.04em` subsequent lines
- Mobile: increase the `cqw` value rather than switching to px

### Supporting text

- Lede / subhead: roughly 1/5 the headline size
- Body: 1.25rem
- Nav: 0.8rem, 500, uppercase, letter-spacing 0.05rem
- Small labels: 1rem, 600, uppercase

---

## 7. Motion spec

### Scroll

Lenis, initialized only at viewport width >= 990px.

- duration: 2.3
- easing: exponential ease-out, `min(1, 1.001 - 2^(-10t))`
- smoothTouch: false
- touchMultiplier: 2
- mouseMultiplier: 1

Include Lenis's recommended `html.lenis` CSS rules. The reference site
omits them.

### Text reveal

Word-level masked rise. Direction and granularity from NOBL, timing
tightened toward TO TOP.

- Each word wrapped in an element with `overflow: hidden`
- Word animates `transform: translateY(100%)` to `0`
- Duration: 0.8s
- Stagger: 35ms per word, applied as inline `animation-delay`
- Easing: `cubic-bezier(0.65, 0.05, 0.36, 1)` as a shared token
- No opacity change on headline words. The mask does the work.
- **The mask wrapper takes `--brand-ground`, not `transparent`.** On a
  light ground the mask edge is otherwise invisible and the effect breaks
  over any section that differs from the page ground.

Word-level rising is deliberate. Character-level dropping draws attention
to the animation itself, which suits a site selling transformation and
does not suit one selling judgment.

### Lede reveal

- opacity 0 to 1, complete at 60% through
- `translateY(10px)` to `0`
- Duration: 1s, same easing, no stagger

### Trigger

- IntersectionObserver, threshold equivalent to `top 85%`
- Fires once, then disconnects
- Adds a class, CSS does the rest
- Nothing animates out

### Gating

All motion is a desktop enhancement. Below 990px, elements render in
final state, Lenis does not initialize, no reveals run.

Respect `prefers-reduced-motion: reduce`. Final state, no animation.

---

## 8. Hero structure

Three stacked full-height beats. Each animates in independently on scroll
entry. No crossfade, no pinning, no scrub.

| Beat | Job |
|---|---|
| 1 | The situation the visitor is in |
| 2 | Name the villain. What the alternative gets wrong. |
| 3 | The promise, then the identity |

The brand name does not appear until beat three, after the visitor
already agrees with the argument.

Beat two is load-bearing. It is where Aithello differentiates against
every AI tool directory on the internet.

Copy to be drafted separately in a lonnie-voice session.

Each beat carries a looping illustration. On a light ground, line-art in
charcoal with cobalt and orange accents rather than a glowing or
atmospheric treatment. The "th" ligature is the motif to extend into this
system.

---

## 9. Information architecture

```
/          Landing. Consulting-buyer hero.
/services  Paid work. Premium treatment. "Work with Lonnie."
/tools     The AI tool directory.
/learn     Student and education content. Separated in nav.
/blog      Founder-led content.
/about     Founder hub. Person schema. Credibility.
```

Subdirectories, not subdomains. All link equity stays on one domain.

Services and the free sections share brand, footer, and design tokens but
use different page templates. The services experience must not surface
student content.

---

## 10. Open decisions

1. **Display face.** Headline serif. Independent of the wordmark, which
   cannot be licensed. Highest priority.
2. **Interface sans.** The functional role.
3. **Personality face.** Whether Aithello has one at all. The brand voice
   is tongue-in-cheek, which argues for it. A handwritten face is the
   reference's choice and may be too informal for a consulting buyer.
4. **Charcoal value.** Exact hex. Doing heavy text-contrast work on a
   light ground.
5. **Ground value.** Exact near-white. An open design decision; the
   logo files carry no background to derive it from.
6. **Lockup behavior.** Whether the tagline travels with the wordmark.
7. **Credibility slot.** Reference sites use client logo walls. Aithello
   does not have that roster. Substitute: named client outcomes, the
   Market Intel podcast, specific builds, the WBLA mentorship. The
   tagline makes a capability claim, so this section carries real weight.
8. **Fourth beat.** Whether a CTA beat follows the three, or the CTA
   lives inside beat three.
9. **Hero copy.** Drafted separately in a lonnie-voice session.
10. **Text orange.** Whether to define a darker orange variant for text
    use, and its value.

---

## 11. Provenance

Reference analysis performed 2026-09-16 against live source.

- nobl.io: custom WordPress theme. GSAP loaded but used only for a class
  toggle. All visible motion is CSS keyframes. Three hero beats, not
  four. Lenis site-wide.
- to-top.ch: Webflow. GSAP 3.15 with five plugins, IX2, IX3, Lenis,
  Lottie, Spline. Six-layer AVIF parallax, desktop only. Three-role type
  system: Bon Vivant Serif display, Nothing You Could Do personality,
  Montserrat interface. Accent color runs freely through the system;
  the CTA is distinguished by filled shape, not by color.

Values in this spec are taken from source where stated. The reference
sites' full stacks are deliberately not replicated.
