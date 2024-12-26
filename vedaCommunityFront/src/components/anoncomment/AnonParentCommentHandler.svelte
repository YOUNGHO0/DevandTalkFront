<script lang="ts">

import CommentEdit from "./AnonCommentEdit.svelte";
import ParentComment from "./AnonParentComment.svelte";
import {on} from "svelte/events";
import ChildCommentHandler from "./AnonChildCommentHandler.svelte";
import ChildCommentWrite from "./AnonChildCommentWrite.svelte";
import AnonCommentEdit from "./AnonCommentEdit.svelte";
import AnonParentComment from "./AnonParentComment.svelte";
import AnonChildCommentHandler from "./AnonChildCommentHandler.svelte";

let editMode :boolean =$state(false);
let {fetchComments,comment = $bindable()} : {fetchComments:()=> void, comment : App.AnonCommentDto } = $props();

let childCommentList :App.AnonCommentDto[]|null = $state(comment.childCommentList);
// childCommentList가 변경될 때마다 console.log를 출력
$effect(()=>{
   childCommentList = comment.childCommentList;
})
</script>

<div>
    <AnonParentComment {fetchComments} {comment} bind:editMode></AnonParentComment>
    {#if childCommentList !== null}
        {#each childCommentList as childComment , i}
            <AnonChildCommentHandler  {fetchComments} childComment={childCommentList[i]} parentId={comment.id}></AnonChildCommentHandler>
        {/each}
    {:else}
    {/if}
</div>







