# 01. CRISP-DM e Métricas Utilizadas

## 1. CRISP-DM

### 1.1 Visão Geral

O **CRISP-DM (Cross-Industry Standard Process for Data Mining)** é um framework amplamente utilizado para condução de projetos de dados, com foco direto em **geração de valor de negócio**.

!!! info "Características principais"

    - Independente de ferramentas  
    - Orientado ao problema de negócio  
    - Processo iterativo  
    - Integra áreas técnicas e estratégicas  

---

### 1.2 Fases do CRISP-DM

O processo é composto por seis fases interdependentes:

1. **Business Understanding**  
   Definição do problema e dos objetivos de negócio  

2. **Data Understanding**  
   Exploração inicial dos dados e avaliação de qualidade  

3. **Data Preparation**  
   Limpeza, transformação e construção de variáveis  

4. **Modeling**  
   Treinamento e validação de modelos  

5. **Evaluation**  
   Avaliação técnica e validação com o negócio  

6. **Deployment**  
   Colocação do modelo em produção  

!!! tip "Princípio fundamental"

    Um modelo só tem valor quando resolve o problema correto.

---

## 2. Definição do Problema e Target

### 2.1 Do problema de negócio ao problema analítico

| Negócio | Problema Analítico |
|--------|------------------|
| Reduzir churn | Prever cancelamento |
| Reduzir inadimplência | Prever default |
| Aumentar vendas | Prever compra |

---

### 2.2 Definição de target

Um target bem definido segue o padrão:

> Probabilidade de que `[unidade]` realizará `[ação]` em `[período]`

**Exemplo:**

- Qual é a probabilidade de um `cliente do segmento X`  
  `cancelar` a assinatura em até `60 dias`?

---

### 2.3 Armadilhas comuns

!!! warning "Riscos na definição de target"

    - Data leakage  
    - Proxy incorreto  
    - Target mal definido  
    - Viés nos dados  

---

## 3. Metas de Negócio vs Métricas Analíticas

### 3.1 Conceito

> Metas de negócio definem o objetivo.  
> Métricas analíticas definem como otimizar esse objetivo.

---

### 3.2 Exemplos

| Objetivo de Negócio | Métrica Analítica |
|-------------------|------------------|
| Reduzir fraude | Alta precision |
| Detectar doença | Alto recall |
| Aumentar vendas | Lift |

---

## 4. Métricas de Classificação

Antes de definir métricas, é necessário compreender a **matriz de confusão**:

- **TP (True Positive)**: previu positivo e era positivo  
- **FP (False Positive)**: previu positivo, mas era negativo  
- **FN (False Negative)**: previu negativo, mas era positivo  
- **TN (True Negative)**: previu negativo e era negativo  

---

### 4.1 Precision

$$
Precision = \frac{TP}{TP + FP}
$$

**Interpretação:**  
Entre tudo que o modelo previu como positivo, quanto está correto.

**Leitura prática:**

- Alta precision → poucos falsos positivos  
- Baixa precision → muitos falsos positivos  

**Quando utilizar:**

- Quando **FP é custoso**
  - Fraude  
  - Crédito  

---

### 4.2 Recall

$$
Recall = \frac{TP}{TP + FN}
$$

**Interpretação:**  
Entre todos os positivos reais, quantos foram identificados.

**Leitura prática:**

- Alto recall → poucos falsos negativos  
- Baixo recall → muitos casos perdidos  

**Quando utilizar:**

- Quando **FN é crítico**
  - Diagnóstico médico  
  - Churn estratégico  

---

### 4.3 F1-Score

$$
F1 = 2 \cdot \frac{Precision \cdot Recall}{Precision + Recall}
$$

**Interpretação:**  
Média harmônica entre precision e recall.

**Uso:**

- Dados desbalanceados  
- Necessidade de equilíbrio entre FP e FN  

---

### 4.4 AUC-ROC

$$
AUC = \int_0^1 TPR(FPR)\, d(FPR)
$$

Onde:

$$
TPR = \frac{TP}{TP + FN}
\quad ; \quad
FPR = \frac{FP}{FP + TN}
$$

**Interpretação:**  
Probabilidade de o modelo ranquear um positivo acima de um negativo.

---

### Escala de interpretação

| Valor | Qualidade |
|------|----------|
| 0.5 | Aleatório |
| 0.7–0.8 | Aceitável |
| 0.8–0.9 | Bom |
| > 0.9 | Excelente |

!!! warning "Limitações"

    - Não considera custo de erro  
    - Pode ser enganosa em dados desbalanceados  

---

## 5. Métricas de Regressão

### 5.1 MAE

$$
MAE = \frac{1}{n} \sum_{i=1}^{n} |y_i - \hat{y}_i|
$$

- Fácil interpretação  
- Mesmo peso para todos os erros  

---

### 5.2 RMSE

$$
RMSE = \sqrt{\frac{1}{n} \sum_{i=1}^{n} (y_i - \hat{y}_i)^2}
$$

- Penaliza erros grandes  
- Sensível a outliers  

---

### 5.3 MAPE

$$
MAPE = \frac{100}{n} \sum_{i=1}^{n} \left| \frac{y_i - \hat{y}_i}{y_i} \right|
$$

- Interpretação percentual  
- Problema quando \( y_i \approx 0 \)  

---

## 6. Métricas de Negócio

### 6.1 ROI

$$
ROI = \frac{Ganho - Custo}{Custo}
$$

- Avalia retorno financeiro  

---

### 6.2 Expected Value (EV)

$$
EV = \sum (Probabilidade \times Valor)
$$

- Integra modelo com impacto financeiro  

---

### 6.3 Custo do erro

| Tipo | Impacto |
|------|--------|
| FP | Custo operacional |
| FN | Perda direta |

---

## 7. Escolha de Métricas

| Cenário | Métrica Recomendada |
|--------|-------------------|
| Evitar FP | Precision |
| Evitar FN | Recall |
| Equilíbrio | F1 |
| Comparação de modelos | AUC |
| Erro médio | MAE |
| Penalizar erros grandes | RMSE |
| Erro percentual | MAPE |
| Decisão de negócio | ROI / EV |

---

## 8. Transformação de Problema em Solução

### 8.1 Tipos de análise

- **Descritiva**: o que aconteceu  
- **Preditiva**: o que vai acontecer  
- **Prescritiva**: o que fazer  

---

### 8.2 Pipeline analítico

``` mermaid
graph LR
A[Entendimento do negócio] --> B[Hipóteses]
B --> C[Dados]
C --> D[EDA]
D --> E[Definição de target]
E --> F[Modelagem]
F --> G[Avaliação]
G --> H[Produção]
```

!!! tip "Visão estratégica"
    Dados só geram valor quando se transformam em decisão.