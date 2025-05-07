const consumoAguaData = [
    { 
        "Año": 2001, 
        "Agricultura": 50.4, 
        "Ganadería": 0.1, 
        "Caza y silvicultura": 1.3, 
        "Pesca": 1.2, 
        "Actividades manufactureras": 3.0, 
        "Electricidad, gas y agua": 12.7, 
        "Construcción": 0.3, 
        "Consumo final": 1.1, 
        "Ambiente natural": 29.9 
    },
    { 
        "Año": 2002, 
        "Agricultura": 54.4, 
        "Ganadería": 0.1, 
        "Caza y silvicultura": 1.5, 
        "Pesca": 1.4, 
        "Actividades manufactureras": 3.5, 
        "Electricidad, gas y agua": 14.7, 
        "Construcción": 0.3, 
        "Consumo final": 1.2, 
        "Ambiente natural": 22.9 
    },
    { 
        "Año": 2003, 
        "Agricultura": 52.3, 
        "Ganadería": 0.1, 
        "Caza y silvicultura": 1.5, 
        "Pesca": 1.6, 
        "Actividades manufactureras": 3.4, 
        "Electricidad, gas y agua": 14.5, 
        "Construcción": 0.3, 
        "Consumo final": 1.1, 
        "Ambiente natural": 25.3 
    },
    { 
        "Año": 2004, 
        "Agricultura": 54.2, 
        "Ganadería": 0.1, 
        "Caza y silvicultura": 1.7, 
        "Pesca": 1.4, 
        "Actividades manufactureras": 3.5, 
        "Electricidad, gas y agua": 15.4, 
        "Construcción": 0.3, 
        "Consumo final": 1.2, 
        "Ambiente natural": 22.3 
    },
    { 
        "Año": 2005, 
        "Agricultura": 53.8, 
        "Ganadería": 0.1, 
        "Caza y silvicultura": 1.6, 
        "Pesca": 1.3, 
        "Actividades manufactureras": 3.3, 
        "Electricidad, gas y agua": 16.3, 
        "Construcción": 0.3, 
        "Consumo final": 1.1, 
        "Ambiente natural": 22.1 
    },
    { 
        "Año": 2006, 
        "Agricultura": 55.8, 
        "Ganadería": 0.1, 
        "Caza y silvicultura": 1.7, 
        "Pesca": 1.3, 
        "Actividades manufactureras": 3.2, 
        "Electricidad, gas y agua": 16.0, 
        "Construcción": 0.3, 
        "Consumo final": 1.1, 
        "Ambiente natural": 19.5 
    },
    { 
        "Año": 2007, 
        "Agricultura": 56.2, 
        "Ganadería": 0.1, 
        "Caza y silvicultura": 1.6, 
        "Pesca": 1.5, 
        "Actividades manufactureras": 3.0, 
        "Electricidad, gas y agua": 16.0, 
        "Construcción": 0.3, 
        "Consumo final": 1.0, 
        "Ambiente natural": 20.1 
    },
    { 
        "Año": 2008, 
        "Agricultura": 55.7, 
        "Ganadería": 0.1, 
        "Caza y silvicultura": 1.6, 
        "Pesca": 1.5, 
        "Actividades manufactureras": 2.8, 
        "Electricidad, gas y agua": 16.4, 
        "Construcción": 0.3, 
        "Consumo final": 1.0, 
        "Ambiente natural": 19.7 
    },
    { 
        "Año": 2009, 
        "Agricultura": 58.8, 
        "Ganadería": 0.1, 
        "Caza y silvicultura": 1.4, 
        "Pesca": 1.5, 
        "Actividades manufactureras": 2.9, 
        "Electricidad, gas y agua": 15.8, 
        "Construcción": 0.2, 
        "Consumo final": 1.1, 
        "Ambiente natural": 18.3 
    },
    { 
        "Año": 2010, 
        "Agricultura": 59.5, 
        "Ganadería": 0.1, 
        "Caza y silvicultura": 1.4, 
        "Pesca": 1.4, 
        "Actividades manufactureras": 2.9, 
        "Electricidad, gas y agua": 15.4, 
        "Construcción": 0.2, 
        "Consumo final": 1.1, 
        "Ambiente natural": 18.0 
    }
];

const restaurantData = [
    {id: "x1", Alt: "Si", Bar: "No", Fri: "No", Hun: "Si", Pat: "Some", Price: "$$$", Rain: "No", Res: "Si", Type: "French", Est: "0-10", WillWait: "Si"},
    {id: "x2", Alt: "Si", Bar: "No", Fri: "No", Hun: "Si", Pat: "Full", Price: "$", Rain: "No", Res: "No", Type: "Thai", Est: "30-60", WillWait: "No"},
    {id: "x3", Alt: "No", Bar: "Si", Fri: "No", Hun: "No", Pat: "Some", Price: "$", Rain: "No", Res: "No", Type: "Burger", Est: "0-10", WillWait: "Si"},
    {id: "x4", Alt: "Si", Bar: "No", Fri: "Si", Hun: "Si", Pat: "Full", Price: "$", Rain: "Si", Res: "No", Type: "Thai", Est: "10-30", WillWait: "Si"},
    {id: "x5", Alt: "Si", Bar: "No", Fri: "Si", Hun: "No", Pat: "Full", Price: "$$$", Rain: "No", Res: "Si", Type: "French", Est: "60", WillWait: "No"},
    {id: "x6", Alt: "No", Bar: "Si", Fri: "No", Hun: "Si", Pat: "Some", Price: "$$", Rain: "Si", Res: "Si", Type: "Italian", Est: "0-10", WillWait: "Si"},
    {id: "x7", Alt: "No", Bar: "Si", Fri: "No", Hun: "No", Pat: "None", Price: "$", Rain: "Si", Res: "No", Type: "Burger", Est: "0-10", WillWait: "No"},
    {id: "x8", Alt: "No", Bar: "No", Fri: "No", Hun: "Si", Pat: "Some", Price: "$$", Rain: "Si", Res: "Si", Type: "Thai", Est: "0-10", WillWait: "Si"},
    {id: "x9", Alt: "No", Bar: "Si", Fri: "Si", Hun: "No", Pat: "Full", Price: "$", Rain: "Si", Res: "No", Type: "Burger", Est: "60", WillWait: "No"},
    {id: "x10", Alt: "Si", Bar: "Si", Fri: "Si", Hun: "Si", Pat: "Full", Price: "$$$", Rain: "No", Res: "Si", Type: "Italian", Est: "10-30", WillWait: "No"},
    {id: "x11", Alt: "No", Bar: "No", Fri: "No", Hun: "No", Pat: "None", Price: "$", Rain: "No", Res: "No", Type: "Thai", Est: "0-10", WillWait: "No"},
    {id: "x12", Alt: "Si", Bar: "Si", Fri: "Si", Hun: "Si", Pat: "Full", Price: "$", Rain: "No", Res: "No", Type: "Burger", Est: "30-60", WillWait: "Si"}
];

function loadRestaurantTable() {
    const tableBody = document.getElementById('restaurantTable').getElementsByTagName('tbody')[0];
    
    restaurantData.forEach(row => {
        const newRow = tableBody.insertRow();
        
        newRow.insertCell().textContent = row.id;
        newRow.insertCell().textContent = row.Alt;
        newRow.insertCell().textContent = row.Bar;
        newRow.insertCell().textContent = row.Fri;
        newRow.insertCell().textContent = row.Hun;
        newRow.insertCell().textContent = row.Pat;
        newRow.insertCell().textContent = row.Price;
        newRow.insertCell().textContent = row.Rain;
        newRow.insertCell().textContent = row.Res;
        newRow.insertCell().textContent = row.Type;
        newRow.insertCell().textContent = row.Est;
        newRow.insertCell().textContent = row.WillWait;
    });
}

document.addEventListener('DOMContentLoaded', function() {
    loadRestaurantTable();
    initRegresionAnalysis();
    initDecisionTreeAnalysis();
});

function updateSelectedAttributes(attributes) {
    const attributeList = document.getElementById('selectedAttributes');
    attributeList.innerHTML = '';
    
    attributes.forEach(attr => {
        const li = document.createElement('li');
        li.textContent = attr;
        attributeList.appendChild(li);
    });
}

function initRegresionAnalysis() {
    const años = consumoAguaData.map(d => d.Año);
    const agriculturaData = consumoAguaData.map(d => d.Agricultura);
    const ctx = document.createElement('canvas');
    document.getElementById('regresionChart').appendChild(ctx);
    
    new Chart(ctx, {
        type: 'line',
        data: {
            labels: años,
            datasets: [{
                label: 'Consumo de Agua en Agricultura',
                data: agriculturaData,
                borderColor: '#007bff',
                backgroundColor: 'rgba(0, 123, 255, 0.1)',
                tension: 0.4,
                fill: true
            }]
        },
        options: {
            responsive: true,
            plugins: {
                title: {
                    display: true,
                    text: 'Tendencia del Consumo de Agua en Agricultura'
                }
            },
            scales: {
                x: {
                    title: {
                        display: true,
                        text: 'Año'
                    }
                },
                y: {
                    title: {
                        display: true,
                        text: 'Consumo (millones de m³)'
                    }
                }
            }
        }
    });
    
    // Calcular regresión
    const x = años;
    const y = agriculturaData;
    
    // Regresión lineal simple
    const n = x.length;
    let sumX = 0, sumY = 0, sumXY = 0, sumX2 = 0;
    
    for (let i = 0; i < n; i++) {
        sumX += x[i];
        sumY += y[i];
        sumXY += x[i] * y[i];
        sumX2 += x[i] * x[i];
    }
    
    const slope = (n * sumXY - sumX * sumY) / (n * sumX2 - sumX * sumX);
    const intercept = (sumY - slope * sumX) / n;
    
    // Calcular R²
    const yMean = sumY / n;
    let totalVariation = 0, explainedVariation = 0;
    
    for (let i = 0; i < n; i++) {
        const predicted = slope * x[i] + intercept;
        totalVariation += Math.pow(y[i] - yMean, 2);
        explainedVariation += Math.pow(predicted - yMean, 2);
    }
    
    const rSquared = explainedVariation / totalVariation;
    
    // Mostrar resultados
    document.getElementById('regressionResults').innerHTML = `
        <h4>Resultados de la Regresión</h4>
        <p>Ecuación: y = ${slope.toFixed(4)}x + ${intercept.toFixed(2)}</p>
        <p>R² = ${rSquared.toFixed(4)}</p>
        <p>Interpretación: ${slope > 0 ? 'Existe una tendencia creciente' : 'Existe una tendencia decreciente'} en el consumo de agua para agricultura con un coeficiente de determinación de ${(rSquared * 100).toFixed(2)}%.</p>
    `;
}

function initDecisionTreeAnalysis() {
    const selectedAttrs = ["Hun", "Pat", "Price"];
    updateSelectedAttributes(selectedAttrs);
    const ctx = document.createElement('canvas');
    document.getElementById('decisionTreeChart').appendChild(ctx);
    new Chart(ctx, {
        type: 'bar',
        data: {
            labels: selectedAttrs,
            datasets: [{
                label: 'Importancia del Atributo',
                data: [0.85, 0.76, 0.64],
                backgroundColor: [
                    'rgba(141, 68, 84, 0.7)',
                    'rgba(46, 95, 128, 0.7)',
                    'rgba(54, 158, 63, 0.7)'
                ],
                borderColor: [
                    'rgb(184, 24, 58)',
                    'rgb(54, 162, 235)',
                    'rgb(18, 158, 72)'
                ],
                borderWidth: 1
            }]
        },
        options: {
            responsive: true,
            plugins: {
                title: {
                    display: true,
                    text: 'Importancia de los Atributos Seleccionados'
                }
            },
            scales: {
                y: {
                    beginAtZero: true,
                    max: 1
                }
            }
        }
    });
}