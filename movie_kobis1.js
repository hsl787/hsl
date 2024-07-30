const axios = require('axios');

// KOBIS Open API를 호출하기 위한 클라이언트 서비스 정의
class KobisOpenAPIRestService {
    constructor(key, host) {
        this.key = key;  // KOBIS API 키 (인증을 위한 키)
        this.host = host || "http://www.kobis.or.kr";  // KOBIS API 호스트 URL, 기본값은 KOBIS 공식 호스트
        // 다양한 KOBIS API 엔드포인트 URI 정의
        this.DAILY_BOXOFFICE_URI = "/kobisopenapi/webservice/rest/boxoffice/searchDailyBoxOfficeList";
        this.WEEKLY_BOXOFFICE_URI = "/kobisopenapi/webservice/rest/boxoffice/searchWeeklyBoxOfficeList";
        this.COM_CODE_LIST_URI = "/kobisopenapi/webservice/rest/code/searchCodeList";
        this.MOVIE_LIST_URI = "/kobisopenapi/webservice/rest/movie/searchMovieList";
        this.MOVIE_INFO_URI = "/kobisopenapi/webservice/rest/movie/searchMovieInfo";
        this.COMPANY_LIST_URI = "/kobisopenapi/webservice/rest/company/searchCompanyList";
        this.COMPANY_INFO_URI = "/kobisopenapi/webservice/rest/company/searchCompanyInfo";
        this.PEOPLE_LIST_URI = "/kobisopenapi/webservice/rest/people/searchPeopleList";
        this.PEOPLE_INFO_URI = "/kobisopenapi/webservice/rest/people/searchPeopleInfo";
    }
//---lkdfjwekjfn
    // KOBIS API에 GET 요청을 보내는 함수 정의
    async requestGet(serviceURI, paramMap) {
        const urlStr = this.host + serviceURI + '.json';  // 요청할 URL 생성
        paramMap.key = this.key;  // API 키를 파라미터에 추가

        try {
            const response = await axios.get(urlStr, { params: paramMap });
            return response.data;  // 요청 성공 시 응답 데이터 반환
        } catch (error) {
            throw new Error(error.response.data);  // 오류 발생 시 에러 처리
        }
    }

    // 일일 박스오피스 데이터 조회
    async getDailyBoxOffice(paramMap) {
        return await this.requestGet(this.DAILY_BOXOFFICE_URI, paramMap);
    }
}

// KOBIS Open API 서비스 객체 생성
const apiKey = "69897250c60e02be49d7b7dc362dc152";
const apiHost = "http://www.kobis.or.kr";
const kobisService = new KobisOpenAPIRestService(apiKey, apiHost);

// 일일 박스오피스 데이터를 가져오기 위한 파라미터 설정
const params = {
    targetDt: "20230722"  // 조회할 날짜 (YYYYMMDD 형식)
};

// 일일 박스오피스 데이터를 JSON 형식으로 조회
kobisService.getDailyBoxOffice(params)
    .then(data => {
        console.log(JSON.stringify(data, null, 2));  // JSON 형식으로 보기 좋게 출력
    })
    .catch(error => {
        console.error("Error:", error.message);  // 오류 처리
    });
