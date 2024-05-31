let n = 0;
while (isNaN(n) || n < 1) {
    n = +prompt("Введите длину массива");
}

let arr = [];

for (let i = 0; i < n; i++) {
    arr[i] = [];
    for (let j = 0; j < n; j++) {
        arr[i][j] = Math.round(Math.random() * 9);
    }
}

const topLeftElement = arr[0][n - 1]; // Верхний правый угловой элемент квадрата
const rowNumber = parseInt(prompt("Введите номер строки для подсчета суммы (от 1 до " + n + ")"), 10) - 1;
const columnNumber = parseInt(prompt("Введите номер столбца для подсчета суммы (от 1 до " + n + ")"), 10) - 1;

let mainDiagonalSum = 0;
for (let i = 0; i < n; i++) {
    mainDiagonalSum += arr[i][i];
}


let secondaryDiagonalSum = 0;
for (let i = 0; i < n; i++) {
    secondaryDiagonalSum += arr[i][n - i - 1];
}


let upperRightHalfWithoutMainDiag = 0;
for (let i = 0; i < n; i++) {
    for (let j = 0; j < n; j++) {
        if (i < j && j !== n - 1) {
            upperRightHalfWithoutMainDiag += arr[i][j];
        }
    }
}

let upperRightHalfWithMainDiag = 0;
for (let i = 0; i < n; i++) {
    for (let j = 0; j < n; j++) {
        if (i <= j && j !== n - 1) {
            upperRightHalfWithMainDiag += arr[i][j];
        }
    }
}

let lowerLeftHalfWithoutMainDiag = 0;
for (let i = 0; i < n; i++) {
    for (let j = 0; j < n; j++) {
        if (i > j && i !== n - 1) {
            lowerLeftHalfWithoutMainDiag += arr[i][j];
        }
    }
}

let lowerLeftHalfWithMainDiag = 0;
for (let i = 0; i < n; i++) {
    for (let j = 0; j < n; j++) {
        if (i >= j && i !== n - 1) {
            lowerLeftHalfWithMainDiag += arr[i][j];
        }
    }
}

let upperLeftHalfWithoutSecondaryDiag = 0;
for (let i = 0; i < n; i++) {
    for (let j = 0; j < n; j++) {
        if (i + j < n - 1 && i !== n - 1) {
            upperLeftHalfWithoutSecondaryDiag += arr[i][j];
        }
    }
}

let upperLeftHalfWithSecondaryDiag = 0;
for (let i = 0; i < n; i++) {
    for (let j = 0; j < n; j++) {
        if (i + j <= n - 1 && i !== n - 1) {
            upperLeftHalfWithSecondaryDiag += arr[i][j];
        }
    }
}

let lowerRightHalfWithoutSecondaryDiag = 0;
for (let i = 0; i < n; i++) {
    for (let j = 0; j < n; j++) {
        if (i + j > n - 1 && j !== n - 1) {
            lowerRightHalfWithoutSecondaryDiag += arr[i][j];
        }
    }
}

let lowerRightHalfWithSecondaryDiag = 0;
for (let i = 0; i < n; i++) {
    for (let j = 0; j < n; j++) {
        if (i + j >= n - 1 && j !== n - 1) {
            lowerRightHalfWithSecondaryDiag += arr[i][j];
        }
    }
}

// Сумма строки
let rowSum = 0;
for (let j = 0; j < n; j++) {
    rowSum += arr[rowNumber][j];
}

// Сумма столбца
let columnSum = 0;
for (let i = 0; i < n; i++) {
    columnSum += arr[i][columnNumber];
}

let matrixContainer = document.getElementById('matrixContainer');
matrixContainer.innerHTML = '';
for (let i = 0; i < n; i++) {
    for (let j = 0; j < n; j++) {
        let div = document.createElement('div');
        div.className = 'cell';
        div.textContent = arr[i][j];
        if ((i === 0 && j === n - 1) || i === rowNumber || j === columnNumber) {
            div.classList.add('highlight');
        }
        matrixContainer.appendChild(div);
    }
    let br = document.createElement('br');
    matrixContainer.appendChild(br);
}

// Вывод результатов
let resultsContainer = document.getElementById('results');
resultsContainer.innerHTML = `
    <ul>
        <li>Сумма главной диагонали: ${mainDiagonalSum}</li>
        <li>Сумма побочной диагонали: ${secondaryDiagonalSum}</li>
        <li>Сумма половины матрицы без главной диагонали сверху справа: ${upperRightHalfWithoutMainDiag}</li>
        <li>Сумма половины матрицы с главной диагональю сверху справа: ${upperRightHalfWithMainDiag}</li>
        <li>Сумма половины матрицы без главной диагонали снизу слева: ${lowerLeftHalfWithoutMainDiag}</li>
        <li>Сумма половины матрицы с главной диагональю снизу слева: ${lowerLeftHalfWithMainDiag}</li>
        <li>Сумма половины матрицы без побочной диагонали сверху слева: ${upperLeftHalfWithoutSecondaryDiag}</li>
        <li>Сумма половины матрицы с побочной диагональю сверху слева: ${upperLeftHalfWithSecondaryDiag}</li>
        <li>Сумма половины матрицы без побочной диагонали снизу справа: ${lowerRightHalfWithoutSecondaryDiag}</li>
        <li>Сумма половины матрицы с побочной диагональю снизу справа: ${lowerRightHalfWithSecondaryDiag}</li>
        <li>Сумма строки ${rowNumber + 1}: ${rowSum}</li>
        <li>Сумма столбца ${columnNumber + 1}: ${columnSum}</li>
    </ul>
`;