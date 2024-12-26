
<script lang="ts">
    import {formatDateWithTime} from "../../utils/helper.js";
    import Button, {Label} from "@smui/button";
    import {userStatus} from "../../stores/user";
    let open = $state(false);
    import Dialog, { Title, Content, Actions } from '@smui/dialog';
    import ChildCommentWrite from "./AnonChildCommentWrite.svelte";
    import Chip, { Set, Text } from '@smui/chips';
    import AnonCommentEdit from "./AnonCommentEdit.svelte";
    let{ fetchComments,comment,editMode = $bindable(false)} : {fetchComments:()=>void,comment:App.AnonCommentDto,editMode:boolean} = $props();
    let applyMode:boolean = $state(false);
    async function deleteComment() {
        const apiUrl = import.meta.env.VITE_API_URL;  // 환경변수에서 API URL 불러오기
        try {
            console.log("id " + comment.id);
            const dto : App.CommentDeleteDto = { commentId: comment.id }
            const apiResponse = await fetch(`${apiUrl}/api/v1/anonComment`, {
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
                fetchComments();
            }
        } catch (error) {
            console.error("Error creating article:", error);
            throw error;  // 오류 발생 시 처리
        }
    }
</script>


<style>
    .centered {
        display: flex; /* Flexbox 활성화 */
        justify-content: center; /* 가로 가운데 정렬 */
        align-items: center; /* 세로 가운데 정렬 */
        font-size: 12px;
    }
</style>

<div class="comment" style="padding:10px; margin-bottom: 2px">
    <div style="display: flex">
        <div style="justify-content:center;align-items: center; display: flex; padding-left: 5px">

            {#if comment.anonArticleAuthor}
                <Chip color="secondary" style="background-color: #ff3e00; color: white; opacity: 0.8;" >
                    <div style="font-weight: bold">글쓴이</div>
                </Chip>
            <Button onclick={()=>{applyMode = !applyMode}} style="padding-bottom: 1px;"> 답글 </Button>
            {:else}
                <h4 style=" padding-top: 0px; margin:0px">익명의 사용자</h4>
                <Button onclick={()=>{applyMode = !applyMode}} style="padding-bottom: 1px;"> 답글 </Button>
            {/if}


        </div>
        {#if comment.createdAt}
        <div style="margin-left:auto " class="centered">{formatDateWithTime(comment.createdAt)}</div>
        {/if}
    </div>
    <div style="padding-top: 10px;display: flex; align-items: center">
        {#if editMode}
            <AnonCommentEdit {fetchComments} {comment} bind:editMode></AnonCommentEdit>
            {:else }
            <div class="comment-content" style=" margin-left: 0px; padding-left: 10px">{comment.commentContent}</div>
            {#if comment.author}
                <div style="display: flex; align-items: center; margin-left: auto;justify-content: center">
                    <Button onclick={()=>{editMode= !editMode}} style="margin-left: auto; color: black" secondary> 수정 </Button>
                    <Button onclick={()=>{open = true;}} style="margin-left: auto; color:black" secondary> 삭제 </Button>
                </div>
            {/if}
        {/if}



    </div>
</div>

{#if applyMode}
    <ChildCommentWrite {fetchComments} bind:applyMode id={comment.id} ></ChildCommentWrite>
{/if}


<Dialog
        bind:open
        aria-labelledby="simple-title"
        aria-describedby="simple-content"
>
    <!-- Title cannot contain leading whitespace due to mdc-typography-baseline-top() -->
    <Content id="simple-content">정말로 댓글을 삭제하시겠습니까?</Content>
    <Actions>
        <Button>
            <Label>No</Label>
        </Button>
        <Button onclick={deleteComment}>
            <Label>Yes</Label>
        </Button>
    </Actions>
</Dialog>
