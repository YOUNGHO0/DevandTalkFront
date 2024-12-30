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
                console.log( await apiResponse.text());
                console.error("로그아웃 실패");
            }
        } catch (error) {
            console.error("로그아웃 중 오류 발생:", error);
        }
    };
</script>

<div style="width: 300px; justify-content: center; align-items: center; margin-left: auto; margin-right: auto;">
    <h2> 현재 심사중입니다. </h2>
    <h3> 승인이 완료되면 다시 로그인 해주세요</h3>
    <Button style="font-size: 24px; padding: 30px"  variant="raised" onclick={handleLogout}> 로그아웃 하기 </Button>
</div>

