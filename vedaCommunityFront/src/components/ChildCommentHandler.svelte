<script lang="ts">

    import CommentEdit from "./CommentEdit.svelte";
    import ChildComment from "./ChildComment.svelte";

    export let childComment :App.CommentDto;
    let editMode : boolean = false;
    // CommentDto 타입 정의

</script>


{#if editMode}
    <CommentEdit comment = {childComment} bind:editMode></CommentEdit>
    {:else }
    <ChildComment {childComment} bind:editMode></ChildComment>
    {/if}