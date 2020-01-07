export default function searchAllocation(gameType, bettingType, allocationPoll) {
    // 동행, 월드, 낙하
    if(gameType <= 4) {
        if(bettingType >= 1 && bettingType <= 2) {
            return allocationPoll[0];
        } else if(bettingType >= 3 && bettingType <= 4) {
            return allocationPoll[1];
        } else if(bettingType >= 5 && bettingType <= 8) {
            return allocationPoll[2];
        } else if(bettingType >= 11 && bettingType <= 12) {
            return allocationPoll[3];
        } else if(bettingType >= 13 && bettingType <= 14) {
            return allocationPoll[4];
        } else if(bettingType >= 15 && bettingType <= 18) {
            return allocationPoll[5];
        } else if(bettingType >= 21 && bettingType <= 22) {
            return allocationPoll[6];
        } else if(bettingType == 23) {
            return allocationPoll[7];
        } else if((bettingType >= 24 && bettingType <= 25) || (bettingType >= 27 && bettingType <= 28)) {
            return allocationPoll[8];
        } else if(bettingType == 26 || bettingType == 29) {
            return allocationPoll[9];
        }
    // 격파
    } else if(gameType <= 5) {
        if(bettingType >= 1 && bettingType <= 2) {
            return allocationPoll[0];
        } else if(bettingType >= 3 && bettingType <= 4) {
            return allocationPoll[1];
        } else if(bettingType >= 5 && bettingType <= 8) {
            return allocationPoll[2];
        } else if(bettingType >= 11 && bettingType <= 12) {
            return allocationPoll[3];
        } else if(bettingType >= 13 && bettingType <= 14) {
            return allocationPoll[4];
        } else if(bettingType >= 15 && bettingType <= 18) {
            return allocationPoll[5];
        } else if(bettingType >= 21 && bettingType <= 23) {
            return allocationPoll[6];
        } else if(bettingType >= 24 && bettingType <= 29) {
            return allocationPoll[7];
        }
    // 가위바위보
    } else if(gameType <= 6) {
        if(bettingType >= 1 && bettingType <= 3) {
            return allocationPoll[0];
        } else if(bettingType == 11 || bettingType == 13 || bettingType == 15) {
            return allocationPoll[1];
        } else if(bettingType == 12 || bettingType == 14 || bettingType == 16) {
            return allocationPoll[2];
        } else if(bettingType >= 21 && bettingType <= 29) {
            return allocationPoll[3];
        }
    }

}