const stores = [
    "マクドナルド",
    "モス",
    "バーガーキング",
    "ゼッテリア",
    "フレッシュネス"
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
        price:[240,260,290,250,420],
        calorie:[260,280,330,300,390],
        carb:[30,32,35,31,38],
        salt:[1.4,1.5,1.8,1.6,2.0],
        allergen:[5,5,6,5,7]
    },

    cheese:{
        price:[270,320,340,310,480],
        calorie:[310,350,380,330,420],
        carb:[31,35,37,33,40],
        salt:[1.8,2.0,2.2,1.9,2.4],
        allergen:[6,6,7,6,8]
    },

    teriyaki:{
        price:[400,430,450,420,550],
        calorie:[480,450,520,470,590],
        carb:[45,43,48,44,52],
        salt:[2.2,2.4,2.6,2.3,2.8],
        allergen:[7,7,8,7,9]
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
            <td>${selected.price[i]}</td>
            <td>${selected.calorie[i]}</td>
            <td>${selected.carb[i]}</td>
            <td>${selected.salt[i]}</td>
            <td>${selected.allergen[i]}</td>
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