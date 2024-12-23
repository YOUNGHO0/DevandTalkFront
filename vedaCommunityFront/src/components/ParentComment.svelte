
<script>
    export let comment;
</script>


<div>
    <p><strong>{comment.author.nickname}</strong> says:</p>
    <p>{comment.commentContent}</p>
    <p><em>Created at: {comment.createdAt}</em></p>
</div>