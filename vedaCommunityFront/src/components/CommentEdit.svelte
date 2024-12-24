<script lang="ts">
    import Textfield from '@smui/textfield';
    import HelperText from '@smui/textfield/helper-text';

    export let comment:App.CommentDto;  // 부모에서 전달받은 comment 값
    export let editMode:boolean;
    import { writable } from 'svelte/store';
    import Button from "@smui/button";

    // $state는 상태값 관리용 스토어
    let value = comment.commentContent // 부모로부터 전달받은 comment 값을 초기값으로 설정

    function handleClick(event: MouseEvent) {
        editMode = !editMode;
    }
    function sendEditComment(){};
</script>

<div>
    <Textfield variant="outlined"
               bind:value={value}
               textarea
               style="width: 100% ; height: 150px;
               "
    />
    <Button onclick={sendEditComment} variant="raised"> 수정 </Button>
    <Button color="secondary"  onclick={handleClick} variant="raised">취소</Button>

</div>

