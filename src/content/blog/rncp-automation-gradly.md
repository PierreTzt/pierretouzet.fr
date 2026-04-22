---
title: 'Automating RNCP management: why I built Gradly'
description: "Academic coordinators spend days producing RNCP transcripts. I built a tool to cut that time by 3. Here's how."
date: 2026-02-03
lang: en
tags: ['EdTech', 'RNCP', 'Gradly', 'Automation']
---

If you work in French private higher education, you know the pain: RNCP transcripts.

Cross-referenced Excel spreadsheets with competency frameworks, blocks, ECTS credits, grades per teaching unit, weighted averages... All to be produced for hundreds of students, multiple times a year.

## The problem

In the school network where I work, academic coordinators spent **2 to 3 days per session** producing these transcripts. Manually. With error risks on every line.

Multiply that by 6 campuses, 3 sessions per year, and you get a time sink that produces zero pedagogical value.

## The duct-tape solution

I first tried the classic approach: Excel macros, nested formulas, shared templates. It worked... until someone accidentally modified a column and broke the entire file.

## The Gradly approach

I decided to build a real tool. Not an over-engineered platform — a simple tool that does one thing well:

1. **Data import**: grades come from the existing information system
2. **Automatic mapping**: teaching units are linked to RNCP blocks once, in a centralized framework
3. **Generation**: one click, all transcripts are produced in the correct format
4. **Verification**: automatic checks flag inconsistencies before publication

## The results

- **Production time cut by 3**: from 2-3 days to less than one day
- **Errors nearly eliminated**: automatic checks catch what humans miss
- **Coordinators freed up**: they can finally spend time on actual pedagogical support

## What I learned

### The best tool is the one people use

I could have built a full platform with 50 features. I chose to build a tool that does 3 things perfectly. Result: immediate adoption.

### The field dictates the product

Every Gradly feature comes from a real problem observed in the field. Not from a brainstorming session in a meeting room.

### Automation is not a goal in itself

The objective was never "automate for the sake of automating." It was: give coordinators back their time so they can do their real job — supporting students and instructors.

That's the difference between a tech project and a useful one.
