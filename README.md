
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

### Requisitos Não Funcionais
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

| ID  | Nome                                                 | Estimativa | Responsáveis                                  | Tarefa Finalizada | Link                                                                 | Requisitos atendidos                       |
|-----|------------------------------------------------------|------------|-----------------------------------------------|-------------------|----------------------------------------------------------------------|-------------------------------------------|


#### 📉 Burndown  

![Burndown Sprint 1](./burndown.png)  

---

### 🌀 Sprint 2

#### 📋 Tarefas  

| ID  | Nome                                                 | Estimativa | Responsáveis                                  | Tarefa Finalizada | Link                                                                 | Requisitos atendidos                       |
|-----|------------------------------------------------------|------------|-----------------------------------------------|-------------------|----------------------------------------------------------------------|-------------------------------------------|


#### 📉 Burndown  

![Burndown Sprint 2](./burndown.png)  

---

### 🌀 Sprint 3

#### 📋 Tarefas  

| ID  | Nome                                                 | Estimativa | Responsáveis                                  | Tarefa Finalizada | Link                                                                 | Requisitos atendidos                       |
|-----|------------------------------------------------------|------------|-----------------------------------------------|-------------------|----------------------------------------------------------------------|-------------------------------------------|


#### 📉 Burndown  

![Burndown Sprint 3](./burndown.png)  


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
