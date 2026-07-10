const stores = [
    "マクドナルド",
    "モスバーガー",
    "バーガーキング",
    "ゼッテリア",
    "フレッシュネスバーガー"
];

const labels = {
    price:"価格(円)",
    calorie:"カロリー(kcal)",
    carb:"炭水化物(g)",
    salt:"食塩相当量(g)",
    allergen:"アレルゲン数"
};

const data = {

    hamburger:{
        price:[190,240,null,280,560],
        calorie:[259,314,252,313,408],
        carb:[30,35,27,31,38],
        salt:[1.4,1.8,1.2,2.1,1.8],
        allergen:[8,12,8,8,9]
    },

    cheese:{
        price:[270,510,360,320,560],
        calorie:[310,425,291,364,390],
        carb:[31,40,27,32,36],
        salt:[1.9,2.8,1.6,2.6,2.4],
        allergen:[8,12,7,8,7]
    },

    teriyaki:{
        price:[450,470,380,440,520],
        calorie:[477,385,342,429,361],
        carb:[38,41,31,35,34],
        salt:[2.1,2.6,1.6,3.0,1.7],
        allergen:[11,12,10,6,7]
    },
fish:{
    price:[410,400,430,null,640],
    calorie:[338,381,374,null,447],
    carb:[37,37,38,null,38],
    salt:[1.6,1.9,2.1,null,1.6],
    allergen:[7,15,18,null,7]
},

chicken:{
    price:[190,390,380,440,560],
    calorie:[383,386,425,486,442],
    carb:[40,40,35,38,39],
    salt:[2.2,1.5,2.0,1.8,2.4],
    allergen:[9,15,18,15,6]
}
};

let currentBurger = "hamburger";
let currentMetric = "price";

function updateTable(){

    const selected = data[currentBurger];

    const tbody =
    document.querySelector("#dataTable tbody");

    tbody.innerHTML = "";

    for(let i=0;i<stores.length;i++){

        tbody.innerHTML += `
        <tr>
            <td>${stores[i]}</td>
            <td>${selected.price[i] === null ? "－" : selected.price[i]}</td>
            <td>${selected.calorie[i] === null ? "－" : selected.calorie[i]}</td>

<td>${selected.carb[i] === null ? "－" : selected.carb[i]}</td>

<td>${selected.salt[i] === null ? "－" : selected.salt[i]}</td>

<td>${selected.allergen[i] === null ? "－" : selected.allergen[i]}</td>
        </tr>
        `;
    }
}

const chart = new Chart(
   
    document.getElementById("chart"),
    {
        type:"bar",

        data:{
            labels:stores,

            datasets:[
                {
                    label:labels[currentMetric],
                    data:data[currentBurger][currentMetric]
                }
            ]
        },

        options:{
            responsive:true,
            indexAxis:"y"
        }
    }
);

function updateChart(){

    chart.data.datasets[0].label =
    labels[currentMetric];

    chart.data.datasets[0].data =
    data[currentBurger][currentMetric];

    chart.update();

    document.getElementById("chartTitle").textContent =
    labels[currentMetric] + " 比較";
}

updateTable();
updateChart();

document
.querySelectorAll(".burger-btn")
.forEach(button=>{

    button.addEventListener("click",()=>{

        currentBurger =
        button.dataset.burger;

        document
        .querySelectorAll(".burger-btn")
        .forEach(btn =>
            btn.classList.remove("active")
        );

        button.classList.add("active");

        updateTable();
    });

});

document
.querySelectorAll(".metric-btn")
.forEach(button=>{

    button.addEventListener("click",()=>{

        currentMetric =
        button.dataset.metric;

        document
        .querySelectorAll(".metric-btn")
        .forEach(btn =>
            btn.classList.remove("active")
        );

        button.classList.add("active");

        updateChart();
    });

});
