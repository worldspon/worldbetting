export default function searchBettingType(bettingType, gameType) {
    const typeObject = {};

    if(gameType <= 4) {
        if(bettingType <= 8) {
            gameType <= 3 ? typeObject.headType = '파워' : typeObject.headType = '좀비';
            switch (bettingType) {
                case 1:
                    typeObject.bettingType = '홀';
                    break;
                case 2:
                    typeObject.bettingType = '짝';
                    break;
                case 3:
                    typeObject.bettingType = '언더';
                    break;
                case 4:
                    typeObject.bettingType = '오버';
                    break;
                case 5:
                    typeObject.bettingType = '홀+언더';
                    break;
                case 6:
                    typeObject.bettingType = '짝+언더';
                    break;
                case 7:
                    typeObject.bettingType = '홀+오버';
                    break;
                case 8:
                    typeObject.bettingType = '짝+오버';
                    break;
                default:
                    break;
            }
        } else if(bettingType >= 11) {
            typeObject.headType = '일반';
            switch (bettingType) {
                case 11:
                    typeObject.bettingType = '홀';
                    break;
                case 12:
                    typeObject.bettingType = '짝';
                    break;
                case 13:
                    typeObject.bettingType = '언더';
                    break;
                case 14:
                    typeObject.bettingType = '오버';
                    break;
                case 15:
                    typeObject.bettingType = '홀+언더';
                    break;
                case 16:
                    typeObject.bettingType = '짝+언더';
                    break;
                case 17:
                    typeObject.bettingType = '홀+오버';
                    break;
                case 18:
                    typeObject.bettingType = '짝+오버';
                    break;
                case 21:
                    typeObject.bettingType = '대';
                    break;
                case 22:
                    typeObject.bettingType = '중';
                    break;
                case 23:
                    typeObject.bettingType = '소';
                    break;
                case 24:
                    typeObject.bettingType = '홀+대';
                    break;
                case 25:
                    typeObject.bettingType = '홀+중';
                    break;
                case 26:
                    typeObject.bettingType = '홀+소';
                    break;
                case 27:
                    typeObject.bettingType = '짝+대';
                    break;
                case 28:
                    typeObject.bettingType = '짝+중';
                    break;
                case 29:
                    typeObject.bettingType = '짝+소';
                    break;
                default:
                    break;
            }
        }
    } else if(gameType == 5) {
        if(bettingType <= 4) {
            typeObject.headType = '총격파수';
            switch (bettingType) {
                case 1:
                    typeObject.bettingType = '홀';
                    break;
                case 2:
                    typeObject.bettingType = '짝';
                    break;
                case 3:
                    typeObject.bettingType = '언더';
                    break;
                case 4:
                    typeObject.bettingType = '오버';
                    break;
                default:
                    break;
            }
        } else if(bettingType <= 18) {
            switch (bettingType) {
                case 11:
                    typeObject.headType = '왼쪽';
                    typeObject.bettingType = '홀';
                    break;
                case 12:
                    typeObject.headType = '오른쪽';
                    typeObject.bettingType = '홀';
                    break;
                case 13:
                    typeObject.headType = '왼쪽';
                    typeObject.bettingType = '짝';
                    break;
                case 14:
                    typeObject.headType = '오른쪽';
                    typeObject.bettingType = '짝';
                    break;
                case 15:
                    typeObject.headType = '왼쪽';
                    typeObject.bettingType = '언더';
                    break;
                case 16:
                    typeObject.headType = '오른쪽';
                    typeObject.bettingType = '언더';
                    break;
                case 17:
                    typeObject.headType = '왼쪽';
                    typeObject.bettingType = '오버';
                    break;
                case 18:
                    typeObject.headType = '오른쪽';
                    typeObject.bettingType = '오버';
                    break;
                default:
                    break;
            }
        } else {
            switch (bettingType) {
                case 21:
                    typeObject.headType = '승패결과';
                    typeObject.bettingType = '왼쪽';
                    break;
                case 22:
                    typeObject.headType = '승패결과';
                    typeObject.bettingType = '비김';
                    break;
                case 23:
                    typeObject.headType = '승패결과';
                    typeObject.bettingType = '오른쪽';
                    break;
                case 24:
                    typeObject.headType = '승패결과';
                    typeObject.bettingType = '언더+왼쪽';
                    break;
                case 25:
                    typeObject.headType = '승패결과';
                    typeObject.bettingType = '언더+비김';
                    break;
                case 26:
                    typeObject.headType = '승패결과';
                    typeObject.bettingType = '언더+오른쪽';
                    break;
                case 27:
                    typeObject.headType = '승패결과';
                    typeObject.bettingType = '오버+왼쪽';
                    break;
                case 28:
                    typeObject.headType = '승패결과';
                    typeObject.bettingType = '오버+비김';
                    break;
                case 29:
                    typeObject.headType = '승패결과';
                    typeObject.bettingType = '오버+오른쪽';
                    break;
                default:
                    break;
            }
        }
    } else {
        if(bettingType <= 3) {
            typeObject.headType = '승패결과';
            switch (bettingType) {
                case 1:
                    typeObject.bettingType = '왼쪽';
                    break;
                case 2:
                    typeObject.bettingType = '비김';
                    break;
                case 3:
                    typeObject.bettingType = '오른쪽';
                    break;
                default:
                    break;
            }
        } else if(bettingType <= 16) {
            switch (bettingType) {
                case 11:
                    typeObject.headType = '왼쪽';
                    typeObject.bettingType = '가위';
                    break;
                case 12:
                    typeObject.headType = '오른쪽';
                    typeObject.bettingType = '가위';
                    break;
                case 13:
                    typeObject.headType = '왼쪽';
                    typeObject.bettingType = '바위';
                    break;
                case 14:
                    typeObject.headType = '오른쪽';
                    typeObject.bettingType = '바위';
                    break;
                case 15:
                    typeObject.headType = '왼쪽';
                    typeObject.bettingType = '보';
                    break;
                case 16:
                    typeObject.headType = '오른쪽';
                    typeObject.bettingType = '보';
                    break;
                default:
                    break;
            }
        } else {
            typeObject.headType = '승패조합';
            switch (bettingType) {
                case 21:
                    typeObject.bettingType = '가위+왼쪽';
                    break;
                case 22:
                    typeObject.bettingType = '가위+비김';
                    break;
                case 23:
                    typeObject.bettingType = '가위+오른쪽';
                    break;
                case 24:
                    typeObject.bettingType = '바위+왼쪽';
                    break;
                case 25:
                    typeObject.bettingType = '바위+비김';
                    break;
                case 26:
                    typeObject.bettingType = '바위+오른쪽';
                    break;
                case 27:
                    typeObject.bettingType = '보+왼쪽';
                    break;
                case 28:
                    typeObject.bettingType = '보+비김';
                    break;
                case 29:
                    typeObject.bettingType = '보+오른쪽';
                    break;
                default:
                    break;
            }
        }
    }
    return typeObject;
}