import express from 'express';
import userRoute from './routes/userRoute.js';
import skillRoute from './routes/skillRoute.js';
import projectRoute from './routes/projectRoute.js';

const PORT = 8080
const app = express();

app.use(express.json());

app.use('/api/user',userRoute);
app.use('/api/skill',skillRoute);
app.use('/api/project',projectRoute);

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));


