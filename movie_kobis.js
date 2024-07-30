const axios = require('axios');

// KOBIS Open API를 호출하기 위한 클라이언트 서비스 정의
function KobisOpenAPIRestService(key, host) {
    this.key = key;  // KOBIS API 키 (인증을 위한 키)
    this.host = host ? host : "http://www.kobis.or.kr";  // KOBIS API 호스트 URL, 기본값은 KOBIS 공식 호스트
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

// KOBIS API 호출 중 오류 처리 객체 정의
function KobisOpenAPIError(message) {
    this.message = message;  // 오류 메시지
}
KobisOpenAPIError.prototype = new Error;  // Error 객체를 상속

// KOBIS API에 GET 요청을 보내는 함수 정의
KobisOpenAPIRestService.prototype.requestGet = async function(serviceURI, isJson, paramMap) {
    const urlStr = this.host + serviceURI + (isJson ? '.json' : '.xml');  // 요청할 URL 생성
    paramMap.key = this.key;  // API 키를 파라미터에 추가

    try {
        const response = await axios.get(urlStr, { params: paramMap });
        return response.data;  // 요청 성공 시 응답 데이터 반환
    } catch (error) {
        throw new KobisOpenAPIError(error.message);  // 오류 발생 시 커스텀 오류 객체 생성
    }
};

// KOBIS API의 다양한 엔드포인트 호출 메서드 정의

// 일일 박스오피스 데이터 조회
KobisOpenAPIRestService.prototype.getDailyBoxOffice = function(isJson, paramMap) {
    return this.requestGet(this.DAILY_BOXOFFICE_URI, isJson, paramMap);
};

// 주간 박스오피스 데이터 조회
KobisOpenAPIRestService.prototype.getWeeklyBoxOffice = function(isJson, paramMap) {
    return this.requestGet(this.WEEKLY_BOXOFFICE_URI, isJson, paramMap);
};

// 코드 목록 조회
KobisOpenAPIRestService.prototype.getComCodeList = function(isJson, paramMap) {
    return this.requestGet(this.COM_CODE_LIST_URI, isJson, paramMap);
};

// 영화 목록 조회
KobisOpenAPIRestService.prototype.getMovieList = function(isJson, paramMap) {
    return this.requestGet(this.MOVIE_LIST_URI, isJson, paramMap);
};

// 특정 영화 정보 조회
KobisOpenAPIRestService.prototype.getMovieInfo = function(isJson, paramMap) {
    return this.requestGet(this.MOVIE_INFO_URI, isJson, paramMap);
};

// 회사 목록 조회
KobisOpenAPIRestService.prototype.getCompanyList = function(isJson, paramMap) {
    return this.requestGet(this.COMPANY_LIST_URI, isJson, paramMap);
};

// 특정 회사 정보 조회
KobisOpenAPIRestService.prototype.getCompanyInfo = function(isJson, paramMap) {
    return this.requestGet(this.COMPANY_INFO_URI, isJson, paramMap);
};

// 사람 목록 조회
KobisOpenAPIRestService.prototype.getPeopleList = function(isJson, paramMap) {
    return this.requestGet(this.PEOPLE_LIST_URI, isJson, paramMap);
};

// 특정 사람 정보 조회
KobisOpenAPIRestService.prototype.getPeopleInfo = function(isJson, paramMap) {
    return this.requestGet(this.PEOPLE_INFO_URI, isJson, paramMap);
};

// API 키와 호스트를 정의하여 KOBIS Open API 서비스 객체 생성
const apiKey = "69897250c60e02be49d7b7dc362dc152";
const apiHost = "http://www.kobis.or.kr";

// KOBIS Open API 서비스 객체 생성
const kobisService = new KobisOpenAPIRestService(apiKey, apiHost);

// 일일 박스오피스 데이터를 가져오기 위한 파라미터 설정
const params = {
    targetDt: "20230722"  // 조회할 날짜 (YYYYMMDD 형식)
};

// 일일 박스오피스 데이터를 JSON 형식으로 조회
kobisService.getDailyBoxOffice(true, params).then(dailyBoxOfficeData => {
    // 조회 결과 출력
    console.log(dailyBoxOfficeData);
}).catch(error => {
    console.error(error.message);
});
