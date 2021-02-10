const express = require('express');     // Создаем объект express
const cors = require('cors');   // Создаем объект cors (для работы с БД)
const { Sequelize, Model, DataTypes } = require('sequelize');   // Создаем объект sequelize (позволяет работать с данными как с обычными объектами)

const sequelize = new Sequelize('sqlite:./albums.db', {
    logging: false,
    dialect: "sqlite",
    define: {
        timestamps: false,
    },
});

class User extends Model {} // Определение модели
User.init({
    author: DataTypes.STRING,
    name: DataTypes.STRING,
    spotify_page: DataTypes.STRING,
    avatar: DataTypes.STRING,
}, { sequelize, modelName: 'Albums' });

const app = express();
app.use(express.json());
app.use(cors());
const port = 3000;

(async() => {
    await sequelize.sync({ alter: true }); // синхронизация структуры базы данных с определением моделей. Например, если для какой-то модели отстуствует соответствующая таблица в БД, то эта таблица создается.

    app.get('/albums', async(req, res) => {
        const all = await User.findAll();
        res.send(JSON.stringify(all))
    });

    /*app.post('/users', async(req, res) => {
        if (true) {
            await User.create({
                number: req.body.number,
                first_name: req.body.first_name,
                last_name: req.body.last_name,
                avatar: req.body.avatar,
                wikipedia_url: req.body.wikipedia_url
            });
        }
        res.status(201).send('{"code":201}');
    });

    app.get('/users/:id', async(req, res) => {
        if (req.params.id < 1) {
            return res.status(400).send({ msg: "Negative index" })
        }
        user = await User.findByPk(req.params.id)
        if (user === null) {
            return res.status(404).send({ msg: "Not found" })
        }
        return res.status(200).send(user).header()
    });

    app.delete('/users/:id', async(req, res) => {
        if (req.params.id < 1) {
            return res.status(400).send({ msg: "Negative index" })
        }
        user = await User.findByPk(req.params.id)
        if (user === null) {
            return res.status(404).send({ msg: "Not found" })
        }
        await user.destroy()
        res.status(200).send({ msg: "User was deleted" })
    });

    app.put('/users/:id', async(req,res) => {
        user = await User.findByPk(req.params.id)
        if (user === null) {
            return res.status(404).send({ msg: "Not found" })
        }
        var body = req.body
        if(body.number == '' || body.first_name == '' || body.last_name == '' || body.avatar == '' || body.wikipedia_url == '') {
            return res.status(400).send({ msg: "Incorrect request" })
        }
        if(body.number!= "") user.number = body.number
        if(body.first_name!= "") user.first_name = body.first_name
        if(body.last_name!= "") user.last_name = body.last_name
        if(body.avatar!= "") user.avatar = body.avatar
        if(body.wikipedia_url!= "") user.wikipedia_url = body.wikipedia_url
        await user.save()
        res.status(200).send({ msg: "User was updated" })
    })*/
    
})();

app.listen(port, () => {
    console.log(`Сервер был запущен: http://localhost:${port}\n`);
})
