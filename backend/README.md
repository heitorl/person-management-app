# PERSON MANAGMENT APP

Este documento descreve o backend desenvolvido em Strapi para gerenciar os dados da aplicação. Inclui instruções sobre como configurar, utilizar os endpoints

## Configuração do Projeto

### Instale as dependências
npm install

### Configure as variáveis de ambiente em um arquivo .env, incluindo as credenciais do banco de dados

DATABASE_HOST=localhost
DATABASE_PORT=5432
DATABASE_NAME=nome_do_banco
DATABASE_USERNAME=usuario
DATABASE_PASSWORD=senha


### Inicie o servidor de desenvolvimento:
npm run develop

---

## Endpoints da API


## Listagem dos estados

## GET /api/estados-selecao - Rota responsável pela Busca de Estados

#### Corpo da resposta - STATUS CODE 200 

```json
[
	{
		"nome": "Acre",
		"sigla": "AC"
	},
	{
		"nome": "Alagoas",
		"sigla": "AL"
	},
	...
}
```
## Listagem dos estados

## GET /api/cidades - Rota responsável pela Busca de cidades
Header - estado: rj



#### Corpo da resposta - STATUS CODE 200 
```json
[
	"ANGRA DOS REIS",
	"APERIBE",
	"ARARUAMA",
	"AREAL",
    .
    .
    .
]
```

---

# PROBLEMAS QUE TIVE QUE LIDAR

### Ao adcionar o auth=false na routes como diz a documentação para tornar a rota publica
export default  factories.createCoreRouter('api::restaurant.restaurant', {
  config: {
    create: {
      auth: false
    }
  }
});


#### POST /api/cidades

#### Corpo da requisição:

```json
{
	"data": {
		"nome": "rio de janeiro",
		"estado": 1		
	}
}
```

#### Corpo da resposta - STATUS CODE 400 

```json
{
	"data": null,
	"error": {
		"status": 400,
		"name": "ValidationError",
		"message": "Invalid key estado",
		"details": {
			"key": "estado",
			"path": "estado",
			"source": "body"
		}
	}
}
```

### No entanto seguindo por liberar a rota pelo painel da interface web tudo da certo

#### POST /api/cidades

#### Corpo da requisição:

```json
{
	"data": {
		"nome": "rio de janeiro",
		"estado": 1		
	}
}
```
#### Corpo da resposta - STATUS CODE 201 - CREATED:

```json
{
	"data": {
		"id": 2,
		"documentId": "xid1xtdvpdoftpeor8yo5mj3",
		"nome": "rio de janeiro",
		"createdAt": "2024-10-28T19:45:08.207Z",
		"updatedAt": "2024-10-28T19:45:08.207Z",
		"publishedAt": "2024-10-28T19:45:08.198Z"
	},
	"meta": {}
}
```

