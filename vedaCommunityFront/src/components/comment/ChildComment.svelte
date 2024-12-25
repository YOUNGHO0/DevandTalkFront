<script lang="ts">

    import {formatDateWithTime} from "../../utils/helper.js";
    import "../../utils/common.css"
    import Button, {Label} from "@smui/button";
    let{parentId,fetchComments,childComment,editMode = $bindable()} : {parentId:number,fetchComments:()=>void,childComment:App.CommentDto,editMode:boolean} = $props();
    import {userStatus} from "../../stores/user";
    let applyMode:boolean = $state(false);
    let open = $state(false);
    import Dialog, { Title, Content, Actions } from '@smui/dialog';
    import ChildCommentWrite from "./ChildCommentWrite.svelte";

    async function deleteComment() {
        const apiUrl = import.meta.env.VITE_API_URL;  // 환경변수에서 API URL 불러오기
        try {
            console.log("id " + childComment.id);
            const dto : App.CommentDeleteDto = { commentId: childComment.id }
            const apiResponse = await fetch(`${apiUrl}/api/v1/comment`, {
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

<div class="childComment" style="padding:10px; margin-left: 20px;">
    <div style="display: flex">
        {#if childComment.author}
            <h4 style=" padding-top: 0px; margin:0px">{childComment.author.nickname}</h4>
            <Button onclick={()=>{applyMode= !applyMode}} style="padding-bottom: 1px;"> 답글 </Button>
        {/if}
        {#if childComment.createdAt}
        <div style="margin-left:auto " class="centered">{formatDateWithTime(childComment.createdAt)}</div>
        {/if}
    </div>
    <div style="display: flex; padding-top: 10px; align-items: center;">
        <div class="comment-content">{childComment.commentContent}</div>
        {#if childComment.author &&  $userStatus.isLoggedIn && $userStatus.userNickname === childComment.author.nickname}
            <div style="display: flex; align-items: center; margin-left: auto;justify-content: center">
                <Button onclick={()=>{editMode= !editMode}} style="margin-left: auto" secondary> 수정 </Button>
                <Button onclick={()=>{open = true;}} style="margin-left: auto" secondary> 삭제 </Button>
            </div>
        {/if}
    </div>
</div>
{#if applyMode}
    <ChildCommentWrite id={parentId} {fetchComments} bind:applyMode></ChildCommentWrite>
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






