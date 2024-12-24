
<script lang="ts">
    import {formatDateWithTime} from "../utils/helper.js";
    import Button from "@smui/button";
    import {userStatus} from "../stores/user";

    export let comment;
    export let editMode:boolean;
</script>


<style>
    .centered {
        display: flex; /* Flexbox 활성화 */
        justify-content: center; /* 가로 가운데 정렬 */
        align-items: center; /* 세로 가운데 정렬 */
    }
</style>

<div class="comment" style="padding:10px; margin: 5px">
    <div style="display: flex">
        <h4 style="margin: 5px; margin-left: 0px;">{comment.author.nickname}</h4>
        <div style="margin-left:auto " class="centered">{formatDateWithTime(comment.createdAt)}</div>
    </div>
    <div style="display: flex">
        <div class="comment-content" style="margin: 5 px; margin-left: 0px; padding-top: 10px">{comment.commentContent}</div>
        {#if $userStatus.isLoggedIn && $userStatus.userNickname === comment.author.nickname}
        <Button onclick={()=>{editMode= !editMode}} style="margin-left: auto" secondary> 수정 </Button>
        {/if}
    </div>

</div>