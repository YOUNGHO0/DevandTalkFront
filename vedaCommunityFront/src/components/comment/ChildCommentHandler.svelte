<script lang="ts">

    import CommentEdit from "./CommentEdit.svelte";
    import ChildComment from "./ChildComment.svelte";

    let {fetchComments, childComment, parentId} : {fetchComments : ()=>void,childComment:App.CommentDto,parentId:number} = $props();
    let editMode : boolean = $state(false);
    // CommentDto 타입 정의

</script>


<ChildComment {parentId} {fetchComments} {childComment} bind:editMode></ChildComment>
