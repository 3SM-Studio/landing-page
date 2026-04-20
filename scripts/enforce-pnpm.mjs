const userAgent = process.env.npm_config_user_agent ?? '';

process.stdout.write(`npm_config_user_agent: ${userAgent}\n`);

if (!userAgent.startsWith('pnpm/')) {
  console.error('\nThis project uses pnpm only.');
  console.error('Use: pnpm install\n');
  process.exit(1);
}
