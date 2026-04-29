👥 ETAPA 4 — Todo mundo pega a develop

Os outros membros fazem:

git fetch
git checkout develop

👉 Agora todos estão na mesma base

🌿 ETAPA 5 — Cada um cria sua branch

ANTES de começar qualquer coisa:

git checkout develop
git pull origin develop
git checkout -b feature/nome-da-sua-feature

Exemplo:

git checkout -b feature/login
💻 ETAPA 6 — Trabalhar normalmente

Codou? Então:

git add .
git commit -m "feat: adiciona login"
git push origin feature/login
🔀 ETAPA 7 — Criar Pull Request (PR)

No GitHub:

Vai aparecer "Compare & pull request"
Base: develop
Compare: sua branch (feature/login)

👉 Outra pessoa revisa seu código

✅ ETAPA 8 — Merge

Depois da aprovação:

Clica em Merge pull request
Sua feature entra na develop
🧹 ETAPA 9 — Apagar a branch

Depois do merge:

git push origin --delete feature/login
git branch -d feature/login
🔄 ETAPA 10 — Atualizar antes de começar outra tarefa

Sempre faça isso:

git checkout develop
git pull origin develop

👉 Só depois cria outra branch