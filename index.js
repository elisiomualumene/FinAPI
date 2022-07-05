//MODULO 1
// Iniciando o Primeiro Projeto com NodeJS

//import express from "express"
const express = require("express")
//import {v4 as uuidv4} from "uuid"
const  {v4: uuidv4} = require("uuid")


const app = express()
const port = 3030

app.use(express.json())

const customers = []
/*
    * cpf - string
    * name - string
    * id - uuid universal unic indentify //IDENTIFICADO UNICO UNIVERSAL 
    * {instalar biblionteca uuid}
    * statement array []
*/

function VerifyIfExistAccount(request, response, next){
    const { cpf } = request.headers
    //tambem pode receber  o cpf nos header com const { cpf } = request.headers

    const customer = customers.find(customers => customers.cpf === cpf);

    if(!customer){
        return response.status(400).json({error: "Customer not found"});
    }

    request.customer = customer;

    return next()
}
// acc - acomulator, operation - objecto onde tem o valor a ser reduzido
function getBalance(statement){
    const Balance = statement.reduce((acc, operation) => {
        if(operation.type === "credit"){
            return acc + operation.amount
        } else{
            return acc - operation.amount
        }
    }, 0);

    return Balance
}

app.post("/account", (request, response) => { 
    const {name, cpf} = request.body;

    const exist = customers.some((customers) => customers.cpf === cpf)

    if(exist){
        return response.status(400).json({error: "customers already exists!"});
    }

    //const id = uuidv4();

    customers.push({
        name,
        cpf,
        id: uuidv4(),
        statement: []
    })

    return response.status(201).json({message: "sucess, user created!"});
})

// app.use(VerifyIfExistAccount)

app.get("/statement/",VerifyIfExistAccount, (request, response) => {
    const {customer} = request;

    return response.json(customer.statement)
})


app.post("/deposit", VerifyIfExistAccount, (request, response) => {
    const { description, amount } = request.body;
    const { customer } = request;

    const statementOperation = {
        description,
        amount,
        create_at:new Date(),
        type: "credit"
    }

    customer.statement.push(statementOperation)

    return response.status(201).send()
})


app.post("/withdraw", VerifyIfExistAccount, (request, response) => {
    const { amount } = request.body
    const { customer } = request;

    const balance = getBalance(customer.statement);

    if(balance < amount){
        return response.status(400).json({ error: "Insufficient funds!"})
    }

    const statementOperation = {
        amount,
        create_at: new Date(),
        type: "debit"
    };

    customer.statement.push(statementOperation);

    return response.status(201).send()
})

app.get("/statement/date",VerifyIfExistAccount, (request, response) => {
   const { customer } = request;
   const { date } = request.query;

   const DateFormat = newDate(date + " 00:00")

    //formato da data 2022-06-29
   const statement = customer.statement.filter((statement) => statement.create_at.toDateString() === new Date(DateFormat).toDateString())

   return response.json(statement)
})

app.put("/account", (request, response) => {
    const {name} = request.body;
    const { customer } = request;

    customer.name = name;

    return response.status(201).send();
})

app.get("/account", VerifyIfExistAccount, (request, response) => {
    const { customer} = request;

    return response.status(201).json(customer)
})

app.delete("/account", VerifyIfExistAccount, (request, response) => {
    const { customer } = request

    customers.splice(customer, 1)

    return response.status(200).json(customers)
})

app.get("/balance", VerifyIfExistAccount, (request, response) => {
    const { customer } = request;

    const Balance = getBalance(customer.statement)

    return response.status(201).json(Balance)
})


app.listen(port, () => {
    console.log(`Server is Running on Port ${port}`)
})