const ingresos = [
    new Ingreso('Salario', 15000),
    new Ingreso('Horas extra', 1000),
    new Ingreso('Renta de Auto', 3000),
    new Ingreso('Inversiones', 2500),
    new Ingreso('Toquín', 4000)
];

const egresos = [
    new Egreso('Despensa', 3500),
    new Egreso('Pago Casa', 4000),
    new Egreso('Gasolina', 1500)
];

function cargarApp () {
    cargarCabecero();
    cargarIngresos();
    cargarEgresos();
}

let totalIngresos = () => {
    let totalIngresos = 0;
    for (let ingreso of ingresos)
        totalIngresos += ingreso.valor;
    return totalIngresos;
};

let totalEgresos = () => {
    let totalEgresos = 0;
    for (let egreso of egresos) 
        totalEgresos += egreso.valor;
    return totalEgresos;
}

let cargarCabecero = () => {
    let presupuesto = totalIngresos() - totalEgresos();
    let egresosPorcentaje = totalEgresos() / totalIngresos();
    document.getElementById('presupuesto').innerHTML = formatCurrency(presupuesto);
    document.getElementById('porcentaje-egresos').innerHTML = formatPercent(egresosPorcentaje);
    document.getElementById('ingresos').innerHTML = formatCurrency(totalIngresos());
    document.getElementById('egresos').innerHTML = formatCurrency(totalEgresos());
}

const formatCurrency = (valor) => {
    return valor.toLocaleString('en-US', {style: 'currency', currency: 'USD', minimumFractionDigits: 2});
}

const formatPercent = (valor) => {
    return valor.toLocaleString('en-US', {style: 'percent', minimumFractionDigits: 2});
}

const cargarIngresos = () => {
    let ingresosHTML = '';
    for (let ingreso of ingresos) {
        ingresosHTML += crearIngresosHTML(ingreso);
    }
    document.getElementById('lista-ingresos').innerHTML = ingresosHTML;
}

const crearIngresosHTML = (ingreso) => {
    let porcentaje = ingreso.valor / totalIngresos();
    let ingresosHTML = `
    <li class="elemento clean">
        <div class="elemento_descripcion">${ingreso.descripcion}</div>
        <div class="derecha">
            <div class="elemento_valor">${formatCurrency(ingreso.valor)}</div>
            <div class="elemento_porcentaje">${formatPercent(porcentaje)}</div>
            <div class="elemento_eliminar">
                <button class="elemento_eliminar--btn">
                    <ion-icon name="close-circle-outline" onclick = 'eliminarIngreso(${ingreso.id})'></ion-icon>
                </button>
            </div>
        </div>
    </li>
    `
    return ingresosHTML;
}

const cargarEgresos = () => {
    let egresosHTML = '';
    for (let egreso of egresos) {
        egresosHTML += crearEgresosHTML(egreso);
    }
    document.getElementById('lista-egresos').innerHTML = egresosHTML;
}

const crearEgresosHTML = (egreso) => {
    let porcentaje = egreso.valor / totalEgresos();
    let egresosHTML = `
    <li class="elemento clean">
        <div class="elemento_descripcion">${egreso.descripcion}</div>
        <div class="derecha">
            <div class="elemento_valor">${formatCurrency(egreso.valor)}</div>
            <div class="elemento_porcentaje">${formatPercent(porcentaje)}</div>
            <div class="elemento_eliminar">
                <button class="elemento_eliminar--btn">
                    <ion-icon name="close-circle-outline" onclick = 'eliminarEgreso(${egreso.id})'></ion-icon>
                </button>
            </div>
        </div>
    </li>
    `
    return egresosHTML;
}

const eliminarIngreso = (id) => {
    let eliminarIndice = ingresos.findIndex( (ingreso) => {ingreso.id === id} );
    ingresos.splice(eliminarIndice, 1);
    cargarCabecero();
    cargarIngresos();
} 

const eliminarEgreso = (id) => {
    let eliminarIndice = ingresos.findIndex( (egreso) => {egreso.id === id} );
    egresos.splice(eliminarIndice, 1);
    cargarCabecero();
    cargarEgresos();
} 

let agregarDato = () => {
    let forma = document.forms['forma'];
    let tipo = forma['tipo'];
    let descripcion = forma['descripcion'];
    let valor = forma['valor'];
    if (descripcion.value !== '' && valor.value !== '') {
        if (tipo.value === 'ingreso') {
            ingresos.push(new Ingreso(descripcion.value, parseInt(valor.value)));
            cargarCabecero();
            cargarIngresos();
            console.log(totalIngresos());
        } else if (tipo.value === 'egreso') {
            egresos.push(new Egreso(descripcion.value, parseInt(valor.value)));
            cargarCabecero();
            cargarEgresos();
            console.log(totalEgresos());
        }
    }
}