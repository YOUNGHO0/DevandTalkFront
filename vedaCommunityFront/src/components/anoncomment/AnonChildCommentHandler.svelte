<script lang="ts">

    import CommentEdit from "./AnonCommentEdit.svelte";
    import ChildComment from "./AnonChildComment.svelte";
    import AnonCommentEdit from "./AnonCommentEdit.svelte";
    import AnonChildComment from "./AnonChildComment.svelte";

    let {fetchComments, childComment, parentId} : {fetchComments : ()=>void,childComment:App.AnonCommentDto,parentId:number} = $props();
    let editMode : boolean = $state(false);
    // CommentDto 타입 정의

</script>

<AnonChildComment {parentId} {fetchComments} {childComment} bind:editMode></AnonChildComment>
