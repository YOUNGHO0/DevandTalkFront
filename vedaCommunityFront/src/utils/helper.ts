export function formatDate(dateString: string) {
    return new Date(dateString).toLocaleDateString("ko-KR");
}

export function formatDateWithTime(dateString:string) {
    const [date, time] = dateString.split('T'); // T를 기준으로 분리
    const formattedTime = time.split('.')[0]; // 소수점 이하 제거
    return `${date} ${formattedTime}`; // 공백으로 연결
}