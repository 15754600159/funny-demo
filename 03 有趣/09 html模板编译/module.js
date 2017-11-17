
function htmlModule(template, data){
    function compile(template){
        const evelExpr = /<%=(.+?)%>/g,
            expr = /<%([\s\S]+?)%>/g;
    
        template = template
            .replace(evelExpr, '`); \n echo( $1 ); \n echo(`')
            .replace(expr, '`); \n $1 \n echo(`');
        
        template = 'echo(`' + template + '`);';
    
        let script = 
        `(function parse(data){
            var output = "";
    
            function echo(html){
                output += html;
            }
    
            ${ template }
    
            return output;
        })`;
    
        return script;
    
    };
    
    const parse = eval(compile(template)),
        htmlTemple = parse(data);
    // console.log(parse); //思路

    return htmlTemple;
}

// <% ... %> 放置JS代码
// <%= ... %> 放置JS表达式

var template = `
<ul>
    <% for(var i=0; i < data.supplies.length; i++) { %>
        <li><%= data.supplies[i] %></li>
    <% } %>
</ul>`;
var data = {
    supplies: ["broom", "mpo", "cleaner"],
}

var htmlTemple = htmlModule(template, data);

console.log(htmlTemple);

// <ul>
//     <li>broom</li>
//     <li>mpo</li>
//     <li>cleaner</li>
// </ul>