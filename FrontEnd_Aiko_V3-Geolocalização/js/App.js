
//iniciando o projeto
const myMap = L.map('map').setView([-43.940933, -19.912998], 10);

const titleUrl = 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'; 

const  attribution =  '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors';

const tileLayer = L.tileLayer(titleUrl, {attribution});
tileLayer.addTo(myMap);

// icon
var  myIcon = L.icon({
    iconUrl: './img/aiko.png',
    iconSize: [30, 40],
    
});

//funcao chamando o popup

function generateList(){
    const ul = document.querySelector('.list');

    storeList.forEach((shop)=> {
        const li = document.createElement('li');
        const div = document.createElement('div');
        const a = document.createElement('a');
        const p = document.createElement('p');
       
        a.addEventListener('mouseover',()=>{//envento de mouse
            flyToStore(shop);
            
        });
       
        div.classList.add('shop-item');//pergando items do JSON
        a.innerText = shop.properties.name1;
        a.href ='#';
        p.innerText = shop.properties.name;
        p.innerText = shop.properties.date;
        p.innerText = shop.properties.lat;
        p.innerText = shop.properties.lon;
        p.innerText = shop.properties.id;
        p.innerText = shop.properties.status;
        p.innerText = shop.properties.color;
        p.innerText = shop.properties.equipmentStateId;
        p.innerText = shop.properties.info;

        div.appendChild(a);
        div.appendChild(p);
        li.appendChild(div);
        ul.appendChild(li);


    });
}

generateList();

function makePopupContent(shop){//exibindo o conteudo no popup
    return `
        <div>
            <h4>${shop.properties.name1}</h4>
            <p>Nome-${shop.properties.name}</p>
            <p>Data-${shop.properties.date}</p>
            <p>Latitude${shop.properties.lat}</p>
            <p>Longitude${shop.properties.lon}</p>
            <p>ID-${shop.properties.id}</p>
            <p>Status-${shop.properties.status}</p>
            <p>cor-${shop.properties.color}</p>
            <p>Estado do Equipamento-${shop.properties.equipmentStateId}</p>

        </div>`
    ;
    
}

function onEachFeature(feature, layer){
    layer.bindPopup(makePopupContent(feature), L.popup({closeButton: true, offset: L.point(0, -8)}));
}

const shopsLayer = L.geoJSON(storeList,{
    onEachFeature: onEachFeature,
    pointToLayer: function(feature,coordinates){
        return L.marker(coordinates, {icon: myIcon});

    }
});

shopsLayer.addTo(myMap);

function flyToStore(store){//função quando clicar vai ate o icone automaticamente
    const lat = store.geometry.coordinates[1];
    const lng = store.geometry.coordinates[0];

    myMap.flyTo([lat, lng], 14,{
        duration: 3
    });

    setTimeout(()=>{
        L.popup({closeButton: false, offset: L.point(0, -8)})
        .setLatLng([lat,lng])
        .setContent(makePopupContent(store))
        .openOn(myMap);
    },3000);
    
    }


