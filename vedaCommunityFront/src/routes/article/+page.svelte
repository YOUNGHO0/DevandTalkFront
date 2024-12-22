<script lang="ts">
    import { onMount } from "svelte";
    const apiUrl = import.meta.env.VITE_API_URL;

    interface Author {
        nickname: string;
        vedaOrder: bigint;
    }

    interface Pageable {
        pageNumber: number;
        pageSize: number;
        offset: number;
        unpaged: boolean;
        sort: Sort;
    }

    interface Sort {
        empty: boolean;
        unsorted: boolean;
        sorted: boolean;
    }

    interface Article {
        title: string;
        content: string;
        author: Author;
        createdDate: string;
    }

    interface ArticleResponse {
        content: Article[];
        pageable: Pageable;
        totalElements: number;
        totalPages: number;
        size: number;
        number: number;
        numberOfElements: number;
        first: boolean;
        last: boolean;
        empty: boolean;
    }

    let errorMessage = "";
    let articles: ArticleResponse = {
        content: [],
        pageable: {
            pageNumber: 0,
            pageSize: 20,
            offset: 0,
            unpaged: false,
            sort: { empty: true, unsorted: true, sorted: false },
        },
        totalElements: 0,
        totalPages: 1,
        size: 20,
        number: 0,
        numberOfElements: 0,
        first: true,
        last: true,
        empty: true,
    };

    let currentPage = 0;

    // 페이지 데이터 로드 함수
    async function loadArticles(page: number) {
        try {
            const apiResponse = await fetch(`${apiUrl}/api/v1/article/list?page=${page}&size=20`, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                },
                credentials: "include", // 쿠키를 포함시켜 요청
            });
            const data = await apiResponse.json();
            articles = data; // 받은 데이터를 articles에 저장
            currentPage = page; // 현재 페이지 설정
        } catch (e) {
            console.error("오류 발생:", e.message);
            errorMessage = "게시물을 불러오는 데 실패했습니다.";
        }
    }

    onMount(() => {
        loadArticles(0); // 페이지 로드 시 1페이지 데이터를 불러옴
    });

    function formatDate(dateString: string) {
        return new Date(dateString).toLocaleDateString("ko-KR");
    }

    // 페이지 변경 함수
    function goToPage(page: number) {
        loadArticles(page);
    }
</script>

<style>
    .article {
        margin: 10px;
        box-shadow: 0 1px 3px rgba(0, 0, 0, 0.12), 0 1px 2px rgba(0, 0, 0, 0.24);
        transition: all 0.3s cubic-bezier(.25, .8, .25, 1);
    }

    .pagination {
        display: flex;
        justify-content: center;
        margin-top: 20px;
    }

    .active {
        background-color: #007bff;
        color: white;
    }

    button {
        padding: 5px;
        margin: 2px;
        border-radius: 4px;
        border: 1px solid #ddd;
        cursor: pointer;
    }

    button:disabled {
        background-color: #ccc;
        cursor: not-allowed;
    }
</style>

{#if errorMessage}
    <div class="error">{errorMessage}</div> <!-- 오류가 있을 경우 표시 -->
{:else}
    <div class="articles" style="margin: 10px">
        <h2 style="margin: 15px">자유게시판</h2>
        {#each articles.content as article}
            <div class="article" style="display: flex; padding: 12px">
                <div style="font-size: 12px; justify-content: center; text-align: center">
                    {formatDate(article.createdDate)}
                </div>
                <div
                        style="font-size: 12px; padding-left: 20px; overflow: hidden; text-overflow: ellipsis; white-space: nowrap; max-width: 150px;"
                >
                    {article.title}
                </div>
                <div style="margin-left: auto; font-size: 11px">
                    {article.author.vedaOrder}기 {article.author.nickname}
                </div>
            </div>
        {/each}

        <!-- 페이지네이션 -->
        <div class="pagination">
            <button on:click={() => goToPage(0)} disabled={articles.first}>첫 페이지</button>
            <button on:click={() => goToPage(currentPage - 1)} disabled={articles.first}>이전</button>
            {#each Array(articles.totalPages).fill(0) as _, index}
                <button
                        on:click={() => goToPage(index)}
                        class={index === currentPage ? "active" : ""}
                >
                    {index + 1}
                </button>
            {/each}
            <button on:click={() => goToPage(currentPage + 1)} disabled={articles.last}>다음</button>
            <button on:click={() => goToPage(articles.totalPages - 1)} disabled={articles.last}>마지막 페이지</button>
        </div>
    </div>
{/if}
