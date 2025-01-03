# Sistema de Atualização do Data Warehouse

Sistema ETL automatizado para sincronização de dados entre banco de dados operacional e data warehouse.

## Funcionalidades

- 🔄 Processo ETL automatizado diário
- 📊 Suporte completo a modelo dimensional
- 🔐 Conexões seguras com banco de dados
- 📝 Logs abrangentes
- ⚡ Pool de conexões
- 🛡️ Tratamento e recuperação de erros
- 🕒 Agendamento com suporte a fuso horário

## Pré-requisitos

- Node.js 14+
- PostgreSQL 12+
- PM2 (para produção)

## Início Rápido

1. **Instalar dependências**

```bash
npm install
```

2. **Configurar ambiente**
   Copie `.env.example` para `.env` e configure suas credenciais de banco de dados:

```env
# Banco de Dados de Origem
SOURCE_DB_HOST=source_host
SOURCE_DB_PORT=5432
SOURCE_DB_NAME=source_database
SOURCE_DB_USER=source_username
SOURCE_DB_PASSWORD=source_password

# Data Warehouse
DB_HOST=localhost
DB_PORT=5432
DB_NAME=destination_dw
DB_USER=your_username
DB_PASSWORD=your_password
```

3. **Iniciar servidor de desenvolvimento**

```bash
npm run dev
```

4. **Iniciar servidor de produção**

```bash
npm start
```

## Estrutura do Projeto

```
├── src/
│   ├── config/           # Arquivos de configuração
│   │   ├── database.js   # Conexões com banco de dados
│   │   └── cron.js      # Configurações do agendador
│   ├── services/         # Lógica de negócio
│   │   ├── etl.js       # Operações ETL
│   │   ├── dimensions.js # Atualizações de dimensões
│   │   └── facts.js     # Atualizações de fatos
│   └── utils/           # Funções utilitárias
│       ├── logger.js    # Sistema de logs
│       └── validation.js # Validação de dados
├── scripts/             # Scripts de banco de dados
├── logs/               # Logs da aplicação
└── tests/              # Arquivos de teste
```

## Scripts

- `npm start` - Inicia servidor de produção
- `npm run dev` - Inicia servidor de desenvolvimento com recarga automática
- `npm test` - Executa testes
- `npm run lint` - Verifica estilo do código

## Monitoramento

### Arquivos de Log

- `logs/error.log` - Mensagens de erro
- `logs/combined.log` - Todos os logs do sistema

### Métricas

- Tempo de conclusão do ETL
- Registros processados
- Taxa de erros
- Status das conexões com banco de dados

## Manutenção

### Tarefas Diárias

- Verificar logs de erro
- Confirmar conclusão do ETL
- Monitorar recursos do sistema

### Tarefas Semanais

- Revisar métricas de desempenho
- Limpar logs antigos
- Validar consistência dos dados

## Solução de Problemas

### Problemas Comuns

1. **Erros de Conexão**

   - Verificar credenciais do banco de dados
   - Verificar conectividade de rede
   - Garantir que os servidores de banco de dados estejam rodando

2. **Falhas no ETL**
   - Verificar logs de erro
   - Verificar integridade dos dados de origem
   - Validar regras de transformação

## Suporte

Para problemas e dúvidas:

1. Verificar os logs
2. Revisar mensagens de erro
3. Contatar administrador do sistema
