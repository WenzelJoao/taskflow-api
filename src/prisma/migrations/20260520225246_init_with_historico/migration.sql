/*
  Warnings:

  - You are about to drop the column `area_conhecimento` on the `Projeto` table. All the data in the column will be lost.
  - You are about to drop the column `data_criacao` on the `Projeto` table. All the data in the column will be lost.
  - You are about to drop the column `data_vencimento` on the `Projeto` table. All the data in the column will be lost.
  - Added the required column `areaConhecimento` to the `Projeto` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updatedAt` to the `Projeto` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updatedAt` to the `Tarefa` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Projeto" DROP COLUMN "area_conhecimento",
DROP COLUMN "data_criacao",
DROP COLUMN "data_vencimento",
ADD COLUMN     "areaConhecimento" TEXT NOT NULL,
ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL,
ALTER COLUMN "descricao" DROP NOT NULL;

-- AlterTable
ALTER TABLE "Tarefa" ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "projetoId" INTEGER,
ADD COLUMN     "status" TEXT NOT NULL DEFAULT 'pendente',
ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "usuarioId" INTEGER;

-- CreateTable
CREATE TABLE "HistoricoTarefa" (
    "id" SERIAL NOT NULL,
    "tarefaId" INTEGER NOT NULL,
    "usuarioId" INTEGER NOT NULL,
    "acao" TEXT NOT NULL,
    "descricao" TEXT,
    "projetoId" INTEGER,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "HistoricoTarefa_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Tarefa" ADD CONSTRAINT "Tarefa_usuarioId_fkey" FOREIGN KEY ("usuarioId") REFERENCES "Usuario"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Tarefa" ADD CONSTRAINT "Tarefa_projetoId_fkey" FOREIGN KEY ("projetoId") REFERENCES "Projeto"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "HistoricoTarefa" ADD CONSTRAINT "HistoricoTarefa_tarefaId_fkey" FOREIGN KEY ("tarefaId") REFERENCES "Tarefa"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "HistoricoTarefa" ADD CONSTRAINT "HistoricoTarefa_usuarioId_fkey" FOREIGN KEY ("usuarioId") REFERENCES "Usuario"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "HistoricoTarefa" ADD CONSTRAINT "HistoricoTarefa_projetoId_fkey" FOREIGN KEY ("projetoId") REFERENCES "Projeto"("id") ON DELETE SET NULL ON UPDATE CASCADE;
