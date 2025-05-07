function linearRegression(x, y) {
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
    
    return {
        slope,
        intercept,
        predict: function(xValue) {
            return slope * xValue + intercept;
        },
        r2: function() {
            const yMean = sumY / n;
            let totalVariation = 0, explainedVariation = 0;
            
            for (let i = 0; i < n; i++) {
                const predicted = this.predict(x[i]);
                totalVariation += Math.pow(y[i] - yMean, 2);
                explainedVariation += Math.pow(predicted - yMean, 2);
            }
            
            return explainedVariation / totalVariation;
        }
    };
}

function polynomialRegression(x, y, degree) {
    // Matriz X del modelo polinomial
    const X = [];
    for (let i = 0; i < x.length; i++) {
        const row = [];
        for (let j = 0; j <= degree; j++) {
            row.push(Math.pow(x[i], j));
        }
        X.push(row);
    }
    
    // Resolver el sistema de ecuaciones
    const Xmatrix = math.matrix(X);
    const Ymatrix = math.matrix(y);
    
    // Calcular (X^T * X)^-1 * X^T * y
    const Xtranspose = math.transpose(Xmatrix);
    const XtX = math.multiply(Xtranspose, Xmatrix);
    const XtXinv = math.inv(XtX);
    const XtY = math.multiply(Xtranspose, Ymatrix);
    const coefficients = math.multiply(XtXinv, XtY).toArray();
    
    // Función para predecir
    const predict = function(xValue) {
        let result = 0;
        for (let j = 0; j <= degree; j++) {
            result += coefficients[j] * Math.pow(xValue, j);
        }
        return result;
    };
    
    // Calcular R²
    const calculateR2 = function() {
        const yMean = y.reduce((acc, val) => acc + val, 0) / y.length;
        let totalVariation = 0, explainedVariation = 0;
        
        for (let i = 0; i < x.length; i++) {
            const predicted = predict(x[i]);
            totalVariation += Math.pow(y[i] - yMean, 2);
            explainedVariation += Math.pow(predicted - yMean, 2);
        }
        return explainedVariation / totalVariation;
    };
    
    return {
        coefficients,
        predict,
        r2: calculateR2
    };
}

function generateRegressionAnalysis(data, sector, targetElement) {
    const x = data.map(d => d.Año);
    const y = data.map(d => d[sector]);
    const linearModel = linearRegression(x, y);
    const polyModel = polynomialRegression(x, y, 2);
    const minYear = Math.min(...x);
    const maxYear = Math.max(...x);
    const range = maxYear - minYear;

    const predictionPoints = [];
    for (let i = 0; i <= 20; i++) {
        const year = minYear + (i / 20) * range;
        predictionPoints.push({
            x: year,
            yLinear: linearModel.predict(year),
            yPoly: polyModel.predict(year)
        });
    }

    const futureYears = [];
    for (let year = maxYear + 1; year <= maxYear + 5; year++) {
        futureYears.push({
            year,
            linearPrediction: linearModel.predict(year),
            polyPrediction: polyModel.predict(year)
        });
    }
    
    const ctx = document.createElement('canvas');
    targetElement.innerHTML = '';
    targetElement.appendChild(ctx);
    
    new Chart(ctx, {
        type: 'scatter',
        data: {
            datasets: [
                {
                    label: `Datos reales (${sector})`,
                    data: x.map((year, i) => ({ x: year, y: y[i] })),
                    backgroundColor: 'rgba(75, 192, 192, 0.6)',
                    borderColor: 'rgba(75, 192, 192, 1)',
                    borderWidth: 1,
                    pointRadius: 5
                },
                {
                    label: 'Regresión Lineal',
                    data: predictionPoints.map(p => ({ x: p.x, y: p.yLinear })),
                    backgroundColor: 'rgba(255, 99, 132, 0)',
                    borderColor: 'rgba(255, 99, 132, 1)',
                    borderWidth: 2,
                    pointRadius: 0,
                    type: 'line',
                    tension: 0
                },
                {
                    label: 'Regresión Polinomial',
                    data: predictionPoints.map(p => ({ x: p.x, y: p.yPoly })),
                    backgroundColor: 'rgba(54, 162, 235, 0)',
                    borderColor: 'rgba(54, 162, 235, 1)',
                    borderWidth: 2,
                    pointRadius: 0,
                    type: 'line',
                    tension: 0
                }
            ]
        },
        options: {
            responsive: true,
            scales: {
                x: {
                    type: 'linear',
                    position: 'bottom',
                    title: {
                        display: true,
                        text: 'Año'
                    },
                    ticks: {
                        callback: function(value) {
                            if (Number.isInteger(value)) {
                                return value;
                            }
                            return '';
                        }
                    }
                },
                y: {
                    title: {
                        display: true,
                        text: 'Consumo (millones de m³)'
                    }
                }
            },
            plugins: {
                tooltip: {
                    callbacks: {
                        label: function(context) {
                            const datasetLabel = context.dataset.label || '';
                            const value = context.parsed.y.toFixed(2);
                            return `${datasetLabel}: ${value}`;
                        }
                    }
                }
            }
        }
    });
    
    const resultsContainer = document.createElement('div');
    resultsContainer.innerHTML = `
        <h4>Resultados de la Regresión para ${sector}</h4>
        <p><strong>Regresión Lineal:</strong></p>
        <p>Ecuación: y = ${linearModel.slope.toFixed(4)}x + ${linearModel.intercept.toFixed(2)}</p>
        <p>R² = ${linearModel.r2().toFixed(4)}</p>
        <p><strong>Regresión Polinomial:</strong></p>
        <p>Ecuación: y = ${polyModel.coefficients[2].toFixed(4)}x² + ${polyModel.coefficients[1].toFixed(4)}x + ${polyModel.coefficients[0].toFixed(2)}</p>
        <p>R² = ${polyModel.r2().toFixed(4)}</p>
        
        <h4>Predicciones para Años Futuros</h4>
        <table>
            <thead>
                <tr>
                    <th>Año</th>
                    <th>Predicción Lineal</th>
                    <th>Predicción Polinomial</th>
                </tr>
            </thead>
            <tbody>
                ${futureYears.map(fy => `
                    <tr>
                        <td>${fy.year}</td>
                        <td>${fy.linearPrediction.toFixed(2)}</td>
                        <td>${fy.polyPrediction.toFixed(2)}</td>
                    </tr>
                `).join('')}
            </tbody>
        </table>
    `;
    targetElement.appendChild(resultsContainer);
    return {
        linearModel,
        polyModel,
        futureYears
    };
}