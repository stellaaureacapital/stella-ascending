# Presentation conventions

- Keep navigation and account controls on the shared Button component so touch targets and keyboard-focus states stay consistent.
- Show the site desktop navigation from the xl breakpoint to prevent the brand and translated links from competing for space.

# Academy integration

- Reuse products, product_modules and existing entitlements; extend learning in academy-specific tables to avoid duplicating commerce or auth.
- Keep grading, unlocks, XP and certificate eligibility in private database functions exposed only through authenticated invoker wrappers; students cannot write authoritative learning records.
- Publish learning content only after editorial completeness checks; product drafts remain visible as development status, not purchasable finished material.