<script lang="ts">
    import { onMount } from "svelte";

    const apiUrl = import.meta.env.VITE_API_URL;

    export let id: number;  // 부모에서 전달받을 id
    let comments: CommentDto[] = [];  // 댓글 데이터를 저장할 변수

    // CommentDto 타입 정의
    interface CommunityUserReadResponseDto {
        nickname: string;
    }

    interface CommentDto {
        id: number;
        createdAt: string;
        commentContent: string;
        author: CommunityUserReadResponseDto;
        childCommentList: CommentDto[] | null;
    }

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
                const data: CommentDto[] = await apiResponse.json();
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
                    <div>
                        <p><strong>{comment.author.nickname}</strong> says:</p>
                        <p>{comment.commentContent}</p>
                        <p><em>Created at: {comment.createdAt}</em></p>

                        {#if comment.childCommentList && comment.childCommentList.length > 0}
                            <div style="margin-left: 20px;">
                                <h4>Replies:</h4>
                                {#each comment.childCommentList as child}
                                    <div>
                                        <p><strong>{child.author.nickname}</strong> says:</p>
                                        <p>{child.commentContent}</p>
                                        <p><em>Created at: {child.createdAt}</em></p>
                                    </div>
                                {/each}
                            </div>
                        {/if}
                    </div>
                {/each}
            </div>
        {:else}
            <p>No comments found.</p>
        {/if}
    </div>
{:else}
    <div>Loading...</div>
{/if}
