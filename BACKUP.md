# Backup e Restauração de Dados

## Supabase

- O Supabase realiza backups automáticos diários do banco de dados.
- Para restaurar um backup:
  1. Acesse o painel do Supabase.
  2. Vá em "Database Backups".
  3. Escolha o backup desejado e clique em "Restore".
  4. Confirme a restauração.

**Atenção:** A restauração sobrescreve o banco atual. Faça backup manual antes de restaurar!

## Arquivos Importantes

- Se houver arquivos fora do Supabase, faça backup manualmente:
  - Copie a pasta `public/` para um local seguro.
  - Use serviços de nuvem ou scripts agendados para backup automático.

## Teste de Restauração

- Periodicamente, realize um teste de restauração em ambiente de staging para garantir a integridade dos backups.

## Dúvidas

- Consulte a [documentação oficial do Supabase](https://supabase.com/docs/guides/platform/backups) para detalhes. 