
---

# 🌍 HypoOrbit

**HypoOrbit** é uma aplicação web que centraliza **buscas de dados e imagens de satélite gratuitas** e permite gerar **produtos derivados** úteis para análise agrícola, como o **NDVI** (Índice de Vegetação por Diferença Normalizada) e o **VCI** (Índice de Condição da Vegetação).  

A plataforma tem como público principal **analistas agrícolas**, oferecendo ferramentas que simplificam o acesso, processamento e visualização de dados geoespaciais, ajudando na avaliação de condições vegetativas em diferentes regiões.

---

## 📌 Problema

Atualmente, analistas e pesquisadores enfrentam dificuldades como:
- Acesso fragmentado a diferentes fontes de imagens de satélite.
- Complexidade no processamento de índices vegetativos (NDVI, VCI, entre outros).
- Necessidade de múltiplas ferramentas para **buscar, processar e visualizar** dados.

---

## 💡 Solução

O **HypoOrbit** surge como uma **plataforma centralizada** que:
- Permite buscar imagens de diferentes satélites de forma simplificada.
- Processa imagens para gerar **índices de vegetação** e outros produtos derivados.
- Disponibiliza resultados em forma de **mapas interativos** e **dashboards**.
- Facilita a exportação de imagens e índices para análises posteriores.

---

## ✅ Requisitos

### Requisitos Funcionais
- **RF01**: Permitir a busca de imagens de satélite por localização e período.  
- **RF02**: Calcular o **NDVI** a partir de imagens fornecidas pelo satélite.  
- **RF03**: Calcular o **VCI** utilizando valores mínimos e máximos do NDVI em séries temporais.  
- **RF04**: Exibir mapas e gráficos interativos com os resultados.  
- **RF05**: Permitir exportação das imagens e dos índices processados.  

### Requisitos ❌ Funcionais
- **RNF01**: Interface amigável, voltada para analistas agrícolas.  
- **RNF02**: Performance otimizada para manipulação de grandes volumes de dados geoespaciais.  
- **RNF03**: Escalabilidade para inclusão de novos índices e fontes de dados.  
- **RNF04**: Confiabilidade dos cálculos e consistência na exibição dos dados.  

### Restrições de Projeto
- **RP01**: Uso de dados satelitais gratuitos (Sentinel, Landsat, MODIS, etc.).  
- **RP02**: Limitação de tempo e recursos para desenvolvimento do MVP.  
- **RP03**: Dependência da disponibilidade e qualidade das imagens fornecidas pelos satélites.  

---

## 👥 User Stories


---

## 🛠️ Tecnologias Utilizadas
- **Frontend:** React  
- **Backend:** TypeScript + Node.js  
- **Banco de Dados:** MongoDB  

📌 **Protótipo (Figma):** [Acessar protótipo](https://www.figma.com/design/eiSGNk9SDmo6oF9e5SnoQ8/Untitled?node-id=0-1&t=pgoLcZLZoTRgXqmj-1)

---

## 🚀 Como Executar o Projeto

```bash
# Clone este repositório
git clone https://github.com/seu-repo/HypoOrbit.git

# Acesse a pasta do projeto
cd HypoOrbit

# Instale as dependências
npm install

# Inicie o servidor de desenvolvimento
npm run dev
````

---

## 📅 Gestão do Projeto

- **Trello:** [link do board](https://trello.com/invite/b/68c85d2e7abd132e0922d0da/ATTI53d2463ac0fc0b7b6c274c64032660fa7B69CD6E/HypoOrbit)  

---

### 🌀 Sprint 1

#### 📋 Tarefas  

| ID  | Nome                                                                                          | Responsáveis                                  | Tarefa Finalizada | Link                                                                 | Requisitos atendidos |
|-----|-----------------------------------------------------------------------------------------------|-----------------------------------------------|-------------------|----------------------------------------------------------------------|----------------------|
|     | Criar logotipo                                                                                |                                               | ❌               | https://trello.com/c/sCrIZaEj                                        |                      |
|     | Definir paleta                                                                                |                                               | ❌               | https://trello.com/c/uIrttFpn                                        |                      |
|     | Mapa de Expectativas                                                                          |                                               | ❌               | https://trello.com/c/PHcfSK2m                                        |                      |
|     | Priorização MosCoW                                                                            |                                               | ❌               | https://trello.com/c/TkvKqK1b                                        |                      |
|     | Personas                                                                                      |                                               | ❌               | https://trello.com/c/XsjuLeQS                                        |                      |
|     | Mapa de Jornada do Usuário                                                                    |                                               | ❌               | https://trello.com/c/XKMTdvsE                                        |                      |
|     | Agrupar em um documento para entregar                                                         |                                               | ❌               | https://trello.com/c/f7Q5h25C                                        |                      |
|     | Criação de Banco de Dados                                                                     |                                               | ❌               | https://trello.com/c/F4h3JVjZ                                        |                      |
|     | Modelagem de Relacionamentos                                                                  |                                               | ❌               | https://trello.com/c/hrXYimRr                                        |                      |
|     | Scripts MongoDB                                                                               |                                               | ❌               | https://trello.com/c/BmJEE0tf                                        |                      |
|     | Comparação com SQL                                                                            |                                               | ❌               | https://trello.com/c/plPQMJ6X                                        |                      |
|     | Prints de Execução                                                                            |                                               | ❌               | https://trello.com/c/287OwQRc                                        |                      |
|     | Protótipo do componente para listar os satélites                                              |                                               | ❌               | https://trello.com/c/xHCHx9q0                                        |                      |
|     | Criar componente do mapa                                                                      |                                               | ❌               | https://trello.com/c/495AoU4K                                        |                      |
|     | Capturar clique e converter para coordenadas                                                  |                                               | ❌               | https://trello.com/c/LcAJ0ovL                                        |                      |
|     | Validar coordenadas manuais                                                                   |                                               | ❌               | https://trello.com/c/7GEoQl8h                                        |                      |
|     | Exibir mensagem de erro se a coordenada for inválida.                                          |                                               | ❌               | https://trello.com/c/FWJqi45t                                        |                      |
|     | Consumir JSON da STAC API                                                                     |                                               | ❌               | https://trello.com/c/LYdwj4cB                                        |                      |
|     | Criar componente de listagem de satélites                                                     |                                               | ❌               | https://trello.com/c/zXJHF9K3                                        |                      |
|     | Renderizar lista dinâmica (satélite, resolução, variáveis)                                    |                                               | ❌               | https://trello.com/c/u8JrPZeg                                        |                      |
|     | CRUD de satélites                                                                             |                                               | ❌               | https://trello.com/c/HyGbjPiw                                        |                      |
|     | Rota para acessar os satélites de acordo com a localização informada                          |                                               | ❌               | https://trello.com/c/m3uhWPNw                                        |                      |
|     | Controle para validar se a lista de satélites já ❌ existe na base de dados…                 |                                               | ❌               | https://trello.com/c/RobBOfp3                                        |                      |
|[IH - 004]| Protótipo componente do mapa                                                       | Eduardo Henrique Alves Arantes            | ⏳      | https://trello.com/c/XxWGKXck                                        |                      |
|[DW - 001]| Estudo das API's disponibilizadas                                                  | Adson Ottoni Balbino Filho                | ✔               | https://trello.com/c/kyHKAsp0                                        |                      |
|[GP - 002]| Criar Users Stories                                                                | Andressa Stephane Toledo da Silva         | ✔               | https://trello.com/c/isZfsnBK                                        |                      |
|[GP - 003]| Documentação e planejamento                                                        | Carlos Eduardo da Silva Magalhães         | ✔               | https://trello.com/c/6AJweeEe                                        |                      |
|[DW - 005]| Estudo das séries temporais de imagens disponibilizadas por cada satélite           | Gustavo de Moraes Silva                  | ✔               | https://trello.com/c/dV50F1zv                                        |                      |



#### 📉 Burndown  

![Burndown Sprint 1](./burndown.png)  

---

### 🌀 Sprint 2

#### 📋 Tarefas  

| ID  | Nome                                                 | Responsáveis                                  | Tarefa Finalizada | Link                                                                 | Requisitos atendidos                       |
|-----|------------------------------------------------------|-----------------------------------------------|-------------------|----------------------------------------------------------------------|-------------------------------------------|


#### 📉 Burndown  

![Burndown Sprint 2](./burndown.png)  

---

### 🌀 Sprint 3

#### 📋 Tarefas  

| ID  | Nome                                                 | Responsáveis                                  | Tarefa Finalizada | Link                                                                 | Requisitos atendidos                       |
|-----|------------------------------------------------------|-----------------------------------------------|-------------------|----------------------------------------------------------------------|-------------------------------------------|


#### 📉 Burndown  

![Burndown Sprint 3](./burndown.png)  


---

## 👨🏻‍💻 Equipe

| Nome                              | Função        | GitHub                                                      |
| --------------------------------- | ------------- | ----------------------------------------------------------- |
| Andressa Stephane Toledo da Silva | Scrum Master  | [andressatoledo](https://github.com/andressatoledo)         |
| Carlos Eduardo da Silva Magalhães          | Product Owner | [carlosedsmagalhaes](https://github.com/carlosedsmagalhaes) |
| Adson Ottoni Balbino Filho        | Developer     | [adsonfilho](https://github.com/adsonfilho)                 |
| Eduardo Henrique Alves Arantes    | Developer     | [eduardohalves](https://github.com/eduardohalves)           |
| Gustavo de Moraes Silva           | Developer     | [guhms7](https://github.com/guhms7)                         |

---

## 📄 Licença

Este projeto é de uso acadêmico e está sob a licença [MIT](LICENSE).
