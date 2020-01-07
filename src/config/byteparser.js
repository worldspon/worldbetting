function encodeUTF8(stringArray) {
    const byteArray = [];
    for(const str of stringArray) {
        byteArray.push(str.charCodeAt());
    }

    return byteArray;
}

// 문자열을 UTF-16 으로 인코딩 
function encodeUTF16(stringArray) {
    const byteArray = [];
    for(const str of stringArray) {
        let binary = '0000000000000000' + str.charCodeAt().toString(2);
        binary = binary.slice(binary.length-16);
        byteArray.push(
            // TCP 통신시 UTF-16 byte 배열을 뒤집어서 보냄
            parseInt(binary.slice(8), 2),
            parseInt(binary.slice(0, 8), 2)
        );
    }

    return byteArray;
}

function decodeUTF8(byteArray) {
    return String.fromCharCode(...byteArray);
}

// 2byte로 나눠진 유니코드를 하나의 이진수로 변환하여 디코딩
function decodeUTF16(byteArray) {
    let str = '';
    for(let i = 0; i < byteArray.length / 2; i++) {
        let firstBin = '00000000' + byteArray[i * 2].toString(2);
        firstBin = firstBin.slice(firstBin.length-8);
        let lastBin = '00000000' + byteArray[i * 2 + 1].toString(2);
        lastBin = lastBin.slice(lastBin.length-8);
        // 서버에서 전송될때 문자열이 뒤집혀서 오기 때문에 뒤집어서 파싱
        const bin = lastBin + firstBin;
        str += String.fromCharCode(parseInt(bin, 2));
    }

    return str;
}

function checkTcpData(tcpData, temp = []) {
    const endIndex = findEndIndex(tcpData);
    let byteArray = [];
    // end point가 배열의 끝이 아닌경우
    if(endIndex < tcpData.length-1) {
        byteArray = temp;
        byteArray.push(tcpData.slice(0, endIndex + 1));
        checkTcpData(tcpData.slice(endIndex + 1), byteArray);
    } else {
        byteArray = temp;
        byteArray.push(tcpData.slice(0, endIndex + 1));
        return byteArray;
    }

    return byteArray;
}

function findEndIndex(tcpData, findStartIndex = 0) {
    // 통신의 마지막 문자 <End> 중 >를 찾음
    const endIndex = tcpData.indexOf(62, findStartIndex);
    if(
        tcpData[endIndex-4] === 60 &&
        tcpData[endIndex-3] === 69 &&
        tcpData[endIndex-2] === 110 &&
        tcpData[endIndex-1] === 100
    ) {
        return endIndex;
    // 리스트가 끝나지 않고 연달아 오는 경우 배열을 전부 리턴함(구조체)
    } else if(endIndex === -1) {
        return tcpData.length-1;
    } else {
        return findEndIndex(tcpData, endIndex + 1);
    }
}

function parseCompanyCoinStruct(byteArray) {
    // 코인명 : char[20], 지갑주소 : char[100]
    // UTF16으로 디코딩 하기 때문에 X 2
    // 1 Object Size = 240 byte
    const objectSize = 240;
    const coinArray = [];
    // null check
    const regEx = /\u0000/gi;
    for(let i = 0; i < byteArray.length / objectSize; i++) {
        coinArray.push({
            coinName: decodeUTF16(byteArray.slice(i*objectSize, i*objectSize+20)).replace(regEx, ''),
            coinWallet: decodeUTF16(byteArray.slice(i*objectSize+20, i*objectSize+objectSize)).replace(regEx, '')
        });
    }

    return coinArray;
}

// byte array를 2진수로 변환 후 int num으로 바꾸는 함수
function byteToIntNum(byteArray) {
    let returnNumber = '';
    // server-client 간 byte 통신시 byte array가 뒤집혀서 오기 때문에 reverse 해준다.
    for(let byte of byteArray.reverse()) {
        // 8비트 채움
        const binary = '00000000' + byte.toString(2);
        returnNumber = returnNumber + binary.slice(binary.length-8);
    }

    return parseInt(returnNumber, 2);
}

// float binary array를 float 타입배열에 저장 후 float num으로 바꾸는 함수
function byteToFloatNum(byteArray) {
    const uintArray = new Uint8Array(byteArray);
    // float num을 float 2진 배열로 바꾸는 경우(위와 반대의 경우)
    // new Float64Array([2.7]).buffer -> Uint8Array 객체에 저장하여 송신
    return new Float64Array(uintArray.buffer)[0];
}

// 충,환전 리스트 구조체를 파싱하는 함수
function parseChargeExchangeList(byteArray) {
    // 글번호 : long[8], 유저유니크 : long[8],
    // 신청일자 : char[25], 처리일자 : char[25],
    // 포인트 : long[8], 코인 : double[8], 진행상태 : byte[1]
    // 은행명 : char[20], 계좌번호 : char[100], 예금주 : char[20]
    // char는 UTF16 형식으로 오기 때문에 X2
    // 1 Object Size = 413 byte

    const objectSize = 413;
    const listArray = [];
    const regEx = /\u0000/gi;
    for(let i = 0; i < byteArray.length / objectSize; i++) {
        listArray.push({
            listUnique: byteToIntNum(byteArray.slice(i*objectSize, i*objectSize+8)),
            userUnique: byteToIntNum(byteArray.slice(i*objectSize+8, i*objectSize+16)),
            applyDate: decodeUTF16(byteArray.slice(i*objectSize+16, i*objectSize+66)).replace(regEx, ''),
            handleDate: decodeUTF16(byteArray.slice(i*objectSize+66, i*objectSize+116)).replace(regEx, ''),
            userPoint: byteToIntNum(byteArray.slice(i*objectSize+116, i*objectSize+124)),
            userCoin: byteToFloatNum(byteArray.slice(i*objectSize+124, i*objectSize+132)),
            applyState: parseInt(byteArray.slice(i*objectSize+132, i*objectSize+133)),
            userBank: decodeUTF16(byteArray.slice(i*objectSize+133, i*objectSize+173)).replace(regEx, ''),
            userAccount: decodeUTF16(byteArray.slice(i*objectSize+173, i*objectSize+373)).replace(regEx, ''),
            accountName:decodeUTF16(byteArray.slice(i*objectSize+373, i*objectSize+413)).replace(regEx, '')
        })
    }
    return listArray;
}

// 현재 게임 베팅 리스트 구조체를 파싱하는 함수
function parseBettingList(byteArray) {
    const objectSize = 17;
    const listArray = [];
    for(let i = 0; i < byteArray.length / objectSize; i++) {
        listArray.push({
            listUnique: byteToFloatNum(byteArray.slice(i*objectSize, i*objectSize+8)),
            bettingType: parseInt(byteArray.slice(i*objectSize+8, i*objectSize+9)),
            bettingMoney: byteToIntNum(byteArray.slice(i*objectSize+9, i*objectSize+17))
        })
    }
    return listArray;
}

function parsePrevGameResult(byteArray, gameType) {
    if(gameType <= 4) {
        const resultObject = {
            gameRound: byteToIntNum(byteArray.slice(0, 8)),
            ballOne: byteToIntNum(byteArray.slice(8, 9)),
            ballTwo: byteToIntNum(byteArray.slice(9, 10)),
            ballThree: byteToIntNum(byteArray.slice(10, 11)),
            ballFour: byteToIntNum(byteArray.slice(11, 12)),
            ballFive: byteToIntNum(byteArray.slice(12, 13)),
            powerBall: byteToIntNum(byteArray.slice(13, 14)),
        }
        return resultObject;
    } else {
        const resultObject = {
            gameRound: byteToIntNum(byteArray.slice(0, 8)),
            leftResult: byteToIntNum(byteArray.slice(8, 9)),
            rightResult: byteToIntNum(byteArray.slice(9, 10)),
        }
        return resultObject;
    }
}

export {
    encodeUTF8,
    encodeUTF16,
    decodeUTF8,
    decodeUTF16,
    checkTcpData,
    parseCompanyCoinStruct,
    parseChargeExchangeList,
    parseBettingList,
    parsePrevGameResult
}