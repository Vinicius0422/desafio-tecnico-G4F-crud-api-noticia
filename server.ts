import { listarNoticias, criarNoticia, editarNoticia,
   buscarNoticiaPorId, deletarNoticia, listarNoticiasPagindadas } from './src/noticia/controller/noticiaController';

const express = require('express');
const app = express();
import cors from 'cors';

app.use(express.json());
app.use(cors());

app.get('/noticias/lista', listarNoticias);
app.get('/noticias/paginadas', listarNoticiasPagindadas);
app.get('/noticias/:id', buscarNoticiaPorId);

app.post('/noticias', criarNoticia);
app.put('/noticias/:id', editarNoticia);

app.delete('/noticias/:id', deletarNoticia);

app.listen(5000, () => {
});

export { app };