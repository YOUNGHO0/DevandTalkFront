<script lang="ts">

    import {formatDateWithTime} from "../../utils/helper.js";
    import "../../utils/common.css"
    import Button from "@smui/button";
    export let childComment :App.CommentDto;
    export let editMode :boolean
    import {userStatus} from "../../stores/user";
</script>

<style>
    .centered {
        display: flex; /* Flexbox 활성화 */
        justify-content: center; /* 가로 가운데 정렬 */
        align-items: center; /* 세로 가운데 정렬 */
        font-size: 12px;
    }
</style>

<div class="childComment" style="padding:10px; margin-left: 20px;">
    <div style="display: flex">
        <h4 style="margin: 5px; margin-left: 0px;">{childComment.author.nickname}</h4>
        <div style="margin-left:auto " class="centered">{formatDateWithTime(childComment.createdAt)}</div>
    </div>
    <div style="display: flex; padding-top: 10px; align-items: center;">
        <div class="comment-content">{childComment.commentContent}</div>
        {#if $userStatus.isLoggedIn && $userStatus.userNickname === childComment.author.nickname}
            <div style="display: flex; align-items: center; margin-left: auto;justify-content: center">
                <Button onclick={()=>{editMode= !editMode}} style="margin-left: auto" secondary> 수정 </Button>
                <Button onclick={()=>{}} style="margin-left: auto" secondary> 삭제 </Button>
            </div>
        {/if}
    </div>

</div>




