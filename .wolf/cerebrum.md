# Cerebrum

> OpenWolf's learning memory. Updated automatically as the AI learns from interactions.
> Do not edit manually unless correcting an error.
> Last updated: 2026-07-01

## User Preferences

<!-- How the user likes things done. Code style, tools, patterns, communication. -->

## Key Learnings

- **Project:** otiyot-yeladim-quest

## Do-Not-Repeat

<!-- Mistakes made and corrected. Each entry prevents the same mistake recurring. -->
<!-- Format: [YYYY-MM-DD] Description of what went wrong and what to do instead. -->

[2026-07-02] Hotspot overlap priority: engine.js hotspotsAt() iterates the hotspots array in REVERSE, so the LATER entry in the array wins on overlapping rects. When an NPC hotspot overlaps furniture (e.g. Gila vs reception desk in lobby), the NPC must be listed AFTER the furniture in the room's hotspots array — otherwise clicks on the NPC hit the furniture instead.

## Decision Log

<!-- Significant technical decisions with rationale. Why X was chosen over Y. -->
