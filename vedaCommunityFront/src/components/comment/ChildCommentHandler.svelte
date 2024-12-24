<script lang="ts">

    import CommentEdit from "./CommentEdit.svelte";
    import ChildComment from "./ChildComment.svelte";

    let {fetchComments, childComment} : {fetchComments : ()=>void,childComment:App.CommentDto} = $props();
    let editMode : boolean = $state(false);
    // CommentDto 타입 정의

</script>


{#if editMode}
    <CommentEdit {fetchComments} comment = {childComment} bind:editMode></CommentEdit>
    {:else }
    <ChildComment {fetchComments} {childComment} bind:editMode></ChildComment>
    {/if}