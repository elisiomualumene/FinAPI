## API FINANCIERA FinAPI


### REQUISITOS

- [x] Deve ser Possivel criar uma conta
- [x] Deve ser Possivel buscar o extrato bancario do cliente
- [x] Deve ser Possivel realizar um deposito
- [x] Deve ser Possivel realizar um saque
- [x] Deve ser Possivel buscar o extrato bancario do cliente por data
- [x] Deve ser Possivel  atualizar dados da conta do cliente
- [x] Deve ser Possivel obter dados da conta do cliente
- [x] Deve ser Possivel deletar uma conta
- [x] Deve retornar o Balance

 ### REGRA DE NEGOCIOS

- [x] Nao Deve ser Possivel cadastrar uma conta com CPF já existente
- [x] Nao Deve ser Possivel buscar extrato em uma conta não existente
- [x] Nao Deve ser Possivel fazer deposito em uma conta não existente
- [x] Nao Deve ser Possivel fazer saque em uma conta nao existente
- [x] Nao Deve ser Possivel fazer saque quando o saldo for insuficiente~
- [x] Nao Deve ser Possivel excluir uma conta nao existente