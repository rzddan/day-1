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

# Queries Supabase para Frontend

## Empresas
```js
const { data: companies, error } = await supabase.from('companies').select('*')
```

## Projetos de uma empresa
```js
const { data: projects, error } = await supabase.from('projects').select('*').eq('company_id', companyId)
```

## Trilhas de aprendizado
```js
const { data: tracks, error } = await supabase.from('learning_tracks').select('*')
```

## Conquistas
```js
const { data: achievements, error } = await supabase.from('achievements').select('*')
```

## Uploads de arquivos
```js
const { data: uploads, error } = await supabase.from('uploads').select('*').eq('user_id', userId)
```

## Histórico de XP do usuário
```js
const { data: xp, error } = await supabase.from('xp_history').select('*').eq('user_id', userId)
```

---

> Ajuste os nomes dos campos conforme o uso real no frontend. Para filtros, use `.eq`, `.like`, `.in`, etc. 