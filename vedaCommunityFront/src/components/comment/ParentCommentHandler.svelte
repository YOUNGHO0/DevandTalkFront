<script lang="ts">

import CommentEdit from "./CommentEdit.svelte";
import ParentComment from "./ParentComment.svelte";
import {on} from "svelte/events";
import ChildCommentHandler from "./ChildCommentHandler.svelte";
import ChildCommentWrite from "./ChildCommentWrite.svelte";

let editMode :boolean =$state(false);
let {fetchComments,comment = $bindable()} : {fetchComments:()=> void, comment : App.CommentDto } = $props();

let childCommentList :App.CommentDto[]|null = $state(comment.childCommentList);
// childCommentList가 변경될 때마다 console.log를 출력
$effect(()=>{
   childCommentList = comment.childCommentList;
})
</script>

<div>
    {#if editMode}
        <div style="display:flex;">
            <CommentEdit bind:fetchComments {comment} bind:editMode></CommentEdit>
        </div>


    {:else}
        <ParentComment {fetchComments} {comment} bind:editMode></ParentComment>
    {/if}

    {#if childCommentList !== null}
        {#each childCommentList as childComment , i}
            <ChildCommentHandler  bind:fetchComments childComment={childCommentList[i]} parentId={comment.id}></ChildCommentHandler>
        {/each}
    {:else}
    {/if}
</div>







