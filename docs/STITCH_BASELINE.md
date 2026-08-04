# NaijaDeals Stitch Baseline

## Version
`stitch-baseline-v1.0`

## Purpose

The **Stitch library** is the official, frozen UI reference baseline for the NaijaDeals super-ecosystem. It contains all classified static HTML mockups and screenshot assets produced during the design discovery phase. These assets serve as the authoritative visual and structural reference for downstream implementation of NaijaDeals modules, shared services, and future verticals.

Stitch is **not** an implementation codebase. It is a curated, versioned design asset library that engineering teams consume when building production features.

## Approved Module Structure

All Stitch assets are organized under the `stitch/` directory using the following enterprise module structure:

```
stitch/
├── admin/                    # Administrative, oversight, and operational dashboards
├── ai/                       # AI-driven features, assistants, and automation
├── analytics/                # Analytics, reporting, and intelligence dashboards
├── authentication/           # Identity, auth, KYC, and access control
├── messaging/                # Messaging, chat, and communication interfaces
├── notifications/            # Notifications and alerting
├── reports/                  # Report generation and export interfaces
├── search/                   # Search and discovery experiences
├── settings/                 # Configuration, settings, and preferences
├── shared/                   # Cross-cutting, shared, or unclassified ecosystem assets
├── wallet/                   # Wallet, payments, escrow, and financial services
├── naijaagro/                # NaijaAgro vertical
├── naijadrive/               # NaijaDrive vertical
├── naijaeats/                # NaijaEats vertical
├── naijagigs/                # NaijaGigs vertical
├── naijasend/                # NaijaSend vertical
├── naijashop/                # NaijaShop vertical
├── naijastay/                # NaijaStay vertical
├── naijastream/              # NaijaStream vertical
├── naijawholesale/           # NaijaWholesale vertical
├── future/
│   ├── naijahealth/          # NaijaHealth (future vertical)
│   ├── naijainsurance/       # NaijaInsurance (future vertical)
│   ├── naijajobs/            # NaijaJobs (future vertical)
│   └── naijalearn/           # NaijaLearn (future vertical)
└── archive/                  # Unclassified or legacy documentation assets
```

## Current Statistics

| Metric | Value |
|---|---|
| Total Stitch directories | 1,570 |
| Classified directories | 1,558 |
| Archive assets | 12 |
| Total files under `stitch/` | 3,089 |
| HTML mockups (`code.html`) | 1,527 |
| Screenshots (`screen.png`) | 1,531 |
| Directories with both HTML and screenshot | 1,519 |
| Directories with HTML only | 8 |
| Directories with screenshot only | 12 |
| Git commit | `0c929c6` |
| Git tag | `stitch-baseline-v1.0` |

## Organization Methodology

1. **Content-aware classification** — Each top-level directory was analyzed using:
   - Directory name signals
   - HTML `<title>` tag brand detection
   - Body keyword frequency
   - Explicit brand-to-module mapping
2. **Confidence scoring** — Each directory received a primary family and destination module.
3. **Conflict detection** — Genuine architectural conflicts (e.g., title-brand vs directory-prefix mismatch) were escalated for manual resolution.
4. **History-preserving move** — All classified directories were moved using `git mv` to preserve Git history and blame.
5. **Archive collection** — Unclassified documentation assets were moved to `stitch/archive/` for safekeeping.

## Conflict Resolution

One conflict was resolved by the principal architect:

- **Directory:** `naijahealth_clinical_insurance_authority_hub`
- **Title:** `NaijaHealth Admin Dashboard - Pan-African OS`
- **Resolution:** Primary owner = **NaijaHealth**, destination = `stitch/future/naijahealth`
- **Secondary relationship:** NaijaInsurance (future consumer)

## Future Module Policy

- Future verticals (`future/*`) are isolated and clearly marked.
- No implementation code may be committed inside Stitch.
- When a future vertical is approved for implementation, its assets may be migrated from `future/<name>` to a top-level production module, but only with explicit architecture approval.

## Archive Policy

- `stitch/archive/` contains unclassified or legacy documentation assets that were not part of the content-aware classification.
- These assets are preserved for historical reference but are not part of the approved UI baseline.
- New archived assets should be added only when explicitly requested by the architect or governance team.

## Ownership Rules

- Each Stitch directory belongs to exactly one primary module.
- A directory may have secondary relationships noted in the classification report, but its physical location reflects the primary owner.
- No directory may be duplicated across modules.

## Update Policy

The Stitch directory structure is frozen as of `stitch-baseline-v1.0`. Stitch may only change if:

- New Stitch exports are imported from the design team.
- Existing Stitch assets are corrected (e.g., broken links, missing screenshots).
- Architecture approval explicitly authorizes reorganization or module changes.

Engineering teams **shall not**:

- Reorganize Stitch again.
- Rename modules.
- Duplicate Stitch assets.
- Modify archived references.

## Governance Rules

- Stitch is governed by the principal architect and the architecture governance process.
- Changes to Stitch require a documented justification and approval.
- The `stitch-baseline-v1.0` tag marks the official reference point. Future releases of the Stitch baseline will increment the version tag (e.g., `stitch-baseline-v1.1`).
- This document (`docs/STITCH_BASELINE.md`) must be updated whenever a new Stitch baseline is approved.

## Related Documents

- `ARCHITECTURE.md` — High-level NaijaDeals architecture governance
- `PROJECT_RULES.md` — Project-level rules and conventions
- `DEVELOPMENT_STATE.md` — Current development milestone and phase
- `CHANGE_HISTORY.md` — Historical change log

---

*Approved: NaijaDeals Stitch Baseline v1.0 — frozen for implementation.*
