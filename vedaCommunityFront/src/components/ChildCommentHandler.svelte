<script lang="ts">

    import CommentEdit from "./CommentEdit.svelte";
    import ChildComment from "./ChildComment.svelte";

    export let childComment :App.CommentDto;
    let isEdited : boolean = false;
    // CommentDto 타입 정의

</script>


{#if isEdited}
    <CommentEdit comment = {childComment}></CommentEdit>
    {:else }
    <ChildComment {childComment}></ChildComment>
    {/if}