export default {
  "userflow чекаут"({cy}){
    this["шаг добавление товара"]({cy});
    cy.get("li:nth-of-type(2) > a").click();
    cy.get("[data-test='checkout']").click();
    this["шаг заполнение формы"]({cy});
    cy.get("#submit-payment").click();
  },
  "шаг добавление товара"({cy}){
    cy.get("[data-test='Espresso']").click();
    cy.get("[data-test='Espresso_Macchiato']").click();
    cy.get("[data-test='Cappuccino']").click();
    cy.get("button.yes").click();
    cy.get("[data-test='Mocha']").click();
    cy.get("[data-test='Flat_White']").click();
    cy.get("button.yes").click();
    cy.get("[data-test='Americano']").click();
  },
  "шаг заполнение формы"({cy}){
    cy.get("#name").type("П");
    cy.get("#name").type("Петр");
    cy.get("#email").type("petrilaptev@gamil.com");
    cy.get("#promotion").click();
  },
  "шаг заполнения доставки"({cy}){
    cy.get("[data-testid='date']").type("2023-11-11");
    cy.get("[data-testid='time']").select("10:00 - 14:00");
    cy.get("[data-testid='address']").type("aaa");
    cy.get("[data-testid='typePayCard']").click();
  },
  seo:{
      "Подсветка h1-h6 / strong / b / em"(){
        (function(){var style=document.getElementById('bstrongemhighlight');if(style){style.remove();}else{var bStngEm=document.createElement('style');bStngEm.setAttribute('type','text/css');bStngEm.setAttribute('id','bstrongemhighlight');bStngEm.innerHTML='strong:before {content: \u0022stng - \u0022 !important;} b:before {content: \u0022b - \u0022 !important;} em:before {content: \u0022em - \u0022 !important;} strong {background-color: #690 !important; border: solid !important; padding: 2px !important; color: black !important;} b {background-color: #77D7FF !important; border: solid !important; padding: 2px !important; color: black !important;} em {background-color: #b798f5 !important; border: solid !important; padding: 2px !important; color: black !important;} h1:before {content: \u0022H1 - \u0022 !important;} h2:before {content: \u0022H2 - \u0022 !important;} h3:before {content: \u0022H3 - \u0022 !important;} h4:before {content: \u0022H4 - \u0022 !important;} h5:before {content: \u0022H5 - \u0022 !important;} h6:before {content: \u0022H6 - \u0022 !important;} h1 {background-color: pink !important; border: solid !important; padding: 2px !important; color: black !important;} h2 {background-color: orange !important; border: solid !important; padding: 2px !important; color: black !important;} h3 {background-color: yellow !important; border: solid !important; padding: 2px !important; color: black !important;} h4 {background-color: aquamarine !important; border: solid !important; padding: 2px !important; color: black !important;} h5 {background-color: lightskyblue !important; border: solid !important; padding: 2px !important; color: black !important;} h6 {background-color: plum !important; border: solid !important; padding: 2px !important; color: black !important;}';document.getElementsByTagName('body')[0].appendChild(bStngEm);}})();void(0);
  },
  "Теги документа"(){
      (function(){var s=document.createElement('script');s.type='text/javascript';s.src='https://arsenkin.ru/bm/meta.js';s.setAttribute('charset','utf-8');document.getElementsByTagName('body')[0].appendChild(s)})();void(0);
  },
  "Gremlins.js Bookmarklet"(){
    (function() {    function callback() {        gremlins.createHorde({            species: [gremlins.species.clicker(),gremlins.species.toucher(),gremlins.species.formFiller(),gremlins.species.scroller(),gremlins.species.typer()],            mogwais: [gremlins.mogwais.alert(),gremlins.mogwais.fps(),gremlins.mogwais.gizmo()],            strategies: [gremlins.strategies.distribution()]        }).unleash();    }    var s = document.createElement("script");    s.src = "https://unpkg.com/gremlins.js";    if (s.addEventListener) {        s.addEventListener("load", callback, false);    } else if (s.readyState) {        s.onreadystatechange = callback;    }    document.body.appendChild(s);    })()
  },
  "корзина в рублях"(){
    fetch('https://openexchangerates.org/api/latest.json?app_id=970030463657472880e8bab3f3ac8e38')   
    .then(response => response.json()).then(data => {     
        console.log(data);
        var rates = data.rates;   

        console.table([...document.querySelectorAll(".list > div > ul > .list-item")].reduce((table, li)=>{
            const divs = li.querySelectorAll("div");
            const title = divs[0].textContent;
            const cost = parseFloat(divs[3].textContent.replace("$",""));
            table[title] = {
                "доллары": cost,
                "рубли": Math.round(cost * rates['RUB'])
            };

            return table;
        }, {}));
    });  
  }
  },
}