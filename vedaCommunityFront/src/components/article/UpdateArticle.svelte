<!-- src/routes/article/[id]/+page.svelte -->

<script lang="ts">
    import List, { Item, Text, Graphic, Separator, Subheader } from '@smui/list';
    import CommentList from "../../components/comment/CommentList.svelte"


    import Dialog, { Title, Content, Actions } from '@smui/dialog';
    let dialogOpen:boolean = $state(false);
    let dialogMessage:string = $state("");
    // `data` 객체를 통해 `load` 함수에서 전달된 데이터를 가져옴
    import {onMount} from "svelte";
    import {formatDateWithTime} from "../../utils/helper"
    import Button, {Label} from "@smui/button";
    import {userStatus} from "../../stores/user";
    let {response, editMode = $bindable()} :{response: App.Article, editMode: boolean} = $props();

    import Textfield from '@smui/textfield';
    import StandardDialog from "../dialog/StandardDialog.svelte";
    let contentHeight = 0; // 글의 높이를 측정할 변수
    const minOffset = 100; // 최소 300px의 거리
    let editTitle:string = response.title;
    let editConent:string = response.content;

    onMount(async ()=>{

        const contentElement = document.querySelector('.content');
        if (contentElement) {
            contentHeight = contentElement.offsetHeight; // 글 높이 계산
        }
    })

    function flipEditMode(){
        editMode = !editMode;
    }
    async function  updateArticle(id:number,title: string, content: string) {
        const apiUrl = import.meta.env.VITE_API_URL;  // 환경변수에서 API URL 불러오기

        // 서버로 전송할 데이터
        const dto: App.ArticleUpdateDto = {
            id: id,
            title: title,
            content: content,
        };

        if(!title.trim()){
            dialogOpen =true;
            dialogMessage ="제목을 입력해 주세요"
            return;
        }

        if(!content.trim()){
            dialogOpen = true;
            dialogMessage = "내용을 입력해 주세요"
            return;
        }

        try {
            const apiResponse = await fetch(`${apiUrl}/api/v1/article`, {
                method: "PATCH",  // POST 메서드로 요청
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
        <Textfield style="width: 100%" variant="outlined" bind:value={editTitle}> </Textfield>
        <div style="display: flex; justify-content: center; align-items: center">
            <div style="display: flex; margin-right: auto; margin-top: 10px">
                <div style=" margin-right: auto; font-size: 12px;">{response.author.nickname}</div>
                <div style="font-size: 12px; margin-left: 10px" >{formatDateWithTime(response.createdDate)}</div>
            </div>
        </div>
        <div class="content-wrapper">
            <div style="margin-top: 10px" class="content">
                <Textfield variant="outlined"
                           bind:value={editConent}
                           textarea
                           style="width: 100% ; height: 150px;"/>

            </div>

            <div
                    class="separator-wrapper"
                    style="margin-top: {Math.max(minOffset - contentHeight, 0)}px"
            >
                <Separator />
            </div>
        </div>
        <p style="margin-left: auto;width: 135px; display: flex; justify-content: space-between;">
            <Button onclick={()=>{updateArticle(response.id,editTitle,editConent)}} variant="raised"> 수정 </Button>
            <Button color="secondary"  onclick={()=>{editMode = !editMode}} variant="raised">취소</Button>

        </p>

    </div>


{:else}
    <p>Loading</p>
{/if}


<StandardDialog bind:dialogOpen bind:dialogMessage onClose={()=>{}}></StandardDialog>