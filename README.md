
---

# 🌍 HypoOrbit

**HypoOrbit** é uma aplicação web para **visualização e comparação de dados geoespaciais gratuitos** provenientes de diferentes satélites.  
A plataforma centraliza informações que hoje estão dispersas, permitindo que usuários identifiquem de forma simples **quais satélites possuem dados para uma área de interesse**, consultando variáveis geoespaciais como **NDVI, EVI, temperatura da superfície e umidade do solo**.  

O público principal são **pesquisadores e estudantes**, que poderão explorar os dados em **mapas interativos** e comparar séries temporais lado a lado, sem a necessidade de baixar e processar manualmente os conjuntos de dados.

---

## 📌 Problema

O crescente volume de dados de satélites, embora extremamente útil, torna-se um desafio devido à **dificuldade de identificar, acessar e comparar os produtos disponíveis**.  
Atualmente, não existe uma plataforma unificada que permita, de forma rápida e intuitiva, descobrir **quais satélites oferecem dados para uma localização específica**, suas **resoluções espaciais e temporais**, e as **variáveis disponíveis**.  

Essa fragmentação dificulta a análise e força o usuário a buscar manualmente em diferentes fontes, atrasando decisões que dependem da avaliação de **séries temporais de variáveis geoespaciais**.  

---

## 💡 Solução

O **HypoOrbit** resolve esse problema ao oferecer um **portal web de visualização baseado em mapas interativos**, com as seguintes funcionalidades:  
- Seleção de um ponto no mapa para identificar rapidamente os **satélites com dados disponíveis** para a região.  
- Integração com o serviço **STAC API**, listando dinamicamente os metadados dos satélites (resolução espacial e temporal, variáveis disponíveis).  
- Integração com o serviço **WTSS**, possibilitando recuperar e exibir **séries temporais de variáveis geoespaciais**.  
- Visualização comparativa lado a lado de séries temporais, facilitando a análise entre diferentes satélites.  
- Filtros por satélite, variável e período de tempo, além da possibilidade de exportar metadados e séries temporais para análise posterior.  

---

## ✅ Requisitos

### Requisitos Funcionais
- **RF01**: Permitir que os usuários selecionem um ponto de interesse em um **mapa interativo**, utilizando coordenadas geográficas ou clique direto.  
- **RF02**: Retornar dinamicamente uma **lista de satélites com dados gratuitos** disponíveis para a área, detalhando resoluções espacial e temporal, além das variáveis geoespaciais oferecidas.  
- **RF03**: Possibilitar a **comparação de séries temporais de variáveis similares** (ex.: NDVI de Sentinel-2 e Landsat-8) para a mesma área, com visualização lado a lado em gráficos ou representações visuais.  
- **RF04**: Oferecer **opções de filtragem** por satélite, variável e período de tempo, além de permitir a **exportação de metadados e séries temporais** (quando permitido) para análise posterior.  

### Requisitos Não Funcionais
- **RNF01**: Interface intuitiva e de fácil navegação, mesmo para usuários sem experiência em geoprocessamento.  
- **RNF02**: Desempenho otimizado para carregamento rápido de mapas e dados, mesmo com grandes volumes.  
- **RNF03**: Escalabilidade para suportar novos satélites e variáveis no futuro.  
- **RNF04**: Confiabilidade e precisão na exibição dos dados, sempre atualizados a partir das fontes oficiais.  

### Restrições de Projeto
- **RP01**: Utilização exclusiva de **dados gratuitos de satélite** (Sentinel, Landsat, MODIS etc.).  
- **RP02**: Desenvolvimento limitado ao **tempo e recursos da disciplina**, focando em um MVP funcional.  
- **RP03**: Dependência da **disponibilidade e qualidade dos serviços externos** (STAC, WTSS e catálogos oficiais).  
  

---

## 👥 User Stories

- **RF01**: Como analista geoespacial, quero selecionar um ponto no mapa ou inserir coordenadas para visualizar satélites disponíveis para a área.  
- **RF02**: Como analista geoespacial, quero visualizar a lista de satélites disponíveis, com resoluções espaciais, temporais e variáveis oferecidas.  
- **RF03**: Como analista geoespacial, quero comparar séries temporais de variáveis similares de diferentes satélites, lado a lado.  
- **RF04**: Como analista geoespacial, quero aplicar filtros (satélite, variável, período) e exportar dados/metadados para análise posterior.  

📄 [Veja os detalhes das User Stories](./docs/UserStory.pdf)
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
|     | Controle para validar se a lista de satélites já não existe na base de dados                 |                                               | ❌               | https://trello.com/c/RobBOfp3                                        |                      |
|[IH - 004]| Protótipo componente do mapa                                                       | Eduardo Henrique Alves Arantes            | ⏳      | https://trello.com/c/XxWGKXck                                        |                      |
|[DW - 001]| Estudo das API's disponibilizadas                                                  | Adson Ottoni Balbino Filho                | ✔               | https://trello.com/c/kyHKAsp0                                        |                      |
|[GP - 002]| Criar Users Stories                                                                | Andressa Stephane Toledo da Silva         | ✔               | https://trello.com/c/isZfsnBK                                        |                      |
|[GP - 003]| Documentação e planejamento                                                        | Carlos Eduardo da Silva Magalhães         | ✔               | https://trello.com/c/6AJweeEe                                        |                      |
|[DW - 005]| Estudo das séries temporais de imagens disponibilizadas por cada satélite           | Gustavo de Moraes Silva                  | ✔               | https://trello.com/c/dV50F1zv                                        |                      |



#### 📉 Burndown  

[Burndown Sprint 1](https://docs.google.com/spreadsheets/d/1YuzbyKSY1FIR5lAljDzvItmEe6e0Qt3qpkBV0XSYNkI/edit?usp=sharing)  

---

### 🌀 Sprint 2

#### 📋 Tarefas  

| ID  | Nome                                                 | Responsáveis                                  | Tarefa Finalizada | Link                                                                 | Requisitos atendidos                       |
|-----|------------------------------------------------------|-----------------------------------------------|-------------------|----------------------------------------------------------------------|-------------------------------------------|


#### 📉 Burndown  

[Burndown Sprint 2](./burndown.png)  

---

### 🌀 Sprint 3

#### 📋 Tarefas  

| ID  | Nome                                                 | Responsáveis                                  | Tarefa Finalizada | Link                                                                 | Requisitos atendidos                       |
|-----|------------------------------------------------------|-----------------------------------------------|-------------------|----------------------------------------------------------------------|-------------------------------------------|


#### 📉 Burndown  

[Burndown Sprint 3](./burndown.png)  


---

## 👨🏻‍💻 Equipe

| Nome                              | Função        | GitHub                                                      |
| --------------------------------- | ------------- | ----------------------------------------------------------- |
| Carlos Eduardo da Silva Magalhães | Scrum Master | [carlosedsmagalhaes](https://github.com/carlosedsmagalhaes) |
| Andressa Stephane Toledo da Silva | Product Owner | [andressatoledo](https://github.com/andressatoledo)         |
| Adson Ottoni Balbino Filho        | Developer     | [adsonfilho](https://github.com/adsonfilho)                 |
| Eduardo Henrique Alves Arantes    | Developer     | [eduardohalves](https://github.com/eduardohalves)           |
| Gustavo de Moraes Silva           | Developer     | [guhms7](https://github.com/guhms7)                         |

---

## 📄 Licença

Este projeto é de uso acadêmico e está sob a licença [MIT](LICENSE).
