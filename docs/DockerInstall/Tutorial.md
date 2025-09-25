# 🚀 Tutorial: Rodando o projeto com Docker no Windows usando WSL2

Este tutorial vai te ensinar a instalar o Docker no Windows utilizando o WSL2, e como buildar e rodar o seu projeto frontend e backend usando Docker Compose.

---

## 1️⃣ Pré-requisitos

- Windows 10 ou 11 (com atualização de build para suportar WSL2)
- WSL2 instalado e ativado (Ubuntu recomendado)
- Conta de administrador no Windows

---

## 2️⃣ Instalando o WSL2

1. Abra o **PowerShell** como administrador.
2. Execute o comando para instalar o WSL2 e Ubuntu:

```powershell
wsl --install
```

> Isso instala o kernel do WSL2 e a distribuição padrão (Ubuntu).

3. Reinicie o computador, se necessário.
4. Verifique a instalação:

```powershell
wsl --list --verbose
```

> Você deve ver algo como:

```powershell
  NAME      STATE           VERSION
* Ubuntu    Running         2
```

---

## 3️⃣ Instalando o Docker Desktop para Windows

1. Baixe o Docker Desktop: [Download](https://www.docker.com/get-started/), use a versão AMD64.
2. Finalize a instalação e abra o Docker Desktop.
3. Após a instalação, acesse "configurações" e habilite a opção **Use the WSL 2 based engine**.
4. No terminal, verifique se o Docker está funcionando:

```bash
docker --version
docker-compose --version
```

---

## 4️⃣ Build das imagens Docker

1. Abra o terminal no diretório raiz do projeto (onde está o `docker-compose.yml`).
2. Execute:

```bash
docker-compose build
```

> Isso vai construir as imagens do frontend e backend.

---

## 5️⃣ Subindo os containers

Para rodar os containers:

```bash
docker-compose up -d
```

- `-d` significa “modo daemon”, roda em segundo plano.
- Para ver os logs em tempo real:

```bash
docker-compose logs -f
```

- Para parar os containers:

```bash
docker-compose down
```

---

## 6️⃣ Verificando se está funcionando

- Backend (Express): [http://localhost:3001](http://localhost:3001)
- Frontend (Vite/Nginx): [http://localhost:5173](http://localhost:5173)

Para listar os containers rodando:

```bash
docker ps
```

Para listar as imagens construídas:

```bash
docker images
```

---

## Dicas importantes

- Se fizer alterações nas dependências (`package.json`), sempre faça rebuild:

```bash
docker-compose build
```

- Para desenvolvimento com hot reload, use volumes nos serviços do `docker-compose.yml`:

```yaml
volumes:
  - ./backend:/app
  - /app/node_modules
```

Isso garante que alterações no código local reflitam dentro do container.

- Para remover volumes antigos e começar do zero:

```bash
docker-compose down -v --remove-orphans
docker-compose up --build
```

---

✅ Pronto! Agora você tem o Docker rodando no Windows via WSL2 e seu projeto frontend/backend funcionando em containers.

---
