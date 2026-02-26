# Guia prático: trabalhar com as duas versões

Este guia ajuda-te a trabalhar sem medo de estragar a app em produção.

## As 2 versões (branches)

- `main` = versão estável/publicada (produção)
- `feat/heroui-experiment` = versão de testes para experimentar HeroUI

Regra simples: **não faças testes na `main`**.

## Como saber em que versão estás

No terminal, dentro do projeto:

```bash
git branch --show-current
```

Se aparecer:
- `main` -> estás na versão estável
- `feat/heroui-experiment` -> estás na versão de testes

## Mudar de versão

### Ir para versão estável (`main`)

```bash
git checkout main
git pull origin main
```

### Ir para versão de testes (`feat/heroui-experiment`)

```bash
git checkout feat/heroui-experiment
git pull origin feat/heroui-experiment
```

## Fluxo recomendado no dia a dia

1. **Começar sempre na branch de testes**
   ```bash
   git checkout feat/heroui-experiment
   ```
2. Fazer alterações e testar localmente
3. Guardar as alterações:
   ```bash
   git add .
   git commit -m "descrição simples do que mudaste"
   git push
   ```
4. Quando estiver tudo bom e validado, só aí passar para `main` (normalmente via Pull Request)

## O que fazer se algo correr mal nos testes

Sem stress: a `main` continua intacta.

Podes voltar à versão estável a qualquer momento:

```bash
git checkout main
```

## Publicar alterações sem risco

- Trabalhas na `feat/heroui-experiment`
- Validas tudo
- Fazes merge para `main` apenas quando estiver pronto
- O deploy de produção deve sair da `main`

## Checklist rápida antes de mexer

- [ ] Confirmar branch atual com `git branch --show-current`
- [ ] Se não estiver na de testes, mudar para `feat/heroui-experiment`
- [ ] Fazer alterações pequenas e testar
- [ ] Fazer commit/push regularmente

## Comandos úteis (copiar/colar)

```bash
# Ver branch atual
git branch --show-current

# Ir para testes
git checkout feat/heroui-experiment

# Ir para produção/estável
git checkout main

# Ver o estado dos ficheiros
git status

# Guardar alterações
git add .
git commit -m "mensagem"
git push
```

---

Se quiseres, no próximo passo posso também criar um mini-guia visual no `README.md` com links para este ficheiro.
