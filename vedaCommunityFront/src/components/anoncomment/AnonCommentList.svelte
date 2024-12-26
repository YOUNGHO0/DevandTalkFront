<script lang="ts">
    import { onMount } from "svelte";
    import ParentCommentHandler from "./AnonParentCommentHandler.svelte";
    import CommentWrite from "./AnonCommentWrite.svelte";
    import AnonParentCommentHandler from "./AnonParentCommentHandler.svelte";

    const apiUrl = import.meta.env.VITE_API_URL;


     let {id} = $props()
     let comments: App.AnonCommentDto[] = $state([]);

    async function fetchComments() {
        if (id) {
            const apiResponse = await fetch(`${apiUrl}/api/v1/anonComment/list/${id}`, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                },
                credentials: "include",
            });

            if (apiResponse.ok) {
                const data: App.AnonCommentDto[] = await apiResponse.json();
                comments = data;
            } else {
                console.error("Failed to fetch comments");
            }
        }
    }

    // 댓글 데이터를 API에서 받아오는 부분
    onMount(fetchComments);
</script>

{#if id}
    <div style="margin-left: 15px; margin-right: 15px">
        <h3 >댓글 </h3>
        {#if comments.length > 0}
            <div >

                {#each comments as comment}
                    <AnonParentCommentHandler {fetchComments} {comment}></AnonParentCommentHandler>
                {/each}
            </div>
        {:else}
        {/if}
    </div>
    <CommentWrite {id} fetchComments={()=>{fetchComments()}}></CommentWrite>
{:else}
    <div>Loading...</div>
{/if}
