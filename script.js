class LottoFilter {
    constructor() {
        this.MIN_SUM = 96;
        this.MAX_SUM = 175;
        this.VALID_AC = new Set([8, 9, 10]);
        // Invalid Ratios (Odd:Even or Low:High)
        // 0:6, 6:0, 1:5, 5:1 are invalid
        this.INVALID_RATIOS = new Set(["0,6", "6,0", "1,5", "5,1"]);

        this.VALID_MULTIPLES_COUNT = new Set([1, 2, 3, 4]);
        this.VALID_PRIMES_COUNT = new Set([1, 2, 3, 4]);
        this.PRIMES = new Set([2, 3, 5, 7, 11, 13, 17, 19, 23, 29, 31, 37, 41, 43]);
    }

    checkAll(numbers) {
        if (numbers.length !== 6) return { valid: false, reason: "6개의 숫자가 아닙니다." };
        numbers.sort((a, b) => a - b);

        if (!this.checkSum(numbers)) return { valid: false, reason: `총합 범위(96~175) 벗어남: ${this.calculateSum(numbers)}` };
        if (!this.checkAC(numbers)) return { valid: false, reason: `AC값(8,9,10) 아님: ${this.calculateAC(numbers)}` };
        if (!this.checkOddEven(numbers)) {
            const [o, e] = this.calculateOddEven(numbers);
            return { valid: false, reason: `홀짝 비율 ${o}:${e} (허용: 2:4, 3:3, 4:2)` };
        }
        if (!this.checkLowHigh(numbers)) {
            const [l, h] = this.calculateLowHigh(numbers);
            return { valid: false, reason: `저고 비율 ${l}:${h} (허용: 2:4, 3:3, 4:2)` };
        }
        if (!this.checkMultiples(numbers, 3)) return { valid: false, reason: `3의 배수 개수 부적합: ${this.countMultiples(numbers, 3)}개` };
        if (!this.checkMultiples(numbers, 4)) return { valid: false, reason: `4의 배수 개수 부적합: ${this.countMultiples(numbers, 4)}개` };
        if (!this.checkMultiples(numbers, 5)) return { valid: false, reason: `5의 배수 개수 부적합: ${this.countMultiples(numbers, 5)}개` };
        if (!this.checkPrimes(numbers)) return { valid: false, reason: `소수 개수 부적합: ${this.countPrimes(numbers)}개` };
        if (!this.checkConsecutive(numbers)) return { valid: false, reason: "과도한 연번이 포함됨" };

        return { valid: true, reason: "Pass" };
    }

    calculateSum(numbers) {
        return numbers.reduce((a, b) => a + b, 0);
    }

    checkSum(numbers) {
        const s = this.calculateSum(numbers);
        return s >= this.MIN_SUM && s <= this.MAX_SUM;
    }

    calculateAC(numbers) {
        const diffs = new Set();
        for (let i = 0; i < numbers.length; i++) {
            for (let j = i + 1; j < numbers.length; j++) {
                diffs.add(numbers[j] - numbers[i]);
            }
        }
        return diffs.size - (6 - 1);
    }

    checkAC(numbers) {
        return this.VALID_AC.has(this.calculateAC(numbers));
    }

    calculateOddEven(numbers) {
        const odd = numbers.filter(n => n % 2 !== 0).length;
        const even = 6 - odd;
        return [odd, even];
    }

    checkOddEven(numbers) {
        const [o, e] = this.calculateOddEven(numbers);
        return !this.INVALID_RATIOS.has(`${o},${e}`);
    }

    calculateLowHigh(numbers) {
        // Low: 1-23, High: 24-45
        const low = numbers.filter(n => n <= 23).length;
        const high = 6 - low;
        return [low, high];
    }

    checkLowHigh(numbers) {
        const [l, h] = this.calculateLowHigh(numbers);
        return !this.INVALID_RATIOS.has(`${l},${h}`);
    }

    countMultiples(numbers, divisor) {
        return numbers.filter(n => n % divisor === 0).length;
    }

    checkMultiples(numbers, divisor) {
        const count = this.countMultiples(numbers, divisor);
        return this.VALID_MULTIPLES_COUNT.has(count);
    }

    countPrimes(numbers) {
        return numbers.filter(n => this.PRIMES.has(n)).length;
    }

    checkPrimes(numbers) {
        const count = this.countPrimes(numbers);
        return this.VALID_PRIMES_COUNT.has(count);
    }

    checkConsecutive(numbers) {
        let consecutiveGroups = [];
        let currentGroup = 1;

        for (let i = 0; i < numbers.length - 1; i++) {
            if (numbers[i + 1] === numbers[i] + 1) {
                currentGroup++;
            } else {
                if (currentGroup > 1) consecutiveGroups.push(currentGroup);
                currentGroup = 1;
            }
        }
        if (currentGroup > 1) consecutiveGroups.push(currentGroup);

        if (consecutiveGroups.some(c => c >= 4)) return false; // 4 consecutive

        const threeConsecutiveCount = consecutiveGroups.filter(c => c === 3).length;
        if (threeConsecutiveCount >= 2) return false; // Two sets of 3 consecutive

        return true;
    }
}

// UI Logic
const analyzer = new LottoFilter();

document.getElementById('gen-btn').addEventListener('click', () => {
    let numbers = [];
    let valid = false;
    let attempts = 0;

    // Safety break
    while (!valid && attempts < 100000) {
        attempts++;
        numbers = [];
        const pool = Array.from({ length: 45 }, (_, i) => i + 1);
        for (let i = 0; i < 6; i++) {
            const idx = Math.floor(Math.random() * pool.length);
            numbers.push(pool[idx]);
            pool.splice(idx, 1);
        }
        numbers.sort((a, b) => a - b);
        if (analyzer.checkAll(numbers).valid) {
            valid = true;
        }
    }

    if (valid) {
        displayGenerated(numbers);
    } else {
        alert("번호 생성 실패 (너무 엄격한 조건)");
    }
});

function displayGenerated(numbers) {
    const container = document.getElementById('generated-balls');
    container.innerHTML = '';

    numbers.forEach((num, index) => {
        const ball = createBall(num, index);
        container.appendChild(ball);
    });

    document.getElementById('gen-result').classList.remove('hidden');
}

function createBall(num, index = 0, size = "normal") {
    const ball = document.createElement('div');
    ball.textContent = num;
    ball.className = `ball ${size}`;

    if (num <= 10) ball.classList.add('range-1-10');
    else if (num <= 20) ball.classList.add('range-11-20');
    else if (num <= 30) ball.classList.add('range-21-30');
    else if (num <= 40) ball.classList.add('range-31-40');
    else ball.classList.add('range-41-45');

    // Staggered Animation Delay
    if (size !== "small") {
        ball.style.animationDelay = `${index * 0.1}s`;
    }

    return ball;
}

// Recent Data Feature
document.addEventListener('DOMContentLoaded', () => {
    fetchRecentLottoData();
});

async function fetchRecentLottoData() {
    const spinner = document.getElementById('loading-spinner');
    const container = document.getElementById('recent-history');

    // Calculate Latest Draw No (Approx)
    // 1st Draw: 2002-12-07
    const firstDate = new Date('2002-12-07');
    const now = new Date();
    const diffTime = Math.abs(now - firstDate);
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    let latestDrwNo = Math.floor(diffDays / 7) + 1;

    // Fetch last 10 rounds
    let historyHtml = '';
    let count = 0;

    // Try to fetch starting from calculate drwNo, if fail (future date), decrease
    // For safety, let's fetch in parallel but we need sequential display.
    // We will loop backwards.

    try {
        for (let i = 0; i < 10; i++) {
            const drwNo = latestDrwNo - i;
            const data = await getLottoData(drwNo);

            if (data && data.returnValue === 'success') {
                historyHtml += createHistoryItem(data);
                count++;
            } else {
                // If fetching failed (maybe future round not yet drawn), try previous one
                // But we just skip for now or adjust latestDrwNo if the first one fails
                if (i === 0 && (!data || data.returnValue === 'fail')) {
                    latestDrwNo--; // Adjust if we predicted a future round
                    i--; // Retry this loop index
                    continue;
                }
            }
        }

        if (count > 0) {
            spinner.classList.add('hidden');
            container.innerHTML = historyHtml;
            container.classList.remove('hidden');
        } else {
            spinner.textContent = "데이터를 불러올 수 없습니다.";
        }
    } catch (e) {
        console.error(e);
        spinner.textContent = "오류 발생: 잠시 후 다시 시도해주세요.";
    }
}

async function getLottoData(drwNo) {
    // Using allorigins proxy to bypass CORS
    const url = `https://www.dhlottery.co.kr/common.do?method=getLottoNumber&drwNo=${drwNo}`;
    const proxyUrl = `https://api.allorigins.win/raw?url=${encodeURIComponent(url)}`;

    try {
        const response = await fetch(proxyUrl);
        return await response.json();
    } catch (error) {
        console.error("Fetch error:", error);
        return null;
    }
}

function createHistoryItem(data) {
    const prize = new Intl.NumberFormat('ko-KR').format(data.firstWinamnt);
    const date = data.drwNoDate;

    return `
        <div class="history-item">
            <div class="history-header">
                <span class="drw-no">${data.drwNo}회</span>
                <span class="drw-date">${date}</span>
            </div>
            <div class="history-balls">
                <span class="ball small range-${getRange(data.drwtNo1)}">${data.drwtNo1}</span>
                <span class="ball small range-${getRange(data.drwtNo2)}">${data.drwtNo2}</span>
                <span class="ball small range-${getRange(data.drwtNo3)}">${data.drwtNo3}</span>
                <span class="ball small range-${getRange(data.drwtNo4)}">${data.drwtNo4}</span>
                <span class="ball small range-${getRange(data.drwtNo5)}">${data.drwtNo5}</span>
                <span class="ball small range-${getRange(data.drwtNo6)}">${data.drwtNo6}</span>
                <span class="plus">+</span>
                <span class="ball small range-${getRange(data.bnusNo)}">${data.bnusNo}</span>
            </div>
            <div class="history-prize">
                1등: <span class="prize-amount">${prize}원</span>
            </div>
        </div>
    `;
}

function getRange(num) {
    if (num <= 10) return '1-10';
    if (num <= 20) return '11-20';
    if (num <= 30) return '21-30';
    if (num <= 40) return '31-40';
    return '41-45';
}
