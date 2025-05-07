function calculateEntropy(dataset) {
    const targetValues = dataset.map(item => item.WillWait);
    const valueCounts = {};
  
    targetValues.forEach(value => {
        if (!valueCounts[value]) {
            valueCounts[value] = 0;
        }
        valueCounts[value]++;
    });
    
    // Calcular entropía
    let entropy = 0;
    const totalCount = targetValues.length;
    
    for (const value in valueCounts) {
        const probability = valueCounts[value] / totalCount;
        entropy -= probability * Math.log2(probability);
    }
    
    return entropy;
}

function calculateInformationGain(dataset, attribute) {
    const baseEntropy = calculateEntropy(dataset);
    const attributeValues = [...new Set(dataset.map(item => item[attribute]))];
    let weightedEntropy = 0;
    attributeValues.forEach(value => {
        const subset = dataset.filter(item => item[attribute] === value);
        const weight = subset.length / dataset.length;
        const subsetEntropy = calculateEntropy(subset);
        weightedEntropy += weight * subsetEntropy;
    });
    return baseEntropy - weightedEntropy;
}

function selectBestAttribute(dataset, attributes) {
    let bestAttribute = null;
    let maxInfoGain = -Infinity;
    
    attributes.forEach(attribute => {
        const infoGain = calculateInformationGain(dataset, attribute);
        if (infoGain > maxInfoGain) {
            maxInfoGain = infoGain;
            bestAttribute = attribute;
        }
    });
    return {
        attribute: bestAttribute,
        infoGain: maxInfoGain
    };
}

function selectTopKAttributes(dataset, attributes, k) {
    const attributeGains = [];
    attributes.forEach(attribute => {
        const infoGain = calculateInformationGain(dataset, attribute);
        attributeGains.push({
            attribute,
            infoGain
        });
    });
    attributeGains.sort((a, b) => b.infoGain - a.infoGain);
    return attributeGains.slice(0, k);
}

class DecisionTreeNode {
    constructor(dataset, depth = 0, maxDepth = 3) {
        this.dataset = dataset;
        this.depth = depth;
        this.maxDepth = maxDepth;
        this.attribute = null;
        this.children = {};
        this.isLeaf = false;
        this.prediction = null;
    }
    build(attributes) {
        const targetValues = this.dataset.map(item => item.WillWait);
        const uniqueValues = [...new Set(targetValues)];
        
        if (uniqueValues.length === 1) {
            this.isLeaf = true;
            this.prediction = uniqueValues[0];
            return;
        }
        if (attributes.length === 0 || this.depth >= this.maxDepth) {
            this.isLeaf = true;
            const valueCounts = {};
            targetValues.forEach(value => {
                if (!valueCounts[value]) {
                    valueCounts[value] = 0;
                }
                valueCounts[value]++;
            });
            let maxCount = -Infinity;
            let majorityValue = null;
            
            for (const value in valueCounts) {
                if (valueCounts[value] > maxCount) {
                    maxCount = valueCounts[value];
                    majorityValue = value;
                }
            }
            this.prediction = majorityValue;
            return;
        }
        const { attribute, infoGain } = selectBestAttribute(this.dataset, attributes);
        this.attribute = attribute;
        this.infoGain = infoGain;
        
        const attributeValues = [...new Set(this.dataset.map(item => item[attribute]))];
        
        attributeValues.forEach(value => {
            const subset = this.dataset.filter(item => item[attribute] === value);
            if (subset.length === 0) {
                this.children[value] = new DecisionTreeNode([]);
                this.children[value].isLeaf = true;
                const valueCounts = {};
                targetValues.forEach(val => {
                    if (!valueCounts[val]) {
                        valueCounts[val] = 0;
                    }
                    valueCounts[val]++;
                });
                
                let maxCount = -Infinity;
                let majorityValue = null;
                
                for (const val in valueCounts) {
                    if (valueCounts[val] > maxCount) {
                        maxCount = valueCounts[val];
                        majorityValue = val;
                    }
                }
                
                this.children[value].prediction = majorityValue;
            } else {
                const remainingAttributes = attributes.filter(attr => attr !== attribute);
                this.children[value] = new DecisionTreeNode(subset, this.depth + 1, this.maxDepth);
                this.children[value].build(remainingAttributes);
            }
        });
    }

    predict(example) {
        if (this.isLeaf) {
            return this.prediction;
        }
        const attributeValue = example[this.attribute];
        if (!this.children[attributeValue]) {
            const targetValues = this.dataset.map(item => item.WillWait);
            const valueCounts = {};
            targetValues.forEach(value => {
                if (!valueCounts[value]) {
                    valueCounts[value] = 0;
                }
                valueCounts[value]++;
            });
            let maxCount = -Infinity;
            let majorityValue = null;
            for (const value in valueCounts) {
                if (valueCounts[value] > maxCount) {
                    maxCount = valueCounts[value];
                    majorityValue = value;
                }
            }
            
            return majorityValue;
        }
        return this.children[attributeValue].predict(example);
    }
    calculateAccuracy(testData) {
        let correctPredictions = 0;
        testData.forEach(example => {
            const prediction = this.predict(example);
            if (prediction === example.WillWait) {
                correctPredictions++;
            }
        });
        return correctPredictions / testData.length;
    }
}

function visualizeDecisionTree(tree, container) {
    const canvas = document.createElement('canvas');
    container.innerHTML = '';
    container.appendChild(canvas);
    const nodes = [];
    const connections = [];
    function extractTreeInfo(node, parentId = null, edgeLabel = null) {
        const nodeId = nodes.length;
        
        if (node.isLeaf) {
            nodes.push({
                id: nodeId,
                label: `Clase: ${node.prediction}`,
                type: 'leaf'
            });
        } else {
            nodes.push({
                id: nodeId,
                label: node.attribute,
                infoGain: node.infoGain,
                type: 'internal'
            });
            for (const value in node.children) {
                const childNode = node.children[value];
                const childId = nodes.length;
                extractTreeInfo(childNode, nodeId, value);
                connections.push({
                    from: nodeId,
                    to: childId,
                    label: value
                });
            }
        }
        if (parentId !== null) {
            connections.push({
                from: parentId,
                to: nodeId,
                label: edgeLabel
            });
        }
        
        return nodeId;
    }
    extractTreeInfo(tree);
    new Chart(canvas, {
        type: 'bar',
        data: {
            labels: nodes.filter(n => n.type === 'internal').map(n => n.label),
            datasets: [{
                label: 'Ganancia de Información',
                data: nodes.filter(n => n.type === 'internal').map(n => n.infoGain),
                backgroundColor: 'rgba(54, 162, 235, 0.7)',
                borderColor: 'rgba(54, 162, 235, 1)',
                borderWidth: 1
            }]
        },
        options: {
            responsive: true,
            scales: {
                y: {
                    beginAtZero: true,
                    title: {
                        display: true,
                        text: 'Ganancia de Información'
                    }
                },
                x: {
                    title: {
                        display: true,
                        text: 'Atributos'
                    }
                }
            },
            plugins: {
                title: {
                    display: true,
                    text: 'Atributos Seleccionados por el Árbol de Decisión'
                }
            }
        }
    });
    const treeDescription = document.createElement('div');
    treeDescription.innerHTML = `
        <h4>Estructura del Árbol de Decisión</h4>
        <p>El análisis ha identificado los siguientes atributos como los más importantes para la clasificación:</p>
        <ol>
            ${nodes.filter(n => n.type === 'internal')
                .sort((a, b) => b.infoGain - a.infoGain)
                .map(n => `<li><strong>${n.label}</strong> (Ganancia de Información: ${n.infoGain.toFixed(4)})</li>`)
                .join('')}
        </ol>
        <p>Estos atributos permiten clasificar si un cliente esperará o no en el restaurante con alta precisión.</p>
    `;
    
    container.appendChild(treeDescription);
}

function analyzeRestaurantData(data, container) {
    const attributes = ["Alt", "Bar", "Fri", "Hun", "Pat", "Price", "Rain", "Res", "Type", "Est"];
    const topAttributes = selectTopKAttributes(data, attributes, 3);
    const attributesList = document.getElementById('selectedAttributes');
    attributesList.innerHTML = '';
    
    topAttributes.forEach(attr => {
        const li = document.createElement('li');
        li.innerHTML = `<strong>${attr.attribute}</strong> (Ganancia de Información: ${attr.infoGain.toFixed(4)})`;
        attributesList.appendChild(li);
    });
    const tree = new DecisionTreeNode(data);
    tree.build(attributes);
    const accuracy = tree.calculateAccuracy(data);
    visualizeDecisionTree(tree, container);
    const resultsContainer = document.createElement('div');
    resultsContainer.innerHTML = `
        <h4>Resultados del Análisis</h4>
        <p>Precisión del árbol de decisión: ${(accuracy * 100).toFixed(2)}%</p>
        <p>Utilizando solo los 3 atributos seleccionados (${topAttributes.map(a => a.attribute).join(', ')}), 
           es posible predecir si un cliente esperará o no con una precisión del ${(accuracy * 100).toFixed(2)}%.</p>
    `;
    container.appendChild(resultsContainer);
    return {
        topAttributes,
        tree,
        accuracy
    };
}