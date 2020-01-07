export default function searchGameType(gameType) {
    const typeObject = {};

    if(gameType <= 8) {
        typeObject.ballType = '파워볼'
        switch (gameType) {
            case 1:
                typeObject.gameType = '홀'
                break;
            case 2:
                typeObject.gameType = '짝'
                break;
            case 3:
                typeObject.gameType = '언더'
                break;
            case 4:
                typeObject.gameType = '오버'
                break;
            case 5:
                typeObject.gameType = '홀+언더'
                break;
            case 6:
                typeObject.gameType = '짝+언더'
                break;
            case 7:
                typeObject.gameType = '홀+오버'
                break;
            case 8:
                typeObject.gameType = '짝+오버'
                break;
            default:
                break;
        }
    } else if(gameType >= 11) {
        typeObject.ballType = '일반볼'
        switch (gameType) {
            case 11:
                typeObject.gameType = '홀'
                break;
            case 12:
                typeObject.gameType = '짝'
                break;
            case 13:
                typeObject.gameType = '언더'
                break;
            case 14:
                typeObject.gameType = '오버'
                break;
            case 15:
                typeObject.gameType = '홀+언더'
                break;
            case 16:
                typeObject.gameType = '짝+언더'
                break;
            case 17:
                typeObject.gameType = '홀+오버'
                break;
            case 18:
                typeObject.gameType = '짝+오버'
                break;
            case 21:
                typeObject.gameType = '대'
                break;
            case 22:
                typeObject.gameType = '중'
                break;
            case 23:
                typeObject.gameType = '소'
                break;
            case 24:
                typeObject.gameType = '홀+대'
                break;
            case 25:
                typeObject.gameType = '홀+중'
                break;
            case 26:
                typeObject.gameType = '홀+소'
                break;
            case 27:
                typeObject.gameType = '짝+대'
                break;
            case 28:
                typeObject.gameType = '짝+중'
                break;
            case 29:
                typeObject.gameType = '짝+소'
                break;
            default:
                break;
        }
    }
    return typeObject;
}