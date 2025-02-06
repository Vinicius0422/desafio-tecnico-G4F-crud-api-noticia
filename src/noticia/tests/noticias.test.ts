import request from 'supertest';
import { app } from '../../../server';

describe('POST /noticias', () => {

  // Cenário 1: Criando uma notícia com dados válidos
  it('Dado que o usuário forneça dados válidos, quando a solicitação é feita, então uma nova notícia é criada', async () => {
    const dadosNoticia = {
      titulo: 'Nova Notícia',
      descricao: 'Descrição da nova notícia',
    };

    const resposta = await request(app)
      .post('/noticias')
      .send(dadosNoticia)
      .set('Accept', 'application/json');
    
    // Então o status da resposta deve ser 201 (Criado)
    expect(resposta.status).toBe(201);
    
    // E a resposta deve conter os dados corretos
    expect(resposta.body).toHaveProperty('id');
    expect(resposta.body.titulo).toBe(dadosNoticia.titulo);
    expect(resposta.body.descricao).toBe(dadosNoticia.descricao);
  });

  // Cenário 2: Criando uma notícia com dados faltantes
  it('Dado que o usuário não forneça todos os campos obrigatórios, quando a solicitação é feita, então a resposta deve ser um erro 400', async () => {
    const dadosNoticia = {
      titulo: '', // Título vazio
      descricao: '', // Descrição vazia
    };

    const resposta = await request(app)
      .post('/noticias')
      .send(dadosNoticia)
      .set('Accept', 'application/json');
    
    // Então o status da resposta deve ser 400 (Solicitação Inválida)
    expect(resposta.status).toBe(400);
    
    // E a resposta deve conter um erro específico
    expect(resposta.body).toHaveProperty('erro');
    expect(resposta.body.erro).toBe('Título e descrição são obrigatórios');
  });

  // Cenário 3: Criando uma notícia com dados inválidos
  it('Dado que o usuário forneça dados inválidos, quando a solicitação é feita, então a resposta deve ser um erro 400', async () => {
    const dadosNoticia = {
      titulo: 'Notícia sem descrição',
      descricao: 1, // Descrição com tipo inválido
    };

    const resposta = await request(app)
      .post('/noticias')
      .send(dadosNoticia)
      .set('Accept', 'application/json');
    
    // Então o status da resposta deve ser 400 (Solicitação Inválida)
    expect(resposta.status).toBe(400);
    
    // E a resposta deve conter um erro específico
    expect(resposta.body).toHaveProperty('erro');
    expect(resposta.body.erro).toBe('Título e conteúdo devem ser strings');
  });
});
