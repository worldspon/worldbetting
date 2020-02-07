export default function searchAllocation(
  gameType,
  bettingType,
  allocationPool
) {
  // 동행, 월드, 낙하
  if (gameType <= 4) {
    if (bettingType >= 1 && bettingType <= 2) {
      return allocationPool[0];
    } else if (bettingType >= 3 && bettingType <= 4) {
      return allocationPool[1];
    } else if (bettingType === 5) {
      return allocationPool[2];
    } else if (bettingType === 6) {
      return allocationPool[10];
    } else if (bettingType === 7) {
      return allocationPool[11];
    } else if (bettingType === 8) {
      return allocationPool[12];
    } else if (bettingType >= 11 && bettingType <= 12) {
      return allocationPool[3];
    } else if (bettingType >= 13 && bettingType <= 14) {
      return allocationPool[4];
    } else if (bettingType >= 15 && bettingType <= 18) {
      return allocationPool[5];
    } else if (bettingType >= 21 && bettingType <= 22) {
      return allocationPool[6];
    } else if (bettingType == 23) {
      return allocationPool[7];
    } else if (
      (bettingType >= 24 && bettingType <= 25) ||
      (bettingType >= 27 && bettingType <= 28)
    ) {
      return allocationPool[8];
    } else if (bettingType == 26 || bettingType == 29) {
      return allocationPool[9];
    }
    // 격파
  } else if (gameType == 5) {
    if (bettingType == 21 || bettingType == 23) {
      return allocationPool[0];
    } else if (bettingType == 22) {
      return allocationPool[1];
    } else if (bettingType == 11 || bettingType == 13) {
      return allocationPool[2];
    } else if (bettingType == 15 || bettingType == 17) {
      return allocationPool[3];
    } else if (bettingType == 12 || bettingType == 14) {
      return allocationPool[4];
    } else if (bettingType == 16 || bettingType == 18) {
      return allocationPool[5];
    } else {
      return allocationPool[6];
    }
    // 가위바위보
  } else if (gameType == 6) {
    if (bettingType <= 3) {
      return allocationPool[0];
    } else if (bettingType == 11 || bettingType == 13 || bettingType == 15) {
      return allocationPool[1];
    } else if (bettingType == 12 || bettingType == 14 || bettingType == 16) {
      return allocationPool[2];
    } else {
      return allocationPool[3];
    }
  }
}
