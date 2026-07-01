# 06. Lógica

| data_marcacao | last_tool            | last_experiment_id   | last_num_vari | last_termino_jornada | termino_conversa | demanda                       | justificativa                                                                                                                                         |
| ------------- | -------------------- | -------------------- | ------------- | -------------------- | ---------------- | ----------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------- |
| 30/06/2026    | agente-investigativo | agente-investigativo | A             | NULL                 | termino_avi      | demanda_avi                   | Última interação foi na variação A; por isso o término e a demanda foram herdados da AVI_FULL.                                                        |
| 30/06/2026    | agente-investigativo | agente-investigativo | B             | NULL                 | abandono         | Demanda: agente-investigativo | Última interação foi no agente-investigativo, variação B; por regra, o término foi classificado como abandono e a demanda como agente-investigativo.  |
| 30/06/2026    | kb-global            | kb-global            | A             | NULL                 | termino_avi      | demanda_avi                   | Última interação foi na variação A; por isso o término e a demanda foram herdados da AVI_FULL.                                                        |
| 30/06/2026    | kb-global            | kb-global            | B             | NULL                 | resolutivo       | Demanda: kb-global            | Última interação foi no kb-global, variação B; por regra, o término foi classificado como resolutivo e a demanda como kb-global.                      |
| 30/06/2026    | dados-consig         | dados-consig         | A             | NULL                 | termino_avi      | demanda_avi                   | Última interação foi na variação A; por isso o término e a demanda foram herdados da AVI_FULL.                                                        |
| 30/06/2026    | dados-consig         | dados-consig         | B             | back_to_ia           | termino_avi      | demanda_avi                   | A jornada dados-consig terminou com back_to_ia; por isso o término e a demanda foram herdados da AVI_FULL.                                            |
| 30/06/2026    | dados-consig         | dados-consig         | B             | <> back_to_ia        | termino_jornada  | Demanda: dados-consig         | A jornada dados-consig terminou diferente de back_to_ia; por isso o término foi herdado da jornada e a demanda marcada como dados-consig.             |
| 30/06/2026    | dados-cartao         | dados-cartao         | A             | NULL                 | termino_avi      | demanda_avi                   | Última interação foi na variação A; por isso o término e a demanda foram herdados da AVI_FULL.                                                        |
| 30/06/2026    | dados-cartao         | dados-cartao         | B             | back_to_ia           | termino_avi      | demanda_avi                   | A jornada dados-cartao terminou com back_to_ia; por isso o término e a demanda foram herdados da AVI_FULL.                                            |
| 30/06/2026    | dados-cartao         | dados-cartao         | B             | <> back_to_ia        | termino_jornada  | Demanda: dados-cartao         | A jornada dados-cartao terminou diferente de back_to_ia; por isso o término foi herdado da jornada e a demanda marcada como dados-cartao.             |
| 30/06/2026    | segunda-via-fatura   | NULL                 | NULL          | back_to_ia           | termino_avi      | demanda_avi                   | A jornada segunda-via-fatura terminou com back_to_ia; por isso o término e a demanda foram herdados da AVI_FULL.                                      |
| 30/06/2026    | segunda-via-fatura   | NULL                 | NULL          | <> back_to_ia        | termino_jornada  | Demanda: segunda-via-fatura   | A jornada segunda-via-fatura terminou diferente de back_to_ia; por isso o término foi herdado da jornada e a demanda marcada como segunda-via-fatura. |
| 30/06/2026    | saldo-conta          | NULL                 | NULL          | back_to_ia           | termino_avi      | demanda_avi                   | A jornada saldo-conta terminou com back_to_ia; por isso o término e a demanda foram herdados da AVI_FULL.                                             |
| 30/06/2026    | saldo-conta          | NULL                 | NULL          | <> back_to_ia        | termino_jornada  | Demanda: saldo-conta          | A jornada saldo-conta terminou diferente de back_to_ia; por isso o término foi herdado da jornada e a demanda marcada como saldo-conta.               |
| 30/06/2026    | avi-model            | NULL                 | NULL          | NULL                 | termino_avi      | demanda_avi                   | Última interação foi na AVI_FULL; por isso o término e a demanda foram herdados da própria AVI_FULL.                                                  |
| 30/06/2026    | dummy-avi            | NULL                 | NULL          | NULL                 | termino_avi      | demanda_avi                   | Última interação foi na AVI_FULL; por isso o término e a demanda foram herdados da própria AVI_FULL.                                                  |
| 30/06/2026    | dummy-kb-global      | NULL                 | NULL          | NULL                 | termino_avi      | demanda_avi                   | Última interação foi na AVI_FULL; por isso o término e a demanda foram herdados da própria AVI_FULL.                                                  |
| 30/06/2026    | generic-avi          | NULL                 | NULL          | NULL                 | termino_avi      | demanda_avi                   | Última interação foi na AVI_FULL; por isso o término e a demanda foram herdados da própria AVI_FULL.                                                  |
| 30/06/2026    | NULL                 | NULL                 | NULL          | NULL                 | termino_avi      | demanda_avi                   | Não houve última tool identificada; por isso o término e a demanda foram herdados da AVI_FULL.                                                        |


```sql
SELECT
    t1.*,
    CASE
        WHEN last_tool IN ('avi-model', 'dummy-avi', 'dummy-kb-global', 'generic-avi')
            THEN termino_avi

        WHEN last_tool IS NULL
            AND last_experiment_id IS NULL
            THEN termino_avi

        WHEN (
                last_tool IN ('agente-investigativo', 'kb-global', 'dados-consig', 'dados-cartao')
                OR last_experiment_id IN ('agente-investigativo', 'kb-global', 'dados-consig', 'dados-cartao')
            )
            AND last_num_vari = 'A'
            THEN termino_avi

        WHEN (
                last_tool = 'agente-investigativo'
                OR last_experiment_id = 'agente-investigativo'
            )
            AND last_num_vari = 'B'
            THEN 'abandono'

        WHEN (
                last_tool = 'kb-global'
                OR last_experiment_id = 'kb-global'
            )
            AND last_num_vari = 'B'
            THEN 'resolutivo'

        WHEN (
                last_tool IN ('dados-consig', 'dados-cartao', 'segunda-via-fatura', 'saldo-conta')
                OR last_experiment_id IN ('dados-consig', 'dados-cartao', 'segunda-via-fatura', 'saldo-conta')
            )
            AND last_termino_jornada = 'back_to_ia'
            THEN termino_avi

        WHEN (
                last_tool IN ('dados-consig', 'dados-cartao', 'segunda-via-fatura', 'saldo-conta')
                OR last_experiment_id IN ('dados-consig', 'dados-cartao', 'segunda-via-fatura', 'saldo-conta')
            )
            AND last_termino_jornada <> 'back_to_ia'
            THEN last_termino_jornada

        ELSE 'Caso não mapeado: investigar'
    END AS termino_conversa,
    CASE
        WHEN last_tool IN ('avi-model', 'dummy-avi', 'dummy-kb-global', 'generic-avi')
            THEN demanda_avi

        WHEN last_tool IS NULL
            AND last_experiment_id IS NULL
            THEN demanda_avi

        WHEN (
                last_tool IN ('agente-investigativo', 'kb-global', 'dados-consig', 'dados-cartao')
                OR last_experiment_id IN ('agente-investigativo', 'kb-global', 'dados-consig', 'dados-cartao')
            )
            AND last_num_vari = 'A'
            THEN demanda_avi

        WHEN (
                last_tool = 'agente-investigativo'
                OR last_experiment_id = 'agente-investigativo'
            )
            AND last_num_vari = 'B'
            THEN 'Demanda: agente-investigativo'

        WHEN (
                last_tool = 'kb-global'
                OR last_experiment_id = 'kb-global'
            )
            AND last_num_vari = 'B'
            THEN 'Demanda: kb-global'

        WHEN (
                last_tool IN ('dados-consig', 'dados-cartao', 'segunda-via-fatura', 'saldo-conta')
                OR last_experiment_id IN ('dados-consig', 'dados-cartao', 'segunda-via-fatura', 'saldo-conta')
            )
            AND last_termino_jornada = 'back_to_ia'
            THEN demanda_avi

        WHEN (
                last_tool IN ('dados-consig', 'dados-cartao', 'segunda-via-fatura', 'saldo-conta')
                OR last_experiment_id IN ('dados-consig', 'dados-cartao', 'segunda-via-fatura', 'saldo-conta')
            )
            AND last_termino_jornada <> 'back_to_ia'
            THEN CONCAT('Demanda: ', COALESCE(last_experiment_id, last_tool))

        ELSE 'Caso não mapeado: investigar'
    END AS demanda,
    CASE
        WHEN (
                last_tool IN ('avi-model', 'dummy-avi', 'dummy-kb-global', 'generic-avi')
                OR last_experiment_id IN ('avi-model', 'dummy-avi', 'dummy-kb-global', 'generic-avi')
            )
            THEN 'Última interação foi na AVI_FULL; por isso o término e a demanda foram herdados da própria AVI_FULL.'

        WHEN last_tool IS NULL
            AND last_experiment_id IS NULL
            THEN 'Não houve última tool ou experimento identificado; por isso o término e a demanda foram herdados da AVI_FULL.'

        WHEN (
                last_tool IN ('agente-investigativo', 'kb-global', 'dados-consig', 'dados-cartao')
                OR last_experiment_id IN ('agente-investigativo', 'kb-global', 'dados-consig', 'dados-cartao')
            )
            AND last_num_vari = 'A'
            THEN 'Última interação foi na variação A; por isso o término e a demanda foram herdados da AVI_FULL.'

        WHEN (
                last_tool = 'agente-investigativo'
                OR last_experiment_id = 'agente-investigativo'
            )
            AND last_num_vari = 'B'
            THEN 'Última interação foi no agente-investigativo, variação B; por regra, o término foi classificado como abandono e a demanda como agente-investigativo.'

        WHEN (
                last_tool = 'kb-global'
                OR last_experiment_id = 'kb-global'
            )
            AND last_num_vari = 'B'
            THEN 'Última interação foi no kb-global, variação B; por regra, o término foi classificado como resolutivo e a demanda como kb-global.'

        WHEN (
                last_tool IN ('dados-consig', 'dados-cartao', 'segunda-via-fatura', 'saldo-conta')
                OR last_experiment_id IN ('dados-consig', 'dados-cartao', 'segunda-via-fatura', 'saldo-conta')
            )
            AND last_termino_jornada = 'back_to_ia'
            THEN CONCAT(
                'A jornada ',
                COALESCE(last_experiment_id, last_tool),
                ' terminou com back_to_ia; por isso o término e a demanda foram herdados da AVI_FULL.'
            )

        WHEN (
                last_tool IN ('dados-consig', 'dados-cartao', 'segunda-via-fatura', 'saldo-conta')
                OR last_experiment_id IN ('dados-consig', 'dados-cartao', 'segunda-via-fatura', 'saldo-conta')
            )
            AND last_termino_jornada <> 'back_to_ia'
            THEN CONCAT(
                'A jornada ',
                COALESCE(last_experiment_id, last_tool),
                ' terminou diferente de back_to_ia; por isso o término foi herdado da jornada e a demanda marcada como ',
                COALESCE(last_experiment_id, last_tool),
                '.'
            )

        ELSE 'Caso não mapeado: investigar'
    END AS justificativa
```