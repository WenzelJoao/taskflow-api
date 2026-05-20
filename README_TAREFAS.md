API de Tarefas

Use os endpoints sob /api/tarefas.

Exemplo de criação (curl):

curl -X POST http://localhost:3000/api/tarefas -H "Content-Type: application/json" -d '{"titulo":"Teste","descricao":"desc","data_vencimento":"2026-06-01","prioridade":"alta"}'
