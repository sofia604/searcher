let url_json = "https://raw.githubusercontent.com/Bootcamp-Espol/Datos/main/products.json";
let url_xml = "https://raw.githubusercontent.com/Bootcamp-Espol/Datos/main/products.xml";
function load_mensaje(src,price,nombre,type){
    let mensaje = `<div class="col-xl-3 col-md-6 mb-xl-0 mb-4 mt-4"><div class="card card-blog card-plain">
                        <div class="card-header p-0 mt-n4 mx-3">
                            <a class="d-block shadow-xl border-radius-xl">
                            <img src="${src}" alt="${nombre}" class="img-fluid shadow border-radius-xl">
                            </a>
                        </div>
                        <div class="card-body p-3">
                            <p class="mb-0 text-sm">${type}</p>
                            <a href="javascript:;">
                            <h5>
                                ${nombre}
                            </h5>
                            </a>
                            <p class="mb-4 text-sm">
                            <b>Price: </b> $ ${price}
                            </p>
                        </div>
                        </div>
                    </div>`
    return mensaje
}

let loadProducts_json = async ( jsonURL ) => {
    try {
      let response_json = await fetch( jsonURL ); 
      let result_json = await response_json.json();
      data_json(result_json);
      result_xml = loadProducts_xml(url_xml);
      search(result_json,result_xml);
    } catch (error) {
      console.log( error );

    }
};

let loadProducts_xml = async ( xmlURL ) => {
    try {
        let response = await fetch( xmlURL ); 
        let result = await response.text()
        let xml = (new DOMParser()).parseFromString(result, 'application/xml');
        let products = xml.getElementsByTagName("product");
        let products_array=Array.from(products)
        data_xml(products_array);
        return products_array;
    } catch (error) {
      console.log( error );
    }
};

let data_json = (respuesta) => {
    respuesta.forEach(function(element) {
        src = element.src;
        price = element.price;
        nombre = element.name;
        type = element.type;
        mensaje_json=load_mensaje(src,price,nombre,type);
        document.getElementById("prods").innerHTML += mensaje_json
    });
};

let data_xml = (respuesta) => {
    for(elemen of respuesta){
        src = elemen.getElementsByTagName("src")[0].innerHTML;
        nombre = elemen.getElementsByTagName("name")[0].innerHTML;
        price = elemen.getElementsByTagName("price")[0].innerHTML;
        type = elemen.getElementsByTagName("type")[0].innerHTML;
        mensaje_xml=load_mensaje(src,price,nombre,type);
        document.getElementById("prods").innerHTML += mensaje_xml;
    }
    
};

function search(respuesta_json,respuesta_xml){
    let element = document.getElementById("filter");
    let sec = document.getElementById("prods");
    element.addEventListener('click', (event) => {
        let texto = document.getElementById("text").value;
        sec.innerHTML = ``;
        if(texto === ""){
            loadProducts_json(url_json);
        }else{
            let byfiltre = respuesta_json.filter(item => (item.name.includes(texto))||(item.type.includes(texto)));
            let byfiltre_xml = respuesta_xml.filter(item => (item.getElementsByTagName("name")[0].innerHTML.includes(texto)));
            console.log(byfiltre_xml);
            data_json(byfiltre);
            data_xml(byfiltre_xml);
        }
    }); 
}

loadProducts_json(url_json);
