<!-- src/routes/article/[id]/+page.svelte -->

<script lang="ts">
    import List, { Item, Text, Graphic, Separator, Subheader } from '@smui/list';
    import CommentList from "../../components/comment/CommentList.svelte"
    // 예시

    import Dialog, { Title, Content, Actions } from '@smui/dialog';
    let { editMode = $bindable(false), response }: { editMode: boolean, response: App.AnonArticle } = $props();
    // `data` 객체를 통해 `load` 함수에서 전달된 데이터를 가져옴
    import {onMount} from "svelte";
    import {formatDateWithTime} from "../../utils/helper"
    import Button, {Label} from "@smui/button";
    import {userStatus} from "../../stores/user";
    let contentHeight = 0; // 글의 높이를 측정할 변수
    const minOffset = 100; // 최소 300px의 거리
    let open = $state(false);
    onMount(async ()=>{

        const contentElement = document.querySelector('.content');
        if (contentElement) {
            contentHeight = contentElement.offsetHeight; // 글 높이 계산
        }
    })

    function flipEditMode(){
        editMode = !editMode;
    }

    async function deleteArticle(){
        const apiUrl = import.meta.env.VITE_API_URL;  // 환경변수에서 API URL 불러오기
        try {
            console.log("id " + response.id);
            const dto : App.AnonArticleDeleteDto = { anonArticleId: Number(response.id) }
            const apiResponse = await fetch(`${apiUrl}/api/v1/anonArticle`, {
                method: "DELETE",
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
                console.log(await apiResponse.text())
                window.history.back();
            }
        } catch (error) {
            console.error("Error creating article:", error);
            throw error;  // 오류 발생 시 처리
        }
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

{#if response}
    <div style="margin-left: 15px; margin-right: 15px" >
        <h2 style="margin-top: 0px; margin-bottom: 5px">{response.title}</h2>
        <div style="display: flex;padding-bottom: 10px">
            <div style="display: flex; margin-right: auto">
                <div style=" margin-right: auto; font-size: 12px;">익명의 사용자</div>
                <div style="font-size: 12px; margin-left: 10px" >{formatDateWithTime(response.createdDate)}</div>
            </div>
            {#if response.author}
                <Button onclick={flipEditMode} style="height: auto; width: auto;">수정</Button>
                <Button onclick={()=>{ open = true}} style="height: auto; width: auto;">삭제</Button>
            {/if}

        </div>
        <Separator />
        <div class="content-wrapper">
            <div class="content">
                <h4 style="font-weight: normal">{response.content}</h4>
            </div>

            <div
                    class="separator-wrapper"
                    style="margin-top: {Math.max(minOffset - contentHeight, 0)}px"
            >
                <Separator />
            </div>
        </div>
    </div>

    <Dialog
            bind:open
            aria-labelledby="simple-title"
            aria-describedby="simple-content"
    >
        <!-- Title cannot contain leading whitespace due to mdc-typography-baseline-top() -->
        <Content id="simple-content">정말로 글을 삭제하시겠습니까?</Content>
        <Actions>
            <Button>
                <Label>No</Label>
            </Button>
            <Button onclick={deleteArticle}>
                <Label>Yes</Label>
            </Button>
        </Actions>
    </Dialog>


{:else}
    <p>Loading</p>
{/if}