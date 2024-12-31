<!-- src/routes/article/[id]/+page.svelte -->

<script lang="ts">
    import {Separator} from '@smui/list';

    import Dialog, { Title, Content, Actions } from '@smui/dialog';
    let dialogOpen = $state(false); // 다이얼로그 상태
    let dialogMessage = $state(""); // 다이얼로그 메시지
    // `data` 객체를 통해 `load` 함수에서 전달된 데이터를 가져옴
    import Button, {Label} from "@smui/button";
    import Textfield from '@smui/textfield';


    let contentHeight = 0; // 글의 높이를 측정할 변수
    const minOffset = 100; // 최소 300px의 거리
    let editTitle:string = "";
    let editConent:string = "";

    async function  createArticle(title: string, content: string) {
        const apiUrl = import.meta.env.VITE_API_URL;  // 환경변수에서 API URL 불러오기

        // 서버로 전송할 데이터
        const dto: App.ArticleCreateDto = {
            title: title,
            content: content,
        };

        try {
            const apiResponse = await fetch(`${apiUrl}/api/v1/article`, {
                method: "POST",  // POST 메서드로 요청
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
                window.history.back();
            }
        } catch (error) {
            console.error("Error creating article:", error);
            throw error;  // 오류 발생 시 처리
        }
    }

    // 유효성 검사 및 다이얼로그 활성화
    function validateAndSubmit(editTitle: string, editConent: string) {
        if (!editTitle.trim()) {
            dialogMessage = "제목을 입력해주세요.";
            dialogOpen = true;
            return;
        }

        if (!editConent.trim()) {
            dialogMessage = "내용을 입력해주세요.";
            dialogOpen = true;
            return;
        }
        // 필드가 유효하면 서버로 요청
        createArticle(editTitle, editConent);
    }

</script>

<style>
    .content-wrapper {
        position: relative; /* 컨테이너를 기준으로 배치 */
    }

    .separator-wrapper {
        margin-top: 0; /* 기본값 */
    }
</style>

    <div style="margin-left: 15px; margin-right: 15px; margin-top: 10px" >
        <h2 style="margin-top: 0px;">게시글 작성</h2>
        <Textfield style="width: 100%" variant="outlined" label="제목" bind:value={editTitle}> </Textfield>
        <div class="content-wrapper">
            <div style="margin-top: 10px" class="content">
                <Textfield variant="outlined"
                           bind:value={editConent}
                           label="내용"
                           textarea
                           style="width: 100% ; height: 150px;"/>

            </div>

            <div
                    class="separator-wrapper"
            >
            </div>
            <Button  style="display:flex;margin-top: 10px; width: 75px; margin-left: auto;" onclick={()=>{validateAndSubmit(editTitle,editConent)}} variant="raised"> 글쓰기 </Button>
        </div>


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