// referrerId: '추천인 아이디' -- 번역하여 회원가입 템플릿 placeholder에 적용
// login.findAccount.paragraph 문장 분할
// lobby.header.webcomeUser 문장 분할

const languagePack = {
  ko: {
    login: {
      findAccount: {
        button: {
          findAccount: "아이디찾기",
          confirm: "확인"
        },
        paragraph: "000 님의 아이디는\n\nTEST 입니다."
      },
      signUp: {
        button: {
          signUp: "가입하기",
          confirm: "확인"
        },
        paragraph: "축하합니다. 회원가입이 정상적으로 되었습니다.",
        alert: {
          idLength: "아이디를 네 자 이상 입력해주세요.",
          pwLength: "비밀번호를 네 자 이상 입력해주세요.",
          pwCheck: "비밀번호가 일치하지않습니다.",
          phCheck: "올바른 전화번호를 입력해주세요.",
          noInputReferrer: "추천인 아이디를 입력해주세요.",
          default: "알수없는 오류입니다."
        }
      },
      button: {
        login: "로그인",
        signUp: "회원가입",
        findAccount: "계정찾기"
      },
      download: {
        pc: "PC버전",
        mobile: "모바일버전",
        guide: "가이드"
      },
      alert: {
        noUser: "존재하지 않는 사용자입니다.",
        pwWrong: "비밀번호가 일치하지않습니다.",
        connectError: "접속불가 상태입니다.",
        doubleConnect: "중복접속 상태입니다.",
        memory: "메모리에 이미 접속상태입니다.",
        connectErrorDB: "통신이 원활하지 않아 잠시후에 다시 시도해주세요.(DB)",
        failedFindAccount: "계정을 찾을수 없습니다.",
        idLength: "아이디를 네 자 이상 입력해주세요.",
        pwLength: "비밀번호를 네 자 이상 입력해주세요.",
        noReferrer: "추천인 아이디가 존재하지않습니다.",
        existId: "이미 사용하고 있는 아이디입니다.",
        existPh: "이미 사용하고 있는 전화번호입니다.",
        default: "알수없는 오류입니다."
      }
    },
    lobby: {
      header: {
        chargeApply: "충전신청",
        exchangeApply: "환전신청",
        changeInfo: "정보수정",
        logout: "로그아웃",
        welcomeUser: "TEST01님 반갑습니다."
      },
      charge: {
        headLine: "충전",
        chargeApply: "충전신청",
        chargeList: "충전내역",
        coinType: {
          copy: "복사",
          wallet: "지갑주소",
          quantity: "수량",
          applyCharge: "충전신청",
          cancel: "취소",
          alert: {
            errorQRCode: "QR코드 생성에 실패하였습니다.",
            copyWallet: "지갑주소가 복사되었습니다.",
            errorChargeQuantity: "올바른 수량을 입력해주세요."
          }
        },
        accountType: {
          user: "예금주",
          account: "계좌",
          money: "금액",
          chargeApply: "충전신청",
          cancel: "취소",
          alert: {
            errorChargeMoney: "올바른 금액을 입력해주세요.",
            errorChargeInput: "모든 값을 입력해주세요."
          }
        },
        listType: {
          wait: "대기",
          completion: "완료",
          hold: "보류",
          applyMoney: "신청금액",
          accountInfo: "계좌정보",
          applyInfo: "신청정보",
          result: "신청/처리",
          state: "진행상태"
        }
      },
      exchange: {
        headLine: "환전",
        exchangeApply: "환전신청",
        exchangeList: "환전내역",
        coinType: {
          withdrawable: "출금가능금액",
          coinName: "코인명",
          wallet: "지갑주소",
          money: "금액",
          applyExchange: "충전신청",
          cancel: "취소",
          alert: {
            errorExchangeInput: "모든 값을 입력해주세요.",
            errorExchangeMoney: "올바른 금액을 입력해주세요."
          }
        },
        accountType: {
          withdrawable: "출금가능금액",
          user: "예금주",
          account: "계좌",
          money: "금액",
          exchangeApply: "환전신청",
          cancel: "취소",
          alert: {
            errorExchangeMoney: "올바른 금액을 입력해주세요.",
            errorExchangeInput: "모든 값을 입력해주세요."
          }
        },
        listType: {
          wait: "대기",
          completion: "완료",
          hold: "보류",
          applyMoney: "신청금액",
          accountInfo: "계좌정보",
          applyInfo: "신청정보",
          result: "신청/처리",
          state: "진행상태"
        }
      },
      infoChange: {
        headLine: "정보수정",
        content: {
          currentPw: "현재 비밀번호",
          changePw: "변경할 비밀번호",
          checkPw: "변경할 비밀번호 확인",
          tel: "전화번호",
          account: "계좌정보",
          coin: "코인정보",
          changeInfo: "정보수정",
          cancel: "취소",
          alert: {
            errorChangePw: "변경할 비밀번호를 확인해주세요.",
            errorCurrentPw: "현재 비밀번호를 확인해주세요.",
            errorPwLength: "비밀번호는 네 글자 이상 입력해주세요."
          }
        }
      },
      gameSelectBox: {
        powerBall: "복권",
        worldBall3: "월드로또3분",
        worldBall5: "월드로또5분",
        zombieDrop: "낙하",
        zombieBreak: "격파",
        rsp: "가위바위보"
      },
      alert: {
        sysEnvChange:
          "환경설정이 변경되었습니다.\n정확한 값을 적용받기위하여 다시 로그인하여 주세요.",
        receiveMoney: "관리자로부터 보유머니를 충전받았습니다.",
        chargeSuccess: "충전되었습니다",
        exchangeFailed: "환전신청이 취소되었습니다.",
        loginCheckFail: "기간이 만료된 세션입니다.",
        connectErrorDB: "통신이 원활하지 않아 잠시후에 다시 시도해주세요.(DB)",
        failEnterLobby: "로비 진입에 실패하였습니다.",
        failGetCompanyAccount: "계좌 정보를 받아오지 못했습니다.",
        successChargeExchangeApply: "신청이 완료되었습니다.",
        errorChargeExchangeOne: "로비에서만 신청이 가능합니다.",
        errorChargeExchangeTwo: "올바르지 않은 금액입니다.",
        errorChargeExchangeThree: "환전 금액이 부족합니다.",
        errorAppliedChargeExchange: "이미 충전이 신청된 상태입니다.",
        errorChargeExchangeDB:
          "통신이 원활하지 않아 잠시후에 다시 시도해주세요.(DB)",
        successChangeUserInfo: "정보수정이 완료되었습니다.",
        errorChangeUserInfoOne: "비밀번호가 다릅니다.",
        errorChangeUserInfoTwo: "비밀번호는 4글자 이상입니다.",
        default: "알수없는 오류입니다."
      }
    },
    game: {
      breakGame: {
        tableTh: ["왼쪽", "오른쪽"]
      },
      dhlottery: {
        tableTh: ["일반볼", "파워볼"]
      },
      dropGame: {
        tableTh: ["일반볼", "좀비볼"]
      },
      rspGame: {
        tableTh: ["왼쪽", "오른쪽"]
      },
      worldBetting: {
        tableTh: ["일반볼", "파워볼"]
      },
      header: {
        logout: "로그아웃",
        lobby: "로비",
        bettingList: "베팅내역",
        gameResult: "게임결과"
      },
      bettingResult: {
        round: "회차",
        resultTitle: "결과",
        date: "베팅일시",
        type: "베팅타입",
        money: "베팅금액",
        result: "결과"
      },
      betResult: ["대기", "취소", "특례"],
      gameResult: {
        round: "회차",
        result: "결과"
      },
      alert: {
        sysEnvChange: "시스템 환경이 변경되어 로그인 화면으로 이동합니다.",
        adminGiveMoney: "관리자로부터 보유머니를 충전받았습니다.",
        chargeExchangeResult: ["충전되었습니다.", "환전신청이 취소되었습니다."],
        errorCommission: "전환할 수수료가 없습니다.",
        sessionEnd: "기간이 만료된 세션입니다.",
        errorConnectDB: "통신이 원활하지 않아 잠시후에 다시 시도해주세요(DB)",
        errorEnterGame: "게임 진입에 실패하였습니다.",
        errorGameCountUpdate: "게임 시간 동기화에 실패하였습니다.",
        errorGameRoundUpdate: "게임 회차 최신화에 실패하였습니다.",
        errorTooMuchBet: "베팅 금액이 너무 큽니다.",
        errorSelectGame: "게임을 선택해주세요.",
        errorInputMoney: "베팅 금액을 입력해주세요.",
        errorImpossibleBetTime: "베팅 가능 시간이 아닙니다.",
        errorImpossibleBetMoney: "베팅 가능 금액이 아닙니다.",
        errorBetType: "베팅타입이 올바르지 않습니다.",
        errorBetTime: "베팅시간이 아닙니다.",
        errorBetGameMoney: "게임머니가 부족합니다.",
        errorBetLimit: "베팅한도를 넘어섰습니다.",
        errorBetPrevRound: "전 회차의 결과를 처리하지 못하였습니다.",
        errorBetBalance: "베팅금액 가능한 밸런스금액 한도를 초과하였습니다.",
        errorFailedBet: "베팅에 실패하였습니다.",
        errorBetMultiBlock: "멀티베팅을 할 수 없습니다.",
        default: "알수없는 오류입니다."
      }
    }
  }
};

export default languagePack;
