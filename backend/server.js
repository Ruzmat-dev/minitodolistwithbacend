const express = require("express");
const app = express();
const cors = require("cors")
const port = 3000; 
app.use(cors({origin:"*"}))

app.use(express.json());
app.use(express.urlencoded({ extended: false }))

let users = [
 
];


 
app.post("/api/data", (req, res) => {
  const { name, date  } = req.body;
  const new_user = {
    id: users.length + 1,
    name,
    date
  }

  try {
    users.push(new_user)
    res.json({ data: new_user });
  } catch (error) {
    console.log(error)
  }

});

app.delete('/api/data/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const new_users = users.filter((item) => item.id !== id);
  users = new_users

  res.json({
    message: "Success"
  })
});

app.get("/api/data", (req, res) => {
  res.json(users);
});

app.listen(port, () => {
  console.log(`Server is listening on port ${port}`);
});


app.get('/api/data/clearData', (req, res) => {
  try {
    users = []
    if (users.length === 0) return res.json()
  } catch (error) {
    console.log(error)
  } 

});