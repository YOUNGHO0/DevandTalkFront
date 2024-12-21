// src/hooks.server.js
import { API_URL } from '$env/static/private';

export async function handle({ event, resolve }) {
	// 요청이 들어올 때 실행되는 로직 (미들웨어처럼 동작)
	console.log(`Got request: ${event.url.pathname}`);

    try{
        
        const apiResponse = await fetch(`${API_URL}`, {
            method: 'GET',
            headers: {
              'Content-Type': 'application/json',
            },
          });

          console.log(apiResponse.status)

          if(apiResponse.status === 200){
            console.log("200 received"); 
          }
          else if( apiResponse.status === 403){
            console.log("403 received");
          }
          else if( apiResponse.status === 404){
            console.log("404 received" )
          }

          
    }
    catch(error){
        if (event.url.pathname !== '/serverError') {
            const baseUrl = new URL(event.request.url).origin; // 'http://localhost:5173'
            console.log(baseUrl)
            return Response.redirect(`${baseUrl}/serverError`, 302);  // 절대 경로 사용
        }
        console.log("ServerNotConnected")

    }


	// 요청 처리 후 응답 반환
	const response = await resolve(event);
    console.log(API_URL); 
	// 응답 수정 예시 (헤더 추가)
	response.headers.set('X-Custom-Header', 'MyHeaderValue');

	return response;
}
