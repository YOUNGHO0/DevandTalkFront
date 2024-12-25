<script lang="ts">
    import Textfield from '@smui/textfield';
    import Button from "@smui/button";

    let { id, fetchComments }: { id: number, fetchComments: () => void } = $props();

    let value :string = $state("") // 부모로부터 전달받은 comment 값을 초기값으로 설정


    async function sendEditComment(content:string){
        const apiUrl = import.meta.env.VITE_API_URL;  // 환경변수에서 API URL 불러오기
        try {
            console.log(id + " " + content)
            const dto : App.CommentCreateDto = {articleId:id, commentContent:content}
            const apiResponse = await fetch(`${apiUrl}/api/v1/comment`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",  // 요청 헤더에 Content-Type 설정
                },
                credentials: "include",  // 쿠키 포함
                body: JSON.stringify(dto),  // request body에 데이터 추가 (JSON 형식)
            });

            // 응답 처리
            if (!apiResponse.ok) {
                throw new Error('Failed to create article');  // 요청 실패 시 오류 처리
            }
            if(apiResponse.status === 200){
                value = "";
                fetchComments();


            }
        } catch (error) {
            console.error("Error creating article:", error);
            throw error;  // 오류 발생 시 처리
        }
    };
</script>

<div style="width: 100%">
    <Textfield variant="outlined"
               bind:value={value}
               textarea
               style="width: 100% ; height: 150px;
               "
    />
    <p style="margin-left: auto;width: 135px; display: flex; justify-content: space-between;">
        <Button onclick={()=>{sendEditComment(value)}} variant="raised">작성</Button>

    </p>

</div>

