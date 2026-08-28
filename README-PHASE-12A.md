# Phase 12A — Security Hardening

Removes the Next.js powered-by response header and adds browser-facing frame, MIME, referrer, permissions, opener, DNS-prefetch and transport-security headers.

A restrictive frontend Content Security Policy is intentionally deferred until deployment origins are known; adding one now would risk blocking Next.js bootstrap scripts or the separately hosted Express API.
