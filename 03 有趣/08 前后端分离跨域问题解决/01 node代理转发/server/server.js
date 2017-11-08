const Koa = require('koa');
const app = new Koa();

const main = ctx => {
    ctx.response.type = 'json';
    ctx.response.body = { data: 'hello world' };
};

app.use(main);
app.listen(3000);
console.log('server run on 127.0.0.1:3000 !');