import { AppDataSource } from '../data-source';
import { SEEDERS } from './index';
import { parseArgs } from './seed.utils';

async function main() {
  // 1. Obtenemos los argumentos nativos de la consola para soporte de emergencia
  const rawArgs = process.argv.slice(2);
  let { only, skip, dryRun } = parseArgs(rawArgs);

  // 2. BLINDAJE: Si 'only' viene vacío o mal mapeado por culpa del signo '=', lo corregimos manualmente
  if (!only || only.length === 0 || only.includes('')) {
    const onlyRaw = rawArgs.find(arg => arg.startsWith('--only='));
    if (onlyRaw) {
      const valorExtraido = onlyRaw.split('=')[1]?.trim();
      if (valorExtraido) only = [valorExtraido]; // Forzamos el array limpio
    }
  }

  await AppDataSource.initialize();

  try {
    const selected = SEEDERS.filter((s) => {
      if (only?.length) return only.includes(s.name);
      if (skip?.length) return !skip.includes(s.name);
      return true;
    });

    if (!selected.length) {
      console.log('⚠️ No hay seeders seleccionados.');
      return;
    }

    console.log(
      '🌱 Seeders a ejecutar:',
      selected.map((s) => s.name).join(', '),
    );

    for (const seeder of selected) {
      console.log(`\n➡️  Running: ${seeder.name}`);
      if (dryRun) {
        console.log('   (dry-run) no se ejecuta nada');
        continue;
      }
      await seeder.run(AppDataSource);
      console.log(`✅ Done: ${seeder.name}`);
    }
  } finally {
    await AppDataSource.destroy();
  }
}

main().catch((err) => {
  console.error('❌ Seeding error:', err);
  process.exit(1);
});