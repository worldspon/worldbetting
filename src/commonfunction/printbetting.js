import PromiseModule from '../config/promise';
import searchBettingType from '../commonfunction/searchbettingtype';
import searchAllocation from '../commonfunction/searchallocation';

function printReceipt(round, userId, gameTitle, gameType, bettingType, money, allocation) {
    const bettingTypeObject = searchBettingType(bettingType, gameType);
    const allocationNum = searchAllocation(gameType, bettingType, allocation);
    const printObject = `{
        "mode": 0,
        "functions": {
            "func0": {"checkPrinterStatus": []},
            "func2":{"printText":["${round} 회차\n", 0, 0, true, false, false, 1, 0]},
            "func3":{"printText":["ID : ${userId}\n", 0, 0, false, false, false, 0, 0]},
            "func4":{"printText":["GAME : ${gameTitle}\n", 0, 0, false, false, false, 0, 0]},
            "func5":{"printText":["TYPE : (${bettingTypeObject.headType})${bettingTypeObject.bettingType}\n", 0, 0, false, false, false, 0, 0]},
            "func6":{"printText":["MONEY : ${new Intl.NumberFormat().format(money)}\n", 0, 0, false, false, false, 0, 0]},
            "func7":{"printText":["RESULT : ${new Intl.NumberFormat().format(Math.round(money * allocationNum))}\n", 0, 0, false, false, false, 0, 0]},
            "func14":{"printText":["\n", 0, 0, false, false, false, 0, 0]},
            "func15":{"cutPaper":[65]},
            "func16":{"openDrawer":[0]},
            "func17":{"checkPrinterStatus":[]}

        }
    }`;

    xmlhttpPost(printObject);

    return true;
}

async function xmlhttpPost(printObject) {

    const URL = 'http://127.0.0.1:8080/webdriver/Printer1';
    
    // // Chrome/Mozilla/Safari, IE7 or later
    // if (window.XMLHttpRequest) {
    //     xmlHttpReq = new XMLHttpRequest();
    // }
    // // IE6 or older version
    // else if (window.ActiveXObject) {
    //     xmlHttpReq = new ActiveXObject("Microsoft.XMLHTTP");
    // }

    const result = await PromiseModule.printPost(URL, printObject);
    
    // xmlHttpReq.open('POST', strURL, true);
    // xmlHttpReq.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
    // xmlHttpReq.send(strSubmit);
    
    // xmlHttpReq.onreadystatechange = function() {
    //         if (xmlHttpReq.readyState == 4 && xmlHttpReq.status == 200) {
    //     var res = JSON.parse(xmlHttpReq.responseText);
    //       var reqId = res.RequestID;
    //       var resId = res.ResponseID;
    //       var ret = res.Result;
    //       if(ret.search("ready") >= 0 || ret.search("progress") >= 0)	{
    //           //sleep(1000);
    //           //checkResult(strPrinterName, reqId, resId);
    //       }
    //       else if(ret.search("duplicated") >= 0) {
    //             //p_result.value = res.Result;
    //         }
    //   }
    //   else if (xmlHttpReq.readyState == 4 && xmlHttpReq.status == 404) {
    //          //p_result.value = "No printers";
    //   }	
    //   else if(xmlHttpReq.readyState == 4) {
    //              //p_result.value = "can’t connect to server";
    //   }
    // }
}

export { printReceipt };