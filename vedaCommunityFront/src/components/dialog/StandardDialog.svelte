<script lang="ts">
    import Dialog, { Title, Content, Actions } from '@smui/dialog';

    import Button, {Label} from '@smui/button';

    let {dialogOpen=$bindable(),dialogMessage=$bindable(),onClose}:{dialogOpen:boolean,dialogMessage:string,onClose:()=>void} = $props();


    function handleClose() {
        dialogOpen = false; // 내부 상태 업데이트
        if (onClose) onClose(); // 콜백 호출
    }
</script>


<Dialog
        bind:open={dialogOpen}
        aria-labelledby="simple-title"
        aria-describedby="simple-content">
    <!-- Title cannot contain leading whitespace due to mdc-typography-baseline-top() -->
    <Content id="simple-content">{dialogMessage}</Content>
    <Actions>
        <Button>
            <Label>Yes</Label>
        </Button>
    </Actions>
</Dialog>

