const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const TodoModel = require('./models/Todo');



const app = express();
app.use(cors())
app.use(express.json())

mongoose.connect(process.env.MONGO_URI);

app.post('/add',(req,res)=>{
    const task = req.body.task;
    TodoModel.create({
        task: task
    }).then(result => res.json(result))
    .catch(err => res.json(err))
})

app.get('/get', (req, res) => {
  TodoModel.find()
    .then(result => res.json(result)) // always array
    .catch(err => {
      console.error(err);
      res.status(500).json([]); // return empty array on error
    });
});


app.put('/update/:id' , (req, res)=>{
    const {id} = req.params;
    TodoModel.findByIdAndUpdate(id, { done: true })
    .then(result => res.json(result))
    .catch(err => res.json(err))
})

app.delete('/delete/:id', (req,res)=> {
    const {id} = req.params;
    TodoModel.findByIdAndDelete({_id: id})
    .then(result => res.json(result))
    .catch(err => res.json(err))

})

app.listen(process.env.PORT || 3000);
