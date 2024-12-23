<script lang="ts">
    import { onMount } from "svelte";
    import ParentCommentHandler from "./ParentCommentHandler.svelte";

    const apiUrl = import.meta.env.VITE_API_URL;

    export let id: bigint;  // 부모에서 전달받을 id
    let comments: App.CommentDto[] = [];  // 댓글 데이터를 저장할 변수

    // 댓글 데이터를 API에서 받아오는 부분
    onMount(async () => {
        if (id) {
            const apiResponse = await fetch(`${apiUrl}/api/v1/comment/list/${id}`, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                },
                credentials: "include",  // 쿠키를 포함시켜 요청
            });

            if (apiResponse.ok) {
                const data: App.CommentDto[] = await apiResponse.json();
                comments = data;  // 받아온 데이터를 comments 변수에 저장
            } else {
                console.error("Failed to fetch comments");
            }
        }
    });
</script>

{#if id}
    <div>

        {#if comments.length > 0}

            <div style="margin-left: 15px; margin-right: 15px">
                <h3 >댓글 </h3>
                {#each comments as comment}
                    <ParentCommentHandler {comment}></ParentCommentHandler>
                {/each}
            </div>
        {:else}
            <p>No comments found.</p>
        {/if}
    </div>
{:else}
    <div>Loading...</div>
{/if}
