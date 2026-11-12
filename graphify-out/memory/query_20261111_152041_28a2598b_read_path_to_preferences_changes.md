---
type: "path_query"
date: "2026-11-11T15:20:41.063276+00:00"
question: "read path to preferences changes"
contributor: "graphify"
outcome: "useful"
source_nodes: ["PreferencesControls()", "PreferencesProvider()", "saveThemePreference()", "replacePathLocale()"]
---

# Q: read path to preferences changes

## Answer

PreferencesControls at views/preferences/PreferencesControls.tsx L7 connects to preference model validators. PreferencesProvider at modules/preferences/internal/PreferencesProvider.tsx L31 owns shared preference state. Shortest paths to saveThemePreference and replacePathLocale pass through isLocale and model.ts containment; these are structural links, not runtime call-order proofs.

## Outcome

- Signal: useful

## Source Nodes

- PreferencesControls()
- PreferencesProvider()
- saveThemePreference()
- replacePathLocale()