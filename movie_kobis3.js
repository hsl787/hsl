
const axios = require('axios');
const { parse } = require('json2csv');
const fs = require('fs');
const { format, addDays, parseISO } = require('date-fns');

// KOBIS Open API를 호출하기 위한 클라이언트 서비스 정의
class KobisOpenAPIRestService {
    constructor(key, host) {
        this.key = key;
        this.host = host || "http://www.kobis.or.kr";
        this.DAILY_BOXOFFICE_URI = "/kobisopenapi/webservice/rest/boxoffice/searchDailyBoxOfficeList";
    }

    async requestGet(serviceURI, paramMap) {
        paramMap.key = this.key;
        try {
            const response = await axios.get(this.host + serviceURI + '.json', { params: paramMap });
            return response.data;
        } catch (error) {
            throw new Error(error.response.data);
        }
    }

    async getDailyBoxOffice(paramMap) {
        return await this.requestGet(this.DAILY_BOXOFFICE_URI, paramMap);
    }
}

// 날짜 범위 설정
const startDate = '20220720';
const endDate = '20230722';

// KOBIS Open API 서비스 객체 생성
const apiKey = "69897250c60e02be49d7b7dc362dc152";
const apiHost = "http://www.kobis.or.kr";
const kobisService = new KobisOpenAPIRestService(apiKey, apiHost);

// CSV 파일에 데이터를 추가하는 함수
function appendDataToCSV(filePath, data) {
    const csv = parse(data);
    fs.appendFileSync(filePath, csv + '\n', 'utf8');
}

// 데이터 조회 및 저장
async function fetchAndSaveBoxOfficeData(startDate, endDate) {
    const filePath = 'dailyBoxOfficeData.csv';

    if (!fs.existsSync(filePath)) {
        fs.writeFileSync(filePath, 'date,rank,movieNm,audiAcc\n', 'utf8'); // 헤더 설정
    }

    let currentDate = parseISO(startDate);
    const endDateObj = parseISO(endDate);
    const totalDays = (endDateObj - currentDate) / (1000 * 60 * 60 * 24) + 1;
    let processedCount = 0;

    while (currentDate <= endDateObj) {
        const currentDateString = format(currentDate, 'yyyyMMdd');
        try {
            const params = { targetDt: currentDateString };
            const data = await kobisService.getDailyBoxOffice(params);
            const boxOfficeList = data.boxOfficeResult.dailyBoxOfficeList;

            if (boxOfficeList.length > 0) {
                appendDataToCSV(filePath, boxOfficeList);
                console.log(`Added data for ${currentDateString}.`);
            } else {
                console.log(`No data for ${currentDateString}.`);
            }
        } catch (error) {
            console.error(`Error fetching data for ${currentDateString}:`, error.message);
        }

        // 진행 상황 출력
        processedCount++;
        console.log(`Progress: ${processedCount}/${totalDays} days processed.`);

        // 다음 날짜로 이동
        currentDate = addDays(currentDate, 1);
    }
    /// sdlfkjw;ofijw3elfkjsdlkfjdir
}

// 데이터 조회 및 저장
fetchAndSaveBoxOfficeData(startDate, endDate);

