
<script lang="ts">
    import {formatDateWithTime} from "../../utils/helper.js";
    import Button from "@smui/button";
    import {userStatus} from "../../stores/user";

    let{fetchComments,comment,editMode = $bindable(false)} : {fetchComments:()=>void,comment:App.CommentDto,editMode:boolean} = $props();
</script>


<style>
    .centered {
        display: flex; /* Flexbox 활성화 */
        justify-content: center; /* 가로 가운데 정렬 */
        align-items: center; /* 세로 가운데 정렬 */
        font-size: 12px;
    }
</style>

<div class="comment" style="padding:10px;">
    <div style="display: flex">
        <h4 style="margin: 5px; margin-left: 0px;">{comment.author.nickname}</h4>
        <div style="margin-left:auto " class="centered">{formatDateWithTime(comment.createdAt)}</div>
    </div>
    <div style="padding-top: 10px;display: flex; align-items: center">
        <div class="comment-content" style=" margin-left: 0px;">{comment.commentContent}</div>
        {#if $userStatus.isLoggedIn && $userStatus.userNickname === comment.author.nickname}
        <div style="display: flex; align-items: center; margin-left: auto;justify-content: center">
            <Button onclick={()=>{
                console.log("왜안돼");
                console.log(editMode);
                editMode= !editMode}} style="margin-left: auto" secondary> 수정 </Button>
            <Button onclick={()=>{}} style="margin-left: auto" secondary> 삭제 </Button>
        </div>
        {/if}


    </div>

</div>