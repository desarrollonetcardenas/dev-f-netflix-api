const { graphql } = require('graphql');
const { schema } = require('../index');
const setupTest = require('./helpers');

const mutationRegister = `
    mutation Register( $first_name:String!, $last_name:String!, $email:String!, $password:String!, $birth_date: String!){
        signup(data:{ first_name:$first_name,
                        last_name:$last_name,
                        email:$email,
                        password:$password,
                        birth_date:$birth_date
                    }){
                        token
                    }
        }`;

describe("Register user works correctly", () => {
    beforeEach( async() => await setupTest());

    it("Should create user correctly", async() => {
        const first_name = "Prueba";
        const last_name = "Prueba";
        const email = "prueba3@email.com";
        const password = "miprueba";
        const birth_date = "1900-01-01";

        const res = await graphql( schema, mutationRegister, null, {}, { first_name, last_name, email, password, birth_date });
        expect(res).toMatchSnapshot();
        expect(res).toHaveProperty("data");
    });

});
