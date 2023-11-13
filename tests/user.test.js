const request = require('supertest')
const app = require('../src/app')
const User =require("../src/models/user")
const {userOne,userOneId,setupDatabase}=require('./fixtures/db')

    beforeEach(setupDatabase)
    describe('POST /user/add',()=>{
        test('should singUp a new user',async()=>{
            const res=await request(app).post('/user/add').send({
                name: "manu",
                password:"123245567",
                email:"manuel@gmail.com",
                age:33
            
            }).expect(201)
        })
    })
    describe('POST /users/login',()=>{
        test('should login existing user',async()=>{
            const res =await request(app).post('/users/login').send({
                password:userOne.password,
                email:userOne.email
            }).expect(200)
            const user = await User.findById(res.body.user._id);
            expect(res.body.token).toBe(user.tokens[1].token)
        })
        test('shouldnt login user',async()=>{
            await request(app).post('/users/login').send({
                password:"a",
                email:"a"
            }).expect(400)
        })
    })
    describe('GET /users/me',()=>{
        test('should get profile for user',async()=>{
            await request(app).get('/users/me')
            .set('Authorization',`Bearer ${userOne.tokens[0].token}`)
            .send()
            .expect(200)
        })
        test('shouldnt get profile for user',async()=>{
            await request(app).get('/users/me')
            .send()
            .expect(401)
        })
    })
  

    describe('POST /users/me/avatar',()=>{
        test("Should upload avatar image",async()=>{
            await request(app)
            .post("/users/me/avatar")
            .set("Authorization",`Bearer ${userOne.tokens[0].token}`)
            .attach('avatar','tests/fixtures/bowie.jpg')
            .expect(200)
            const user=await User.findById(userOneId)
            expect(user.avatar).toEqual(expect.any(Buffer))
        })
    })
    describe('UPDATE /user/me',()=>{
        test("Should update the name",async()=>{
            await request(app).patch("/user/me")
            .set("Authorization",`Bearer ${userOne.tokens[0].token}`)
            .send({
                name:"Javier"
            })
            .expect(200)
            const user =await User.findById(userOneId)
            expect(user.name).toBe("Javier")
            
        })
        test("Shouldnt update invalid data",async()=>{
            await request(app).patch("/user/me")
            .set("Authorization",`Bearer ${userOne.tokens[0].token}`)
            .send({
                location:"San cristobal"
            })
            .expect(400)
        })
    })

    