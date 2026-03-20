# Product Analysis: pierretouzet.fr
**Analyst**: Alex (PM)  |  **Date**: March 20, 2026  |  **Status**: Complete

---

## Executive Summary

Pierre Touzet's portfolio is not a resume website. It is a multi-audience conversion engine with five distinct product surfaces: the public portfolio, the blog, the ebook, the admin CMS (blog generator + LinkedIn Studio), and the Gradly product link. Treated as a product, the site is well above average for its category but has clear gaps in conversion architecture, lead capture, and audience segmentation that leave significant value on the table.

**One-line verdict**: The content is strong, the positioning is authentic, and the technical execution is excellent. The gap is in the business layer -- the site tells Pierre's story well but does not systematically convert visitors into contacts, leads, or clients.

---

## 1. Product-Market Fit Assessment

### The market Pierre operates in

The French "ingenieur pedagogique" freelance market is structured and growing. Platforms like Malt list 80+ freelance profiles in this niche. Day rates range from 350 EUR (junior) to 550-700 EUR (experienced). The demand side is driven by private higher education institutions navigating RNCP certification, Qualiopi compliance, LMS deployment, and now AI integration.

### Does the portfolio serve this market?

**Fit score: 7/10**

**What works:**
- The positioning ("I make the complex accessible") is clear, memorable, and differentiated. It works across all four audience segments.
- The 15-year experience narrative with concrete metrics (6 campuses, 400 learners, admin time / 3) provides immediate credibility.
- The bilingual architecture opens the door to international visibility, which almost no French competitor has.
- The practitioner tone (field reports, not theory) is a genuine differentiator in a space dominated by corporate EdTech blogs and academic writing.
- The dedicated pages for recruiters (/recrutement) and consulting clients (/consulting) show audience awareness that 95% of portfolios lack.

**What is missing:**
- No conversion mechanism beyond "mailto:". Every page ends at an email link. There is no contact form, no calendar booking, no email capture, no way to measure conversion intent.
- No pricing signal for consulting. The mission formats page (Diagnostic / Mission / Conseil ponctuel) describes durations but gives no indication of cost. Consulting clients need a ballpark before they email -- even a range or a "starting from" signal reduces friction.
- No case study depth. Testimonials are short LinkedIn quotes. There is no "I worked with School X, here is the problem, here is what we did, here is the result" format. The Gradly project page comes closest but it is Pierre's own product, not a client engagement.
- The ebook exists as a project description, not as a lead magnet. It generates zero leads today.

### Product-Market Fit Gaps by Priority

| Gap | Impact on Conversion | Effort to Fix | Priority |
|-----|---------------------|---------------|----------|
| No contact form / booking link | HIGH -- lost leads who won't compose an email | LOW (1-2 days) | P0 |
| Ebook not gated / no email capture | HIGH -- zero lead pipeline | LOW (2-3 days) | P0 |
| No case study (client engagement) | MEDIUM-HIGH -- consulting clients need proof | MEDIUM (requires client permission, writing) | P1 |
| No pricing signal on consulting | MEDIUM -- reduces tire-kicker emails but increases conversion of serious inquiries | LOW (add a paragraph) | P1 |
| Blog has no CTA beyond reading | MEDIUM -- blog traffic exits without converting | LOW (add CTAs to articles) | P1 |

---

## 2. User Segmentation: Four Personas

### Persona 1: The Recruiter (recrutement page)
**Who**: HR or hiring manager at a private higher education institution looking for a responsable pedagogique, coordinateur, or directeur de programmes.
**What they need**: Quick signal of fit (experience, skills, certifications), downloadable CV, easy contact.
**Current service level**: GOOD (8/10)

The /recrutement page is well-structured: key metrics, experience summary, highlighted skills, education, testimonials, and dual CTAs (email + CV download). This is the best-served persona.

**Gaps**: No achievements framed as business outcomes (e.g., "enrollment growth of X%" or "reduced admin costs by Y EUR"). Recruiters for senior roles want impact metrics, not just activity descriptions. The testimonials are generic -- they praise character but do not describe specific project results.

### Persona 2: The Consulting Client (consulting page)
**Who**: Directeur d'ecole, responsable qualite, or DG of a training organization needing help with RNCP certification, digital transformation, or AI integration.
**What they need**: Proof of relevant results, clear service offering, confidence that Pierre can solve their specific problem, easy way to start a conversation.
**Current service level**: MODERATE (6/10)

The /consulting page does several things well: the "Sound familiar?" use cases are effective (they name the client's pain before offering the solution), the process section builds trust, and the mission formats give structure. The two testimonials add credibility.

**Gaps**:
- No case study showing a complete engagement arc (problem, intervention, result, metrics).
- No pricing anchor. Even "missions starting from X EUR/day" would reduce friction.
- No booking link. A Calendly or equivalent for a free 30-minute discovery call would dramatically increase conversion. The single email CTA is a bottleneck.
- No content that demonstrates deep expertise before the sale (the blog exists but is not linked from the consulting page).
- No Gradly mention on the consulting page, despite it being the strongest proof point of Pierre's ability to identify problems and build solutions.

### Persona 3: The Peer / Community Member
**Who**: Other ingenieurs pedagogiques, coordinateurs, EdTech enthusiasts, LinkedIn connections.
**What they need**: Interesting content, shared experiences, a sense of professional community.
**Current service level**: GOOD for blog readers (7/10), WEAK for community building

The blog serves this persona well with practitioner-first content. The LinkedIn strategy (documented in the content strategy) is sound. The speaker page adds credibility.

**Gaps**:
- No newsletter subscription. Peers who enjoy the blog have no way to be notified of new content except by checking the site or following Pierre on LinkedIn.
- No comments or discussion mechanism on blog posts.
- The blog is French-only, limiting international peer engagement despite the bilingual site.

### Persona 4: The Event Organizer (speaker page)
**Who**: Conference organizers, school networks planning internal events, EdTech event curators.
**What they need**: Proof of speaking ability, clear topic list, format flexibility, easy booking.
**Current service level**: MODERATE (5/10)

The /speaker page lists three solid topics with formats and tags. The CTA is a mailto link.

**Gaps**:
- No video of Pierre speaking. This is the single most important asset for an event organizer evaluating a speaker. The Twitch experience exists but is not leveraged.
- No past event list. Even 2-3 speaking engagements listed with logos would signal credibility.
- No speaker kit / one-pager (downloadable PDF with bio, headshot, topics, and technical requirements).
- The topics are described abstractly. A short 2-minute video per topic would convert dramatically better.

### Persona Service Matrix

| Persona | Current Service | Biggest Gap | Fix Effort |
|---------|----------------|-------------|------------|
| Recruiter | 8/10 | Impact metrics in experience descriptions | S |
| Consulting Client | 6/10 | No case study, no booking, no pricing | M-L |
| Peer / Community | 7/10 (blog) | No newsletter, no EN blog | M |
| Event Organizer | 5/10 | No speaking video, no past events | M |

---

## 3. Value Proposition Clarity per Segment

### The Core Value Proposition
"Je rends le complexe accessible" (I make the complex accessible)

This is strong. It works as a universal positioning across all four segments. It is not category-specific (it does not say "I do instructional design"), which is both its strength (memorable, distinctive) and its weakness (could be anyone in any field).

### Segment-Specific Value Props

| Segment | What the site communicates | What it should communicate | Gap |
|---------|---------------------------|----------------------------|-----|
| Recruiter | "I have 15 years of experience across IT, pedagogy, and digital innovation" | "I will harmonize your programs across campuses, get your certifications approved, and save your teams 60% of their admin time" | Outcome framing. The experience is described in terms of what Pierre did, not what the employer got. |
| Consulting Client | "I offer 4 types of services and work in 4 steps" | "Here is exactly what happened when I helped a school like yours: [case study with before/after metrics]" | Proof. The process description is solid but abstract. Clients buy results, not processes. |
| Peer | "I write about what I see on the ground" | (Same -- this is working well) | Minor: add a subscription mechanism |
| Event Organizer | "I speak about pedagogy, AI, and career paths" | "Watch me deliver this talk. Here is audience feedback. I have spoken at [events]. Here is my speaker kit." | Evidence of delivery quality |

### Tagline Recommendation

Keep "Je rends le complexe accessible" as the hero tagline. Add segment-specific sub-taglines on dedicated pages:

- **/consulting**: "Des missions concretes, des resultats mesurables. Pas de theorie -- du terrain."
- **/recrutement**: "15 ans a structurer, deployer et certifier des programmes de formation."
- **/speaker**: "Je parle de ce que je fais. Pas de frameworks empruntes -- des retours d'experience reels."

The consulting page already has a good subtitle. The others could be sharpened.

---

## 4. Feature Prioritization (What to Build Next)

Using a modified RICE framework adapted for a personal portfolio product:

| # | Feature | Reach | Impact | Confidence | Effort | Score | Recommendation |
|---|---------|-------|--------|------------|--------|-------|----------------|
| 1 | Contact form with structured fields (name, company, need, budget range) | All visitors | High (measurable conversion) | 90% | S (2 days) | **36** | BUILD NOW |
| 2 | Ebook gated download with email capture | All visitors + LinkedIn traffic | High (builds email list) | 85% | S (2-3 days) | **34** | BUILD NOW |
| 3 | Calendly / booking link on consulting + speaker pages | Consulting + Speaker segments | High (removes friction) | 90% | XS (1 hour) | **32** | BUILD NOW |
| 4 | Blog article CTAs (consulting CTA + ebook CTA in every article) | Blog readers | Medium-High | 85% | XS (half day) | **28** | BUILD NOW |
| 5 | Newsletter subscription (simple email capture) | Peers + all segments | Medium-High (retention channel) | 80% | S-M (3-5 days) | **25** | BUILD NEXT |
| 6 | One detailed case study page | Consulting clients | High | 75% (needs client permission) | M (1-2 weeks) | **23** | BUILD NEXT |
| 7 | Speaking video embed on /speaker page | Event organizers | Very High for this segment | 70% (needs content creation) | M (recording + editing) | **20** | BUILD NEXT |
| 8 | English blog articles (start with top 3) | International audience | Medium | 70% | M (translation + adaptation) | **18** | PLAN FOR Q2 |
| 9 | Pricing indication on consulting page | Consulting clients | Medium | 60% (could deter some) | XS | **15** | EXPERIMENT |
| 10 | Blog comments / discussion | Peers | Low-Medium | 50% | M (moderation burden) | **8** | DEFER |

### The "Build Now" Package (2-week sprint)

If Pierre can invest 2 weeks of portfolio development time, these 4 items should ship together:

1. **Contact form** replacing or supplementing the mailto links -- with structured fields that tell Pierre what the visitor needs before he reads the email.
2. **Ebook as gated download** -- a simple landing page section with email capture (name + email + company optional) that delivers the PDF via email. This creates the foundation of an email list.
3. **Calendly link** on /consulting and /speaker pages -- "Book a 30-minute discovery call" is the most effective CTA for these segments.
4. **Blog CTAs** -- every blog article should end with a contextual CTA: "If you are dealing with [topic of this article], I can help. [Book a call / Read the consulting page / Download the ebook]."

---

## 5. The Admin CMS as Product

### Blog Generator

**What it is**: An AI-assisted CMS at /admin/blog that uses Claude API to generate blog articles, with GitHub API for publishing directly to the content collection.

**Assessment**: This is a legitimate productivity tool. For Pierre's use case (2 articles/month, consistent tone, SEO-optimized), it reduces the writing cycle from hours to minutes for a first draft. The fact that 6 articles shipped in Q1 2026 with consistent quality validates the workflow.

**Is it viable as a standalone product?** Not in its current form. The CMS is tightly coupled to Pierre's Astro site, his content collection structure, his GitHub repo, and his specific writing voice. To be a product, it would need:
- Multi-tenant architecture (multiple users, multiple sites)
- Content management beyond Astro (WordPress, Ghost, Notion integration)
- Customizable tone/voice profiles
- A UI that non-technical users can operate

**Recommendation**: Keep it as an internal tool. It is Pierre's unfair advantage for content velocity. Do not invest in making it a product -- the AI writing tool market is saturated (Jasper, Copy.ai, Writer, etc.) and Pierre's differentiation is in education, not in AI writing tools.

### LinkedIn Studio

**What it is**: A full content studio at /admin/linkedin for generating LinkedIn posts (multiple formats: opinion, analysis, fact, etc.), LinkedIn visuals (1200x1200 and 1200x627), banner images, blog-to-LinkedIn conversion, and LinkedIn-to-blog pipeline tracking.

**Assessment**: This is more interesting as a potential product than the blog CMS. The LinkedIn content creation workflow for professionals is genuinely painful, and the integration between blog content and LinkedIn posts is a differentiated feature. The visual generation (Satori + Sharp) eliminates Canva dependency.

**Is it viable as a standalone product?** Potentially, but the market is crowded (Taplio, Shield, AuthoredUp, etc.). Pierre's angle would need to be niche-specific: "LinkedIn content studio for education professionals" or "Content cascade tool for thought-leadership bloggers." The TAM is small.

**Recommendation**: Keep building for personal use. Use it as a portfolio showcase piece (it demonstrates technical ability). If Pierre accumulates 12+ months of LinkedIn performance data showing measurable results, the tool itself becomes a case study and a speaking topic ("How I built my own LinkedIn content engine").

---

## 6. Ebook as Lead Magnet

### Current State: Wasted Asset

The ebook "L'IA dans l'education" is listed as a project on the portfolio with the description "Finalized, ready to share." There is no download link, no email gate, no landing page. The CTA says "Telecharger gratuitement" but the page I analyzed showed no actual download mechanism.

This is the single biggest missed opportunity on the site.

### What the Ebook Should Be Doing

1. **Lead generation**: Every visitor interested in AI in education should trade their email for the ebook. This builds Pierre's most valuable asset -- an owned audience list he can nurture.
2. **Authority positioning**: A 10-page practitioner guide on AI in education, given away free, positions Pierre as the expert who gives value before asking for anything. It is the consulting equivalent of a product demo.
3. **Content funnel top**: The ebook should be the entry point of a nurture sequence: Ebook download -> follow-up email (3 days later) with link to the Gradly case study article -> second email (7 days later) with link to the consulting page -> third email (14 days later) with "book a call" CTA.

### Implementation Plan

| Step | Action | Effort |
|------|--------|--------|
| 1 | Create a dedicated landing page for the ebook (/fr/ebook, /en/ebook) with email capture form | 2 days |
| 2 | Set up email delivery (simple: Resend, Loops, or even a manual automation via Zapier) | 1 day |
| 3 | Add ebook CTA to: homepage, every blog article, consulting page, speaker page | Half day |
| 4 | Create a 3-email nurture sequence (can use the blog CMS to draft) | 1 day |
| 5 | Track downloads as a custom event in Vercel Analytics | 2 hours |
| 6 | Promote the ebook in LinkedIn posts (using the LinkedIn Studio) | Ongoing |

**Expected result**: If the site receives even modest traffic (500 visits/month), a 5% ebook conversion rate produces 25 leads/month. At a 10% consulting conversion rate on those leads, that is 2-3 qualified conversations/month -- which is exactly the content strategy target.

---

## 7. The Gradly Mention -- Should the Portfolio Link More Strongly?

### Current State

Gradly appears in three places on the portfolio:
1. As a featured project on the homepage and /projets page
2. On the dedicated project page /fr/projets/gradly with full story, features, and metrics
3. In the experience description for IFAG (as "early Gradly prototypes")

Gradly.fr is linked as a demo URL from the project page.

### Assessment

Gradly is Pierre's strongest proof point. It demonstrates:
- Problem identification from the field (not from a consultant's PowerPoint)
- Solution design (offline-first, RGPD-compliant)
- Measurable impact (admin time / 3)
- Product thinking (ERP compatibility, data sovereignty)
- Entrepreneurial initiative (built it himself, others wanted it)

**But the portfolio underutilizes Gradly in three ways:**

1. **The consulting page does not mention Gradly.** The use case "Your teams waste time on admin tasks" should directly reference Gradly as proof that Pierre has already solved this exact problem and built a tool for it. This is the bridge between "I consult" and "I actually build solutions."

2. **The speaker page topic about Gradly does not link to the product.** An event organizer evaluating the "How I automated RNCP management" talk should be able to see the product itself.

3. **The Gradly project page positions it as Pierre's creation but does not position it as a consulting capability.** The story is "I built this for myself and it spread." The next logical sentence is "I can do the same audit and solution design for your organization" -- but that sentence is not there.

### Recommendation

| Action | Where | Purpose |
|--------|-------|---------|
| Add a Gradly callout box to the consulting page | /consulting, after "use cases" section | Proof that Pierre builds solutions, not just advises |
| Link Gradly in the speaker topic description | /speaker, Gradly talk entry | Let organizers see the product |
| Add a CTA on the Gradly project page | /projets/gradly, below features | "Facing a similar problem? Let's talk." |
| Mention Gradly in blog article CTAs where relevant | RNCP-related articles | Cross-pollination between content and product |

**Do NOT make the portfolio feel like a Gradly sales page.** The portfolio is about Pierre. Gradly is evidence, not the product being sold. The framing should always be: "Pierre built this because he identified a real problem" -- not "Buy Gradly."

---

## 8. Metrics That Matter

### What Pierre Should Track

Pierre already has Vercel Analytics (cookie-free) and custom event tracking via `[data-track]`. Here is the measurement framework organized by what actually matters for his goals.

#### Tier 1: Conversion Metrics (Track Weekly)

| Metric | What It Measures | How to Track | Baseline Target |
|--------|-----------------|--------------|-----------------|
| Contact form submissions | Total inbound interest | Form submission event | 5+/month |
| Ebook downloads | Lead generation | Download event | 25+/month |
| CV downloads | Recruiter interest | Already trackable via data-track | Track current baseline, then optimize |
| "Book a call" clicks | High-intent consulting leads | Calendly click event | 3+/month |
| Email CTA clicks | Total conversion intent | data-track on mailto links | Track current baseline |

#### Tier 2: Engagement Metrics (Track Monthly)

| Metric | What It Measures | How to Track |
|--------|-----------------|--------------|
| Blog article views | Content reach | Vercel Analytics page views |
| Blog -> Consulting page flow | Content-to-consulting pipeline | Page path analysis |
| Speaker page views | Event organizer interest | Vercel Analytics |
| Average pages per session | Depth of engagement | Vercel Analytics |
| Return visitors | Audience building | Vercel Analytics |

#### Tier 3: SEO & Distribution Metrics (Track Monthly)

| Metric | What It Measures | How to Track |
|--------|-----------------|--------------|
| Organic search traffic | SEO effectiveness | Vercel Analytics referrer data |
| Top search queries driving traffic | Keyword validation | Google Search Console |
| LinkedIn post -> site traffic | Content cascade effectiveness | UTM parameters on LinkedIn links |
| Blog article ranking for target keywords | SEO authority building | Manual check or Ahrefs/SEMrush |

#### What NOT to Track

- **Lighthouse scores** (already 95+, diminishing returns on optimization)
- **Total page views** as a vanity metric (without conversion context, raw traffic is meaningless)
- **Social media followers** (followers do not pay consulting fees; leads do)

### The One Metric That Matters (OMTM)

For the next 6 months, Pierre's OMTM should be:

**Qualified inbound contacts per month**

This is defined as: email, form submission, or booking from someone who (a) identifies a specific need, (b) represents an organization (not a student), and (c) found Pierre through his content or portfolio.

Target: 5+ qualified contacts/month by September 2026.

Everything else (traffic, ebook downloads, blog views, LinkedIn engagement) is a leading indicator that should be evaluated based on whether it drives this number up.

---

## 9. Competitive Positioning

### The Landscape

Pierre competes at three levels:

**Level 1: Freelance platforms (Malt, LesBonsFreelances, Freelance.com)**
These list 80+ "ingenieur pedagogique" profiles. They compete on day rate, availability, and brief profile descriptions. Pierre's advantage: his own portfolio site gives him vastly more surface area to demonstrate expertise than a platform profile allows. His disadvantage: he is not on these platforms (or at least the site does not link to them).

**Level 2: Specialist consultants with websites**
Sites like ingenieurpedagogique.com and lesplumesfantastiques.fr offer instructional design freelance services with their own web presence. These tend to be service-oriented ("Here is what I do, here is my rate, contact me") without the depth of content, projects, or thought leadership that Pierre has built.

**Level 3: Corporate EdTech blogs and institutional content**
C-Campus, Kwark, LemonLearning, Innovation Pedagogique -- these are the SEO competitors for keywords like "ingenierie pedagogique," "Qualiopi audit," "IA en education." They produce more content at higher volume but from a vendor or institutional perspective, not a practitioner one.

### Pierre's Competitive Moat

Pierre has four genuine differentiators that no competitor in the French market combines:

1. **Practitioner + Builder**: He is not just an advisor who tells you what to do. He built Gradly. He deployed tools across 28 campuses with 100% adoption. He manages 6 campuses daily. This is "I did it myself" credibility, not "I studied it" credibility.

2. **Multi-format content creator**: Podcast, YouTube, Twitch, newsletter, blog, ebook. Most instructional design consultants have a LinkedIn profile and maybe a PDF portfolio. Pierre has a content engine.

3. **Bilingual site in a French-dominant niche**: The international instructional design community (anglophone) is large and hungry for non-US perspectives. Almost no French practitioner publishes in English. The EN site is a blue ocean.

4. **CNIL-certified DPO + Instructional Designer**: This combination is exceptionally rare. In the era of AI Act + RGPD enforcement in education, someone who understands both pedagogy and data protection is uniquely valuable.

### Competitive Risks

- **Platform dependency**: If Pierre's traffic comes primarily from LinkedIn (likely), he is vulnerable to algorithm changes. The blog + SEO strategy mitigates this, but it is early.
- **Niche ceiling**: The French private higher education market is finite. The 6-campus, RNCP, Qualiopi positioning is precise, which is good for conversion but limits total addressable market.
- **No pricing transparency**: Competitors on Malt show their day rate. Pierre's site gives no pricing signal. This can be an advantage (perceived premium) or a disadvantage (lost inquiries from budget-constrained clients who assume he is too expensive).

### Positioning Recommendation

Pierre should lean into his moat rather than trying to broaden his appeal:

**Positioning statement** (internal, not for the site):
"I am the only French-speaking instructional design consultant who manages multi-campus operations daily, builds his own EdTech tools, holds a CNIL DPO certification, and publishes practitioner-first content in two languages."

This is defensible, true, and difficult to replicate.

---

## 10. Roadmap Recommendations (Next 3-6 Months)

### North Star Metric
**Qualified inbound contacts per month**
Current: Unknown (no tracking)  |  Target: 5+/month by September 2026

---

### NOW -- Active April-May 2026

These items should ship within 6 weeks. They are the highest-leverage changes to convert existing traffic into leads.

| Initiative | User Problem Solved | Success Metric | Effort |
|------------|---------------------|----------------|--------|
| Contact form (structured, replaces bare mailto) | Visitors who want to reach out but won't compose a cold email | Form submissions > 5/month | S (2 days) |
| Ebook gated landing page with email capture | No lead capture mechanism exists | 25+ downloads/month | S (2-3 days) |
| Calendly integration on /consulting and /speaker | High-intent visitors face friction to start a conversation | Bookings > 3/month | XS (2 hours) |
| Blog CTAs in every article (consulting, ebook, call) | Blog readers exit without converting | Blog-to-consulting page flow > 10%/month | XS (half day) |
| Gradly callout on consulting page | Consulting clients do not see Pierre's strongest proof point | N/A (qualitative) | XS (1 hour) |
| Google Search Console setup + baseline tracking | No visibility into search performance | Baseline established | XS (1 hour) |

**Ship criteria**: All items deployed, tracking confirmed, ebook email delivery tested.

---

### NEXT -- June-July 2026

| Initiative | Hypothesis | Expected Outcome | Confidence |
|------------|------------|-----------------|------------|
| One detailed consulting case study page | If Pierre shows a complete engagement story (problem/intervention/result), consulting conversion will increase | +30% consulting page -> contact conversion | Medium (needs client permission) |
| Newsletter subscription (blog + monthly digest) | If readers can subscribe, Pierre builds an owned audience independent of LinkedIn | 100+ subscribers by end of July | Medium |
| 2-3 English blog articles (from content strategy) | English articles will capture international search traffic in a low-competition niche | Measurable EN organic traffic | Medium-High |
| Speaking video (even 2-minute excerpt) on /speaker | Event organizers need to see delivery quality before booking | Speaker page -> contact conversion improves | High |
| Malt / freelance platform profile linking | Presence on platforms where consulting clients actively search | Additional discovery channel for leads | Medium |

---

### LATER -- August-September 2026

| Initiative | Strategic Hypothesis | Signal Needed to Advance |
|------------|---------------------|--------------------------|
| 3-email nurture sequence for ebook downloaders | Automated nurture converts ebook leads into consulting conversations | Ebook downloads > 50/month (validates demand) |
| Pillar page for "ingenierie pedagogique" | A comprehensive resource page becomes the SEO anchor for all blog content | Blog organic traffic > 200 visits/month |
| Speaker kit PDF (downloadable one-pager) | Reduces friction for event organizers to pitch Pierre internally | 3+ speaker page visits/week |
| Gradly as portfolio case study (redesigned project page) | A more detailed Gradly page serves as both product marketing and consulting proof | Gradly page views > 50/month |
| Consulting pricing indication (experiment) | Adding "missions from X EUR/day" either increases or decreases conversion; test it | 3+ months of contact form data for baseline |

---

### NOT BUILDING (and Why)

| Request | Reason for Deferral | Revisit Condition |
|---------|---------------------|-------------------|
| Admin CMS as standalone product | Market is saturated (Jasper, Copy.ai); Pierre's moat is in education, not AI writing tools | If 5+ people ask to use it unprompted |
| LinkedIn Studio as product | Crowded market (Taplio, AuthoredUp); TAM for "LinkedIn studio for education professionals" is tiny | If Pierre accumulates 12+ months of measurable LinkedIn performance data showing clear ROI |
| Blog comments / discussion system | Moderation overhead is high; community engagement happens on LinkedIn, not on personal blogs | If blog traffic exceeds 1000 visits/month and readers actively request it |
| Multi-language blog (beyond EN) | FR + EN covers the addressable market; adding DE/ES has no clear demand signal | If international traffic > 30% of total |
| Portfolio redesign | The current design is clean, fast, and functional. A redesign is ego-driven, not user-driven. | If Lighthouse drops below 90, or if conversion data shows UX friction |

---

## Appendix A: Quick Wins (This Week)

If Pierre has 4 hours this week, here is the priority order:

1. **Set up Google Search Console** (30 minutes). Without this, there is zero visibility into how search users find (or don't find) the site.
2. **Add a Calendly link** to /consulting and /speaker (30 minutes). Free tier is sufficient. This is the lowest-effort, highest-impact conversion improvement.
3. **Add internal links between existing blog articles** (30 minutes). The 6 articles are standalone today. Cross-linking improves SEO and reader retention.
4. **Add a "Book a call" or "Download my ebook" CTA to each blog article footer** (1 hour). Every article currently ends with nothing.
5. **Write a one-paragraph Gradly mention** for the consulting page (30 minutes). Frame it as evidence, not advertising.

## Appendix B: Competitive Reference Sites

- [ingenieurpedagogique.com](https://ingenieurpedagogique.com/) -- French IP freelance, service-oriented
- [lesplumesfantastiques.fr](https://lesplumesfantastiques.fr/) -- French IP freelance, e-learning focused
- [Malt: ingenieur pedagogique profiles](https://www.malt.fr/s/tags/ingenieur-pedagogique-602e8176681b9605c1c9fddc) -- 80+ freelance profiles
- [devlinpeck.com](https://www.devlinpeck.com/) -- Gold standard for anglophone instructional design portfolio (content-led, showcase-heavy)
- [christytuckerlearning.com](https://christytuckerlearning.com/) -- Veteran anglophone ID consultant with strong content strategy

## Appendix C: Content Strategy Alignment

Pierre already has a comprehensive content-strategy-2026.md document in the repo. The editorial calendar (12 articles, April-September, 2x/month) is well-planned and aligned with SEO keyword opportunities. The key addition this analysis recommends is:

**Every piece of content must have a conversion endpoint.** The content strategy document is strong on topic selection, SEO targeting, and LinkedIn cascade. What it does not address is what happens AFTER someone reads the article. The "Content Cascade Model" should be extended:

```
BLOG ARTICLE
    |
    +--> LinkedIn Post cascade (already planned)
    |
    +--> In-article CTA: relevant next step per article topic
    |        - RNCP article -> "Download the ebook" or "Book a consulting call"
    |        - AI article -> "Download the ebook"
    |        - Change management article -> "See the consulting page"
    |        - Career article -> "Read more on /bonjour"
    |
    +--> Newsletter capture: "Get the next article in your inbox"
    |
    +--> Ebook promotion: sidebar or footer mention on every article
```

---

*Analysis completed March 20, 2026. Recommended review cadence: monthly, aligned with content strategy review cycle.*
