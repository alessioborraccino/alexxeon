# Alexx Eon Studio

This Studio uses Sanity 6 and the existing `nulp5uls` production dataset. Install with `npm ci`; run `npm run dev`, `npm run validate`, and `npm run build`. See the root README for migration, deployment, publishing hooks, and rollback instructions. No dataset changes are required.

Transitive overrides patch vulnerable CLI dependencies: js-yaml and smol-toml under @vercel/frameworks, undici under the module-federation types plugin, and uuid under typeid-js. The uuid override crosses one major version; validate typeid generation and CLI/schema/build behavior when updating. Remove overrides when upstream requirements include patched releases.
