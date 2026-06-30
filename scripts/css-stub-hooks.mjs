// CHANGED (S16): module-customization hooks that stub `.css` imports for the SSR smoke.
// Claude-guide sims co-locate their CSS (`import "./tokenBudget.css"`); Node can't load a
// `.css` file as a module, so without this the tsx-run smoke (scripts/smoke.ts) would crash on
// the first sim it imports. smoke.ts registers these hooks via node:module `register()` before
// it imports any component. (The database guide doesn't need this — its sims have no CSS imports.)
export async function resolve(specifier, context, nextResolve) {
  if (specifier.endsWith(".css")) {
    return { url: new URL(specifier, context.parentURL).href, shortCircuit: true };
  }
  return nextResolve(specifier, context);
}

export async function load(url, context, nextLoad) {
  if (url.endsWith(".css")) {
    return { format: "module", source: "export default {};", shortCircuit: true };
  }
  return nextLoad(url, context);
}
