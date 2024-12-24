<!-- src/routes/article/[id]/+page.svelte -->

<script lang="ts">
    import List, { Item, Text, Graphic, Separator, Subheader } from '@smui/list';
    import CommentList from "../../components/comment/CommentList.svelte"



    // `data` 객체를 통해 `load` 함수에서 전달된 데이터를 가져옴
    import {onMount} from "svelte";
    import {formatDateWithTime} from "../../utils/helper"
    import Button from "@smui/button";
    import {userStatus} from "../../stores/user";
    export let response :App.Article
    export let editMode:boolean;
    let contentHeight = 0; // 글의 높이를 측정할 변수
    const minOffset = 100; // 최소 300px의 거리
    onMount(async ()=>{

        const contentElement = document.querySelector('.content');
        if (contentElement) {
            contentHeight = contentElement.offsetHeight; // 글 높이 계산
        }
    })

    function flipEditMode(){
        editMode = !editMode;
    }


    let comments = [
        { author: 'Alice', text: 'Great post!' },
        { author: 'Bob', text: 'Thanks for sharing.' }
    ];
</script>

<style>
    .content-wrapper {
        position: relative; /* 컨테이너를 기준으로 배치 */
    }

    .separator-wrapper {
        margin-top: 0; /* 기본값 */
    }
</style>

{#if response}
    <div style="margin-left: 15px; margin-right: 15px" >
        <h2 style="margin-top: 0px; margin-bottom: 10px">{response.title}</h2>
        <div style="display: flex; justify-content: center; align-items: center">
            <div style="display: flex; margin-right: auto">
                <div style=" margin-right: auto; font-size: 12px;">{response.author.nickname}</div>
                <div style="font-size: 12px; margin-left: 10px" >{formatDateWithTime(response.createdDate)}</div>
            </div>
            {#if $userStatus.isLoggedIn && $userStatus.userNickname === response.author.nickname}
            <Button onclick={flipEditMode} style="margin: 0px; margin-left: auto; padding: 0px">수정</Button>
            {/if}
        </div>
        <Separator />
        <div class="content-wrapper">
            <div class="content">
                <h4>{response.content}</h4>
            </div>

            <div
                    class="separator-wrapper"
                    style="margin-top: {Math.max(minOffset - contentHeight, 0)}px"
            >
                <Separator />
            </div>
        </div>


    </div>


{:else}
    <p>Loading</p>
{/if}