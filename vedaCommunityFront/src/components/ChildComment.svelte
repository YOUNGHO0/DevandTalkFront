<script lang="ts">

    import {formatDateWithTime} from "../utils/helper.js";
    import "../utils/common.css"
    import Button from "@smui/button";
    export let childComment :App.CommentDto;
    export let editMode :boolean
</script>

<style>
    .centered {
        display: flex; /* Flexbox 활성화 */
        justify-content: center; /* 가로 가운데 정렬 */
        align-items: center; /* 세로 가운데 정렬 */
    }
</style>

<div class="comment" style="padding:10px; margin-left: 20px; margin-right: 5px">
    <div style="display: flex">
        <h4 style="margin: 5px; margin-left: 0px;">{childComment.author.nickname}</h4>
        <div style="margin-left:auto " class="centered">{formatDateWithTime(childComment.createdAt)}</div>
    </div>
    <div style="display: flex">
        <div class="comment-content" style=" padding-top: 10px">{childComment.commentContent}</div>
        <Button onclick={()=>{editMode= !editMode}} style="margin-left: auto" secondary> 수정 </Button>
    </div>

</div>




