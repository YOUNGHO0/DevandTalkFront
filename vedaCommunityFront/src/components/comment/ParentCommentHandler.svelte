<script lang="ts">

import CommentEdit from "./CommentEdit.svelte";
import ParentComment from "./ParentComment.svelte";
import {on} from "svelte/events";
import ChildCommentHandler from "./ChildCommentHandler.svelte";

let editMode :boolean =$state(false);

let {fetchComments,comment} : {fetchComments:()=> void, comment : App.CommentDto } = $props();

let childCommentList :App.CommentDto[]|null = comment.childCommentList;

</script>

<div>
    {#if editMode}
        <div style="display:flex;">
            <CommentEdit {fetchComments} {comment} bind:editMode></CommentEdit>
        </div>


    {:else}
        <ParentComment {fetchComments} {comment} bind:editMode></ParentComment>
    {/if}

    {#if childCommentList !== null}
        {#each childCommentList as childComment}
            <ChildCommentHandler {fetchComments} {childComment}></ChildCommentHandler>
        {/each}
    {:else}
    {/if}
</div>







