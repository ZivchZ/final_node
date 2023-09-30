const sequelize = require('../utils/connection');
const request = require('supertest')
const app = require('../app')
const User = require('../models/User')

const main = async() => {
    try{
        // Acciones a ejecutar antes de los tests
        sequelize.sync();
        
        const user = await User.findOne({where: {email: "kalev@gmail.com"}})
        if(!user) {

            const userTest = {
                firstName: "Kalev",
                lastName: "Notos",
                email: "kalev@gmail.com",
                password: "12345678",
                phone: "3445567878"
            }
            await request(app).post('/users').send(userTest)
        }

        process.exit();
    } catch(error){
        console.log(error);
    }
}

main();