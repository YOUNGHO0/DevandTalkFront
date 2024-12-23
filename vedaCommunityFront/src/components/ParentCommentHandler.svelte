<script lang="ts">

import CommentEdit from "./CommentEdit.svelte";
import ParentComment from "./ParentComment.svelte";
import {on} from "svelte/events";
import ChildCommentHandler from "./ChildCommentHandler.svelte";

let editMode :boolean =false;
export let comment : App.CommentDto;




let childCommentList :App.CommentDto[]|null = comment.childCommentList;

function onEditClick(){
    editMode = ! editMode
}
</script>

<div>
    {#if editMode}
        <div on:click={onEditClick}>뒤로가기</div>
        <CommentEdit {comment}></CommentEdit>
    {:else}
        <div on:click={onEditClick}>수정</div>
        <ParentComment {comment}></ParentComment>
    {/if}

    {#if childCommentList !== null}
        {#each childCommentList as childComment}
            <ChildCommentHandler {childComment}></ChildCommentHandler>
        {/each}
    {:else}
        <p>댓글이 없습니다.</p>
    {/if}
</div>







