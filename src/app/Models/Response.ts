export class resp{
    message: string
    status: string
    email: string
    constructor(values: Object = {}) {

        Object.assign(this, values);
        
        }
}


//TODO complete the login process
export class loginResp{
    token: string
    message: string
    status: string
    email: string
    userid: string
    telephone: string

    constructor(values: Object = {}) {

        Object.assign(this, values);
        
        }
}