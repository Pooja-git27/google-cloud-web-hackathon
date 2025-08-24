const express = require('express');
const cors = require('cors');
const admin = require('firebase-admin');

const app = express();
app.use(cors());
app.use(express.json());

admin.initializeApp({
  credential: admin.credential.applicationDefault(),
  databaseURL: "https://<your-project-id>.firebaseio.com"
});

const db = admin.firestore();

app.get('/tasks', async (req, res) => {
    const snapshot = await db.collection('tasks').get();
    const tasks = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    res.json(tasks);
});

app.post('/tasks', async (req, res) => {
    const task = req.body;
    const docRef = await db.collection('tasks').add(task);
    res.json({ id: docRef.id });
});

app.listen(5000, () => console.log('Server running on port 5000'));
