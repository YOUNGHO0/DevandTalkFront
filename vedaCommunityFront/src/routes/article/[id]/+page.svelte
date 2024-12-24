<!-- src/routes/article/[id]/+page.svelte -->

<script lang="ts">
    import List, { Item, Text, Graphic, Separator, Subheader } from '@smui/list';
    import CommentList from "../../../components/CommentList.svelte";



    // `data` 객체를 통해 `load` 함수에서 전달된 데이터를 가져옴
    import {onMount} from "svelte";
    import {formatDateWithTime} from "../../../utils/helper";

    const apiUrl = import.meta.env.VITE_API_URL;
    export let data;
    let response :App.Article

    let contentHeight = 0; // 글의 높이를 측정할 변수
    const minOffset = 100; // 최소 300px의 거리
    onMount(async ()=>{

        const apiResponse = await fetch(`${apiUrl}/api/v1/article/${data.id}`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            },
            credentials: "include", // 쿠키를 포함시켜 요청
        });
        response = await apiResponse.json();
        console.log(response)

        const contentElement = document.querySelector('.content');
        if (contentElement) {
            contentHeight = contentElement.offsetHeight; // 글 높이 계산
        }
        })



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
        <h2 style="margin-top: 15px; margin-bottom: 10px">{response.title}</h2>
        <div style="display: flex">
            <div style=" margin-right: 10px; font-size: 12px; margin-bottom: 10px">{response.author.nickname}</div>
            <div style="font-size: 12px" >{formatDateWithTime(response.createdDate)}</div>
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

    <CommentList id={response.id} />




{:else}
    <p>Loading</p>
{/if}