export function parseArgs(argv: string[]) {
  const map = new Map<string, string | boolean>();

  for (const arg of argv) {
    if (!arg.startsWith('--')) continue;
    const [k, v] = arg.replace(/^--/, '').split('=');
    map.set(k, v ?? true);
  }

  const only = (map.get('only') as string | undefined)
    ?.split(',')
    .map((s) => s.trim())
    .filter(Boolean);
  const skip = (map.get('skip') as string | undefined)
    ?.split(',')
    .map((s) => s.trim())
    .filter(Boolean);
  const dryRun = map.get('dry') === true || map.get('dry') === 'true';

  return { only, skip, dryRun };
}
