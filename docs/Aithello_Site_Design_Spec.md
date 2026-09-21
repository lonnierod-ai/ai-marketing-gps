# Aithello Site Design Spec

Version 1.4
Date: 2026-09-21
Status: Brand layer, color, type, and information architecture resolved.
Remaining items open. See section 10.

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

Ground and hierarchy confirmed 2026-09-18. Charcoal, ground value, and
orange usage confirmed 2026-09-21.

### Palette

| Token | Value | Role |
|---|---|---|
| `--brand-cobalt` | #2A52BE | Identity. Wordmark, headings, links, all text accents. |
| `--brand-orange` | #FF6E40 | Visual accent. Fills, shapes, and marks. Never text. |
| `--brand-orange-hover` | #E6633A | Primary CTA hover fill. |
| `--brand-orange-soft` | #FFE2D9 | Tags, secondary button hover, text selection. |
| `--brand-orange-tint` | #FFF3F0 | Section bands and callout boxes. |
| `--brand-ground` | #F7F9FC | Page ground. Near-white, slightly cool. |
| `--brand-charcoal` | #1F2430 | Body text, secondary marks, text on orange fills. |
| `--brand-white` | #ffffff | Reserved. Cards, reveal masks. |

Cobalt confirmed from the SVG as `rgb(42,82,190)`.

Light ground. Both reference sites are dark and their color logic does
not transfer directly.

### Hierarchy

Cobalt carries identity and every text accent. Orange carries energy
and appears throughout the site as a visual element, never as text.
There is no text orange; where an accent color is needed in text
(links, labels, highlighted words), use cobalt.

The primary action is distinguished by shape and fill. A filled circular
CTA in orange with charcoal text. Secondary actions: ground fill, cobalt
#2A52BE outline, cobalt text. Cobalt on the ground (#F7F9FC) is 6.53:1,
which passes WCAG AA for normal text (4.5:1) and for non-text UI
components such as the outline (3:1).

### Orange as a visual element

Orange should appear in most sections of every page, in small or
light doses. Approved uses:

- **Primary CTA:** `--brand-orange` fill, charcoal text,
  `--brand-orange-hover` on hover.
- **Secondary button hover:** `--brand-orange-soft` fill behind the
  cobalt outline and text.
- **Section bands:** `--brand-orange-tint` as an alternate section
  background, for example "How it works" or the credibility section.
  Alternate with the ground; never place two tint bands back to back.
- **Callout boxes:** `--brand-orange-tint` fill with a small orange dot
  or mark beside the label. No colored side borders.
- **Tags and chips:** `--brand-orange-soft` fill, charcoal uppercase
  label text.
- **Card hover:** border changes from the neutral rule color to a 2px
  `--brand-orange` border.
- **Step numbers and list markers:** orange circles with charcoal
  numerals.
- **Active nav item:** cobalt bold text with a 3px orange underline.
- **Decorative marks:** the "th" arc motif in dividers, beside section
  labels, and in the hero line-art (section 8).
- **Text selection:** `::selection` uses `--brand-orange-soft`.

Not orange:

- Any text, including links, labels, and headings.
- Focus rings. Use cobalt, 2px, offset 2px.
- Icons or shapes that carry meaning on their own. Orange on the
  ground is 2.6:1, below the 3:1 needed for meaningful non-text
  elements. Use cobalt or charcoal.

### Contrast reference

| Pair | Ratio | Result |
|---|---|---|
| Charcoal on ground | 14.7:1 | Pass |
| Cobalt on ground | 6.5:1 | Pass |
| Charcoal on orange (CTA text) | 5.6:1 | Pass |
| Charcoal on orange hover | 4.6:1 | Pass |
| Charcoal on orange tint | 14.3:1 | Pass |
| Cobalt on orange tint | 6.3:1 | Pass |
| Cobalt on orange soft | 5.6:1 | Pass |
| Orange on ground | 2.6:1 | Fails. Fill only. |
| White on orange | 2.8:1 | Fails. Never use white text on orange. |

Charcoal was chosen partly because the CTA sets the limit: lighter
charcoals read fine as body text but fail as text on the orange fill.

### Implications of the light ground

- Contrast is carried by charcoal and cobalt type on near-white, not
  white type on dark.
- The orange tagline in the wordmark lockup is exempt as branding, but
  must not be reproduced as live HTML text in that color.
- Depth comes from spacing, rule lines, type weight, and orange tint
  bands. Not glow, gradient, or atmospheric imagery. The reference
  sites' shadow and glow treatments do not port.
- The ground is not pure white. Use the token, not `#ffffff`, or adjacent
  surfaces will read wrong. White cards on the ground remain clearly
  distinct at #F7F9FC; a lighter ground would lose that.

---

## 6. Type system

Quattrocento Sans sets all live text. The wordmark is the only serif on
the page. Decided 2026-09-21.

| Role | Usage | Face | Weight |
|---|---|---|---|
| Display | Hero headline, h2 | Quattrocento Sans | 700 |
| Interface | Nav, buttons, body, labels, h3 and below | Quattrocento Sans | 400, 700 |
| Personality | One accent line per major section, sparingly | Open. May be dropped. | 400 |

No display serif. The wordmark already carries the brand's serif
character, and a second high-contrast serif beside it competes rather
than supports. One family also keeps maintenance simple.

### Quattrocento Sans

Quattrocento Sans is the tagline face in the Brandmark lockup, so the
site and the logo share one typeface. Open Font License, served from
Google Fonts.

- Load via `next/font/google`: weights 400 and 700, normal and italic.
  No other styles.
- Two weights only. Not a variable font. Never specify 500 or 600;
  browsers will round or synthesize the weight and it reads muddy.
- Hierarchy comes from size, spacing, case, and color more than
  weight. This matches the light-ground principle in section 5.
- Small x-height. Nothing a visitor must read is set below 16px.
- Fallback stack: `'Quattrocento Sans', 'Gill Sans', 'Segoe UI',
  sans-serif`.

### Headline metrics

- Size: `cqw` against a size container, container width = viewport
  minus page padding
- Weight: 700, cobalt
- Line-height: 1.05
- Letter-spacing: `-0.02em`. No tighter; a humanist sans loses its
  shapes under heavy negative tracking.
- Mobile: increase the `cqw` value rather than switching to px

The earlier 40% line-height overlap treatment is dropped. It depended
on a high-contrast display serif and does not suit a humanist sans.

### Supporting text

- Lede / subhead: roughly 1/5 the headline size, 400
- h2: 700, cobalt, line-height 1.1
- h3 and below: 700
- Body: 1.25rem, 400, line-height 1.6
- Nav: 0.8rem, 400, uppercase, letter-spacing 0.05rem
- Small labels: 1rem, 700, uppercase, letter-spacing 0.05rem
- Captions and form hints: 1rem minimum, 400
- Emphasis: italic 400 for stress, 700 for strong

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
- The mask wrapper needs vertical padding with a matching negative
  margin (about `0.15em`) so `overflow: hidden` does not clip
  descenders such as g, j, and y at the 1.05 headline line-height.
- **The mask wrapper takes `--brand-ground`, not `transparent`.** On a
  light ground the mask edge is otherwise invisible and the effect breaks
  over any section that differs from the page ground. Over an
  `--brand-orange-tint` band, the mask takes the tint instead.

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

### Homepage, top to bottom

Decided 2026-09-21. The homepage carries the consulting offers from
lonnierodriguez.com.

1. **Hero:** the three beats above.
2. **How I can help:** the Audit as the front door ("Not sure where AI
   fits yet? Start here."), then four offers in two groups:
   - **Done for you:** Custom Tool Building, Workflow Architecture
   - **Done with you:** Coaching, Advisory

   Each card uses the short card copy, a line on who it is for, and a
   link to its section on /services. Closing line: "Not sure which
   fits? That's what the discovery call is for."
3. **How it works:** Diagnose, Prescribe, Build the capability. Set on
   an `--brand-orange-tint` band with orange numbered circles. Each
   step keeps its "What changes" line.
4. **Proof:** named client outcomes, specific builds, the Market Intel
   podcast, the WBLA mentorship. See section 10, item 7.
5. **Meet Lonnie:** short founder section with photo, linking to
   /about.
6. **Free resources:** one band pointing to /resources (the tool
   directory and prompt builder).
7. **Final call to action:** Book a free discovery call.

Primary CTA sitewide: "Book a free discovery call." The orange circle
carries the short form, "Book a call."

Offer copy comes from the lonnierodriguez.com pages and the two new
service documents. Replace em dashes when porting it, and edit in a
lonnie-voice session.

---

## 9. Information architecture

Revised 2026-09-21.

```
/                          Landing. Consulting-buyer homepage (section 8).
/services                  All five offers in full. "Work with Lonnie."
/resources                 Hub. Two doors plus resource blocks.
/tools                     The AI tool directory (business owners).
/tools/[tool]              Tool profiles.
/learn                     Student content.
/blog                      Founder-led content.
/about                     Founder hub. Person schema. Credibility.
```

Subdirectories, not subdomains. All link equity stays on one domain.

**Nav:** Services, Resources, Blog, About, plus a "Book a call" button.
Tools and Learn are not top-level nav items; both are reached through
Resources.

Services and the free sections share brand, footer, and design tokens but
use different page templates. The services experience must not surface
student content.

### Resources hub (/resources)

Modeled on the trnsfrmaitn.com/ai-resources pattern.

- Short intro, then two large doors: **For business owners** (to
  /tools) and **For students** (to /learn).
- Below the doors, one repeated resource block: a type label as an
  orange-soft tag, a title, a one-line summary, a short description,
  and one plain-verb button. Launch blocks: Prompt builder, Market
  Intel podcast. Guides or downloads can be added later in the same
  block.
- Each block reveals on scroll per section 7.

### Tool directory (/tools)

- The role: a free, opinionated guide to AI tools for marketing, not an
  exhaustive catalog. Its job is discovery and trust, with a quiet path
  to consulting.
- One search, no "by goal" or "by tool" choice. The question: **"What
  do you want AI to help you do?"**
- Input hint: "Try a task, or type a tool you've heard of."
- Example chips under the input, drawn from real goals in `goals.ts`
  (for example, write a newsletter, plan social posts, make a short
  video).
- One box matches goals and tool names. Results show matching goals
  first, then tools.
- Data layer unchanged: `tools.ts`, `goals.ts`, `categories.ts`. The
  search chain integrity rules still apply.

### Prompt builder

Replaces the Market Intel chat widget.

- Floating button, bottom right, on every page, where the chat icon is
  today.
- Artwork: a construction-themed image (to be created) on a
  `--brand-cobalt` circle, so it never competes with the orange
  primary CTA circle.
- Hover and keyboard focus show the label: **"Need help writing a
  prompt? Let's build one."**
- Touch devices have no hover: show the label once on the first visit,
  for about four seconds, then the icon alone. Tap opens the builder.
- Tool profiles link to it with the tool pre-filled: "Build a prompt
  for this tool."
- `aria-label` on the button; the panel traps focus and closes on Escape.
- Open: template-based (no API) or Claude-assisted. See section 10.

---

## 10. Open decisions

1. ~~**Display face.**~~ Resolved 2026-09-21: no display serif.
   Quattrocento Sans 700 sets all headings. See section 6.
2. ~~**Interface sans.**~~ Resolved 2026-09-21: Quattrocento Sans.
   See section 6.
3. **Personality face.** Whether Aithello has one at all. The brand voice
   is tongue-in-cheek, which argues for it. A handwritten face is the
   reference's choice and may be too informal for a consulting buyer.
4. ~~**Charcoal value.**~~ Resolved 2026-09-21: #1F2430. See section 5.
5. ~~**Ground value.**~~ Resolved 2026-09-21: #F7F9FC. See section 5.
6. **Lockup behavior.** Whether the tagline travels with the wordmark.
7. **Credibility slot.** Reference sites use client logo walls. Aithello
   does not have that roster. Substitute: named client outcomes, the
   Market Intel podcast, specific builds, the WBLA mentorship. The
   tagline makes a capability claim, so this section carries real weight.
8. **Fourth beat.** Whether a CTA beat follows the three, or the CTA
   lives inside beat three.
9. **Hero copy.** Drafted separately in a lonnie-voice session.
10. ~~**Text orange.**~~ Resolved 2026-09-21: no text orange. Cobalt
    handles all text accents. Orange expanded as a visual element with
    hover, soft, and tint tokens. See section 5.
11. **Arc motif artwork.** Trace the "th" ligature curve from the logo
    SVG into a reusable divider and accent shape.
12. **Prompt builder mechanism.** Template-based on the page (no API
    route, no cost) or Claude-assisted (keeps an API route). Decide
    before building it.
13. **Prompt builder artwork.** The construction-themed image for the
    floating button.
14. **Booking link.** Which scheduling tool "Book a free discovery
    call" points to.
15. **Services copy.** Port the Audit, Coaching, and Advisory copy
    from lonnierodriguez.com, plus the Custom Tool Building and
    Workflow Architecture documents. Remove em dashes and finalize in a
    lonnie-voice session.

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
