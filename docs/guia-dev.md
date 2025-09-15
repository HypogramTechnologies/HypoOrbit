# 🛠️ Guia de Desenvolvimento

Este documento define os padrões internos do time de desenvolvimento para manter consistência no código e na colaboração.

---

## 🌿 Estrutura de Branches

- `main` → versão estável do projeto (produção)  
- `develop` → branch de desenvolvimento principal  

---

## ✍️ Padrão de Commits
Formato:
```

<tipo>(escopo opcional): descrição breve

```

Exemplos:
- `feat: implementar cálculo de NDVI`
- `fix(api): corrigir rota de autenticação`
- `docs: atualizar instruções de execução`

Tipos usados:
- `feat` → nova funcionalidade  
- `fix` → correção  
- `docs` → documentação  
- `refactor` → refatoração  
- `test` → testes  
- `chore` → manutenção  

---

## 🔄 Fluxo de Trabalho

1. Desenvolver diretamente na `develop`.  
2. Commits devem seguir o padrão definido acima.  
3. Ao finalizar uma funcionalidade ou correção, abrir **Pull Request da `develop` para a `main`**.  
4. Revisão do PR por pelo menos **1 desenvolvedor**.  
5. Merge na `main` somente após aprovação.  
6. Atualizar a `develop` com o código da `main` sempre que necessário para manter sincronização.  

---
