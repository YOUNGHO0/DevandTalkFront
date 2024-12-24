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
        <div style="display:flex;">
            <CommentEdit {comment} bind:editMode></CommentEdit>
        </div>


    {:else}
        <ParentComment {comment} bind:editMode></ParentComment>
    {/if}

    {#if childCommentList !== null}
        {#each childCommentList as childComment}
            <ChildCommentHandler {childComment}></ChildCommentHandler>
        {/each}
    {:else}
    {/if}
</div>







