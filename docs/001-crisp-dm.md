# Metodologia CRISP-DM para projetos de ciência de dados

## 📌 Visão Geral

O **CRISP-DM (Cross-Industry Standard Process for Data Mining)** é a metodologia mais consolidada para condução de projetos de ciência de dados. Ele fornece um framework estruturado, iterativo e orientado ao negócio, conectando objetivos estratégicos às soluções analíticas.

O método é composto por seis fases:

1. Business Understanding (Entendimento do Negócio)  
2. Data Understanding (Entendimento dos Dados)  
3. Data Preparation (Preparação dos Dados)  
4. Modeling (Modelagem)  
5. Evaluation (Avaliação)  
6. Deployment (Implantação)  

Seu diferencial está na **natureza iterativa**, permitindo revisões constantes ao longo do projeto.

---

# Aula 01 - Introdução ao CRISP-DM

## 📖 O que é o CRISP-DM?

O CRISP-DM surgiu nos anos 1990 como resposta à falta de padronização em projetos de mineração de dados, sendo criado por um consórcio envolvendo empresas como SPSS, NCR e Daimler-Benz.

Ele não define ferramentas, mas sim **uma forma estruturada de pensar projetos de dados**.

## 🎯 Principais características

- Metodologia **agnóstica a ferramentas**
- Foco em **valor de negócio**
- Processo **iterativo**
- Integra áreas técnicas e de negócio

## 🔄 As 6 fases do CRISP-DM

### 1. Business Understanding
- Entender a dor do negócio  
- Definir objetivos claros  
- Traduzir para perguntas analíticas  

### 2. Data Understanding
- Identificar fontes de dados  
- Explorar e validar qualidade  
- Detectar padrões iniciais  

### 3. Data Preparation
- Limpeza e tratamento  
- Feature engineering  
- Integração de dados  

### 4. Modeling
- Escolha de algoritmos  
- Treinamento e validação  

### 5. Evaluation
- Avaliar performance técnica  
- Validar com o negócio  

### 6. Deployment
- Colocar solução em produção  
- Gerar valor real  


!! tip "Dica"

    Um modelo com alta acurácia não tem valor se não resolve o problema correto.

---

# Aula 02 - Definição do problema de negócio e target

## 🎯 O papel do Business Understanding

A ciência de dados começa **antes do código**. O primeiro passo é traduzir objetivos estratégicos em problemas analíticos mensuráveis.

## 🧠 Da dor ao problema analítico

Exemplo:

| Problema de Negócio | Problema Analítico |
|--------------------|-------------------|
| Reduzir churn      | Prever cancelamento em 60 dias |
| Reduzir inadimplência | Prever default em 90 dias |
| Aumentar vendas    | Prever compra de produto |

## 🎯 Definição do Target

Estrutura recomendada:

> **Probabilidade de que [Unidade] fará [Ação] em [Período]**

### Exemplos:

- Cliente cancelar em 60 dias  
- Contrato entrar em default em 90 dias  
- Cliente comprar produto X na próxima visita  

## ⚠️ Armadilhas comuns

- **Leakage (vazamento de dados)**  
- **Proxy incorreto**  
- **Targets mal definidos**  
- **Viés nos dados**  

> Um target mal definido compromete todo o projeto.

---

# Aula 03 - Metas de negócio vs metas analíticas

## 🎯 Conceito central

> **Metas de negócio são o destino. Métricas analíticas são o caminho.**

## 🧩 Diferença entre os dois tipos

### 📊 Metas de Negócio
- Reduzir churn  
- Aumentar receita  
- Diminuir fraude  
- Melhorar NPS  

### ⚙️ Metas Analíticas
- Maximizar recall  
- Aumentar AUC  
- Reduzir RMSE  
- Melhorar precisão  

## 🔗 Conexão entre elas

Exemplo:

| Meta de Negócio | Meta Analítica |
|----------------|----------------|
| Reduzir fraude | Alta precisão |
| Detectar doenças | Alto recall |
| Aumentar vendas | Melhor lift |

# 📊 Métricas em Ciência de Dados: Classificação, Regressão e Negócio

Este guia apresenta as principais métricas utilizadas em projetos de ciência de dados, com foco em **interpretação, aplicação prática e trade-offs**.

---

# 🔍 Métricas de Classificação

## 🔹 Precision (Precisão)

$$
Precision = \frac{TP}{TP + FP}
$$

**Interpretação:**  
Proporção de previsões positivas que estão corretas.

**Pergunta-chave:**  
> Quando o modelo prevê positivo, ele acerta com que frequência?

**Insights:**
- Alta precision → poucos falsos positivos  
- Baixa precision → modelo gera muitos alarmes falsos  

**Quando usar:**
- Quando **falsos positivos são caros**
  - Fraude (bloquear cliente legítimo)
  - Crédito (recusar bom pagador)

---

## 🔹 Recall (Sensibilidade)

$$
Recall = \frac{TP}{TP + FN}
$$

**Interpretação:**  
Capacidade de identificar todos os casos positivos.

**Pergunta-chave:**  
> De todos os positivos reais, quantos o modelo encontrou?

**Insights:**
- Alto recall → poucos falsos negativos  
- Baixo recall → modelo deixa passar casos importantes  

**Quando usar:**
- Quando **falsos negativos são críticos**
  - Diagnóstico médico  
  - Churn de clientes valiosos  

---

## 🔹 F1-Score

$$
F1 = 2 \cdot \frac{Precision \cdot Recall}{Precision + Recall}
$$

**Interpretação:**  
Média harmônica entre precision e recall.

**Insights:**
- Penaliza desequilíbrio  
- Só é alto se ambos forem altos  

**Quando usar:**
- Classes desbalanceadas  
- Trade-off entre FP e FN  

---

## 🔹 AUC-ROC

$$
AUC = \int_0^1 TPR(FPR)\, d(FPR)
$$

Onde:
- $TPR = Recall$
- $FPR = \frac{FP}{FP + TN}$

**Interpretação:**  
Probabilidade do modelo rankear um positivo acima de um negativo.

**Escala:**

| Valor | Interpretação |
|------|-------------|
| 0.5  | Aleatório |
| 0.7–0.8 | Aceitável |
| 0.8–0.9 | Bom |
| >0.9 | Excelente |

**Quando usar:**
- Comparação de modelos  
- Avaliação independente de threshold  

**Limitações:**
- Não considera custo de erro  
- Pode ser enganosa em dados desbalanceados  

---

# 📉 Métricas de Regressão

## 🔹 MAE (Mean Absolute Error)

$$
MAE = \frac{1}{n} \sum_{i=1}^{n} |y_i - \hat{y}_i|
$$

**Interpretação:**  
Erro médio absoluto.

**Insights:**
- Fácil interpretação  
- Mesma unidade do problema  

**Quando usar:**
- Todos os erros têm peso igual  

---

## 🔹 RMSE (Root Mean Squared Error)

$$
RMSE = \sqrt{\frac{1}{n} \sum_{i=1}^{n} (y_i - \hat{y}_i)^2}
$$

**Interpretação:**  
Erro médio com penalização de grandes desvios.

**Insights:**
- Sensível a outliers  
- Penaliza erros grandes  

**Quando usar:**
- Erros grandes são críticos  
  - Previsão de demanda  
  - Risco financeiro  

---

## 🔹 MAPE (Mean Absolute Percentage Error)

$$
MAPE = \frac{100}{n} \sum_{i=1}^{n} \left| \frac{y_i - \hat{y}_i}{y_i} \right|
$$

**Interpretação:**  
Erro percentual médio.

**Insights:**
- Fácil comunicação com stakeholders  
- Permite comparação entre escalas  

**Limitações:**
- Explode quando $y_i \approx 0$  
- Pode distorcer resultados  

---

# 💰 Métricas de Negócio

## 🔹 ROI (Return on Investment)

$$
ROI = \frac{Ganho - Custo}{Custo}
$$

**Interpretação:**  
Retorno financeiro do projeto.

**Insights:**
- $ROI > 0$ → projeto viável  
- Quanto maior, melhor  

**Uso prático:**
- Justificar projetos  
- Priorizar iniciativas  

---

## 🔹 Expected Value (Valor Esperado)

$$
EV = \sum (Probabilidade \times Valor)
$$

**Interpretação:**  
Lucro médio esperado por decisão.

**Exemplo conceitual:**

| Evento | Probabilidade | Impacto |
|--------|--------------|--------|
| Acerto | 0.8 | +100 |
| Erro   | 0.2 | -50 |

$$
EV = (0.8 \times 100) + (0.2 \times -50)
$$

**Insights:**
- Integra modelo + impacto financeiro  
- Base para decisões ótimas  

---

## 🔹 Custo do Erro

**Definição:**  
Impacto financeiro associado a erros do modelo.

### Tipos de erro

| Tipo | Descrição | Impacto |
|------|----------|--------|
| FP | Falso Positivo | Custo operacional |
| FN | Falso Negativo | Perda direta |

### Exemplo (Fraude)

- FP → cliente bloqueado indevidamente  
- FN → fraude não detectada  

**Insight-chave:**
> A métrica ideal depende do custo relativo dos erros.

---

# 🎯 Estratégia de Escolha de Métricas

| Cenário | Métrica recomendada |
|--------|------------------|
| Evitar falsos positivos | Precision |
| Evitar falsos negativos | Recall |
| Equilíbrio geral | F1 |
| Comparar modelos | AUC |
| Erro médio simples | MAE |
| Penalizar erros grandes | RMSE |
| Comparação percentual | MAPE |
| Impacto financeiro | ROI / EV |

---

# ⚠️ Conclusão

> O melhor modelo não é o mais preciso — é o que gera mais valor para o negócio.

---

# 📚 Referências

- Provost, F.; Fawcett, T. (2013). *Data Science for Business*  
- Kuhn, M.; Johnson, K. (2013). *Applied Predictive Modeling*  
- Hastie, T.; Tibshirani, R.; Friedman, J. (2009). *The Elements of Statistical Learning*  
- Bishop, C. (2006). *Pattern Recognition and Machine Learning*  

!!! tip "Dica"

    Um modelo com alta acurácia não tem valor se não resolve o problema correto.

---

# Aula 04 - Como transformar uma dor de negócio em solução de dados

## 💡 O que é uma dor de negócio?

É um problema que impacta diretamente os objetivos estratégicos da empresa.

Exemplos:
- Queda de receita  
- Aumento de churn  
- Fraude crescente  
- Baixa conversão  

## 🎯 Identificação correta da dor

Problema comum:

❌ "Quero um modelo de churn"  
✅ "Quais clientes estão em risco e por quê?"

## 🔄 Tipos de problemas de dados

### 📊 Descritivo — O que aconteceu?
- Análise de padrões  
- Exploração de dados  

### 🔮 Preditivo — O que vai acontecer?
- Modelos de previsão  
- Classificação/regressão  

### 🎯 Prescritivo — O que fazer?
- Recomendação de ações  
- Otimização  

## 🏗️ Construindo uma solução end-to-end

### 1. Entendimento do negócio
- Conversas com stakeholders  
- Levantamento de contexto  

### 2. Formulação de hipóteses
- Perguntas investigáveis  
- Suposições testáveis  

### 3. Data Understanding & Preparation
- Coleta de dados  
- Limpeza e transformação  

### 4. Exploração (EDA)
- Identificação de padrões  
- Criação de features  

### 5. Definição do target
- Alinhado à dor de negócio  

### 6. Modelagem
- Começar simples (baseline)  
- Evoluir conforme necessário  

> “Simple is better than complex” — Tim Peters

### 7. Avaliação
- Métricas técnicas  
- Validação com stakeholders  

### 8. Teste em produção (PoC)
- Medir impacto real  

## 🔁 Insight fundamental

> Dados só geram valor quando se transformam em decisão.

---

# 📚 Referências

- CRISP-DM 1.0 Step-by-step Data Mining Guide (SPSS, 2000)  
- Wirth, R., & Hipp, J. (2000). CRISP-DM: Towards a standard process model for data mining  
- Provost, F., & Fawcett, T. (2013). *Data Science for Business*  
- Kuhn, M., & Johnson, K. (2013). *Applied Predictive Modeling*  
- Documentação original das aulas fornecidas