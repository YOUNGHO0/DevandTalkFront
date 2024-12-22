<script>

    import Button, {Label} from "@smui/button";
    import {preventDefault} from "svelte/legacy";
    const apiUrl = import.meta.env.VITE_API_URL;
    const handleLogout2 = () => {
        console.log('버튼 클릭됨');
    };
    const handleLogout = async () => {
        try {
            const apiResponse = await fetch(`${apiUrl}/api/v1/user/logout`, {
                method: 'GET',
                headers: {
                    // 'Content-Type'을 제거하거나, 필요시 명시하지 않음
                },
                credentials: 'include', // 쿠키를 포함시켜 요청
            });

            if (apiResponse.ok) {
                // 로그아웃이 성공하면 처리할 로직 (예: 리디렉션, 상태 변경 등)
                window.location.href = "/login";  // 로그인 페이지로 리디렉션
            } else {
                // 실패한 경우 처리
                console.error("로그아웃 실패");
            }
        } catch (error) {
            console.error("로그아웃 중 오류 발생:", error);
        }
    };
</script>

<div> 현재 심사중입니다. </div>
<Button onclick={handleLogout}> 로그아웃
</Button>