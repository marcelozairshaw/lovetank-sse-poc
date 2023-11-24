import cors from 'cors';
import router from './routes';
import express from 'express';

const PORT = process.env.PORT;
const app = express();

app.use(cors());
app.use(express.json());

app.use(router)

app.listen(PORT, () => {
  console.log(`Server running in port http://localhost:${PORT}`);
});

export default app;