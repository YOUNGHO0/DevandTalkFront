<script lang="ts">

import CommentEdit from "./CommentEdit.svelte";
import ParentComment from "./ParentComment.svelte";
import {on} from "svelte/events";
import ChildCommentHandler from "./ChildCommentHandler.svelte";
import ChildCommentWrite from "./ChildCommentWrite.svelte";

let editMode :boolean =$state(false);
let applyMode : boolean = $state(false);
let {fetchComments,comment = $bindable()} : {fetchComments:()=> void, comment : App.CommentDto } = $props();

let commentState = $state(comment)
let childCommentList :App.CommentDto[]|null = comment.childCommentList

</script>

<div>
    {#if editMode}
        <div style="display:flex;">
            <CommentEdit bind:fetchComments {comment} bind:editMode></CommentEdit>
        </div>


    {:else}
        <ParentComment bind:applyMode {fetchComments} {comment} bind:editMode></ParentComment>
    {/if}

    {#if childCommentList !== null}
        {#each childCommentList as childComment}
            <ChildCommentHandler bind:applyMode {fetchComments} {childComment}></ChildCommentHandler>
        {/each}
    {:else}
    {/if}
    {#if applyMode}
        <ChildCommentWrite bind:applyMode id={comment.id} {fetchComments}></ChildCommentWrite>
    {/if}
</div>







