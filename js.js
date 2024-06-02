document.addEventListener('DOMContentLoaded', () => {
    const matrixSize = getUserInput('Введите число, которое определит длину массива:', 10);
    const topRightElementValue = getUserInput('Введите число для элемента массива вверху справа:', 7);
    const targetRow = getUserInput('Введите номер строки для подсчета ее суммы (начиная с 0):', 3);
    const targetColumn = getUserInput('Введите номер столбца для подсчета его суммы (начиная с 0):', 5);

    const matrix = generateMatrix(matrixSize, topRightElementValue);
    renderMatrix(matrix);

    const calculations = [
        { description: 'Сумма главной диагонали', func: calculateMainDiagonalSum },
        { description: 'Сумма побочной диагонали', func: calculateSecondaryDiagonalSum },
        { description: 'Сумма верхней правой половины матрицы без главной диагонали', func: calculateMatrixHalfSum, args: [false, true, true] },
        { description: 'Сумма верхней правой половины матрицы с главной диагональю', func: calculateMatrixHalfSum, args: [true, true, true] },
        { description: 'Сумма нижней левой половины матрицы без главной диагонали', func: calculateMatrixHalfSum, args: [false, false, true] },
        { description: 'Сумма нижней левой половины матрицы с главной диагональю', func: calculateMatrixHalfSum, args: [true, false, true] },
        { description: 'Сумма верхней левой половины матрицы без побочной диагонали', func: calculateMatrixHalfSum, args: [false, true, false] },
        { description: 'Сумма верхней левой половины матрицы с побочной диагональю', func: calculateMatrixHalfSum, args: [true, true, false] },
        { description: 'Сумма нижней правой половины матрицы без побочной диагонали', func: calculateMatrixHalfSum, args: [false, false, false] },
        { description: `Сумма всех элементов строки ${targetRow}`, func: calculateRowSum, args: [targetRow] },
        { description: `Сумма всех элементов столбца ${targetColumn}`, func: calculateColumnSum, args: [targetColumn] }
    ];

    calculations.forEach(({ description, func, args = [] }) => {
        renderCalculationResult(description, func(matrix, ...args));
    });
});

function getUserInput(promptText, defaultValue) {
    return parseInt(prompt(promptText, defaultValue));
}

function generateMatrix(size, topRightElementValue) {
    const matrix = Array.from({ length: size }, () => Array.from({ length: size }, () => Math.floor(Math.random() * 10)));
    matrix[0][size - 1] = topRightElementValue;
    return matrix;
}

function renderMatrix(matrix) {
    document.write('<h2>Матрица:</h2>');
    document.write(generateHTMLTable(matrix));
}

function generateHTMLTable(matrix, highlightedCells = {}, highlightColor = 'lightgreen') {
    let html = '<table>';
    for (let i = 0; i < matrix.length; i++) {
        html += '<tr>';
        for (let j = 0; j < matrix[i].length; j++) {
            const cellColor = highlightedCells[i] && highlightedCells[i].includes(j) ? highlightColor : '';
            html += `<td style="background-color: ${cellColor}">${matrix[i][j]}</td>`;
        }
        html += '</tr>';
    }
    html += '</table>';
    return html;
}

function renderCalculationResult(description, result) {
    document.write(`<h3>${description}: <span>${result}</span></h3>`);
}

function calculateMainDiagonalSum(matrix) {
    let sum = 0;
    const highlightedCells = {};
    matrix.forEach((row, i) => {
        sum += row[i];
        highlightedCells[i] = [i];
    });
    document.write(generateHTMLTable(matrix, highlightedCells, 'green'));
    return sum;
}

function calculateSecondaryDiagonalSum(matrix) {
    let sum = 0;
    const highlightedCells = {};
    matrix.forEach((row, i) => {
        const colIndex = row.length - 1 - i;
        sum += row[colIndex];
        highlightedCells[i] = [colIndex];
    });
    document.write(generateHTMLTable(matrix, highlightedCells, 'blue'));
    return sum;
}

function calculateMatrixHalfSum(matrix, includeDiagonal, isUpperHalf, isMainDiagonal) {
    let sum = 0;
    const highlightedCells = {};
    matrix.forEach((row, i) => {
        row.forEach((value, j) => {
            const condition = isMainDiagonal ? (isUpperHalf ? j > i : j < i) : (isUpperHalf ? j < row.length - 1 - i : j > row.length - 1 - i);
            const include = condition || (includeDiagonal && ((isMainDiagonal && j === i) || (!isMainDiagonal && j === row.length - 1 - i)));
            if (include) {
                sum += value;
                highlightedCells[i] = highlightedCells[i] || [];
                highlightedCells[i].push(j);
            }
        });
    });
    document.write(generateHTMLTable(matrix, highlightedCells, 'yellow'));
    return sum;
}

function calculateRowSum(matrix, row) {
    const sum = matrix[row].reduce((acc, item) => acc + item, 0);
    const highlightedCells = { [row]: Array.from({ length: matrix[row].length }, (_, i) => i) };
    document.write(generateHTMLTable(matrix, highlightedCells, 'brown'));
    return sum;
}

function calculateColumnSum(matrix, column) {
    let sum = 0;
    const highlightedCells = {};
    matrix.forEach((row, i) => {
        sum += row[column];
        highlightedCells[i] = [column];
    });
    document.write(generateHTMLTable(matrix, highlightedCells, 'grey'));
    return sum;
}
