<script lang="ts">
    import Textfield from '@smui/textfield';
    import HelperText from '@smui/textfield/helper-text';

    let{fetchComments,comment,editMode = $bindable()} : {fetchComments:()=>void,comment:App.CommentDto,editMode:boolean} = $props();
    import { writable } from 'svelte/store';
    import Button, {Label} from "@smui/button";

    // $state는 상태값 관리용 스토어
    let value = comment.commentContent // 부모로부터 전달받은 comment 값을 초기값으로 설정
    import Dialog, { Title, Content, Actions } from '@smui/dialog';
    let dialogOpen:boolean = $state(false);
    let dialogMessage:string = $state("");
    function handleClick(event: MouseEvent) {
        editMode = !editMode;
    }
    async function sendEditComment(){


        const apiUrl = import.meta.env.VITE_API_URL;  // 환경변수에서 API URL 불러오기
        try {
            const dto : App.CommentUpdateDto = {commentId:comment.id, content:value};
            const apiResponse = await fetch(`${apiUrl}/api/v1/comment`, {
                method: "PATCH",
                headers: {
                    "Content-Type": "application/json",  // 요청 헤더에 Content-Type 설정
                },
                credentials: "include",  // 쿠키 포함
                body: JSON.stringify(dto),  // request body에 데이터 추가 (JSON 형식)
            });
            // 응답 처리
            console.log(apiResponse.text());
            if (!apiResponse.ok) {
                throw new Error('Failed to create article');  // 요청 실패 시 오류 처리
            }
            if(apiResponse.status === 200){
                value = ""
                editMode = false;
                await fetchComments();

            }
        } catch (error) {
            console.error("Error creating article:", error);
            throw error;  // 오류 발생 시 처리
        }

    };

    function validateAndSubmit(content: string) {
        if (!content.trim()) {
            dialogMessage = "내용을 입력해주세요.";
            dialogOpen = true;
            return;
        }
        // 필드가 유효하면 서버로 요청
        sendEditComment();
    }
</script>

<div style="width: 100%">
    <Textfield variant="outlined"
               bind:value={value}
               textarea
               style="width: 100% ; height: 150px;
               "
    />
    <p style="margin-left: auto;width: 135px; display: flex; justify-content: space-between;">
        <Button onclick={()=>{validateAndSubmit(value)}} variant="raised"> 수정 </Button>
        <Button color="secondary"  onclick={handleClick} variant="raised">취소</Button>

    </p>

</div>


<Dialog
        bind:open={dialogOpen}
        aria-labelledby="simple-title"
        aria-describedby="simple-content">
    <!-- Title cannot contain leading whitespace due to mdc-typography-baseline-top() -->
    <Content id="simple-content">{dialogMessage}</Content>
    <Actions>
        <Button>
            <Label>Yes</Label>
        </Button>
    </Actions>
</Dialog>
