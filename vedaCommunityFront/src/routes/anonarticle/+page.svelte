<script lang="ts">
    import { onMount } from "svelte";
    import { goto } from '$app/navigation'; // SvelteKit의 goto 함수 사용
    import {formatDate} from "../../utils/helper"
    import Button from "@smui/button";
    import Paper from "@smui/paper";
    const apiUrl = import.meta.env.VITE_API_URL;


    let errorMessage = "";
    let anonArticles: App.AnonArticleResponse = {
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
    let startPage = 0; // 현재 표시되는 페이지네이션의 시작 페이지

    // 페이지 데이터 로드 함수
    async function loadArticles(page: number) {
        try {
            const apiResponse = await fetch(`${apiUrl}/api/v1/anonArticle/list?page=${page}&size=20&sort=createdDate,desc`, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                },
                credentials: "include", // 쿠키를 포함시켜 요청
            });
            const data = await apiResponse.json();
            anonArticles = data; // 받은 데이터를 articles에 저장
            currentPage = page; // 현재 페이지 설정

            // 페이지네이션의 시작 페이지를 갱신
            const newStartPage = Math.floor(page / 5) * 5;
            startPage = newStartPage;
        } catch (e) {
            console.error("오류 발생:", e.message);
            errorMessage = "게시물을 불러오는 데 실패했습니다.";
        }
    }

    onMount(() => {
        loadArticles(0); // 페이지 로드 시 첫 페이지 데이터를 불러옴
    });



    // 페이지 변경 함수
    function goToPage(page: number) {
        loadArticles(page);
    }
    function navigateToAnonArticle(id:number) {
        goto(`/anonarticle/${id}`); // SvelteKit의 라우팅으로 이동
    }
</script>

<style>
    .article {
        margin-bottom: 10px;
        box-shadow: 0 1px 3px rgba(0, 0, 0, 0.12), 0 1px 2px rgba(0, 0, 0, 0.24);
        transition: all 0.3s cubic-bezier(.25, .8, .25, 1);
    }

    .pagination {
        display: flex;
        justify-content: center; /* 버튼 중앙 정렬 */
        align-items: center; /* 세로로 버튼 중앙 배치 */
        gap: 5px; /* 버튼 간격 */
        flex-wrap: nowrap; /* 줄바꿈 방지 */
        overflow-x: auto; /* 버튼이 많을 경우 가로 스크롤 허용 */
        padding: 10px; /* 컨테이너 안쪽 여백 */
    }

    button {
        padding: 8px 12px; /* 버튼 크기 */
        border-radius: 4px;
        border: 1px solid #ddd;
        cursor: pointer;
        font-size: 14px;
        text-align: center;
        white-space: nowrap; /* 텍스트 줄바꿈 방지 */
    }

    button.active {
        background-color: #007bff;
        color: white;
    }

    button:disabled {
        background-color: #ccc;
        cursor: not-allowed;
    }

    /* 부모 컨테이너 크기를 넘지 않도록 제한 */
    .pagination {
        max-width: 100%; /* 부모 컨테이너의 최대 너비를 화면 너비로 제한 */
        overflow-x: hidden; /* 불필요한 스크롤 제거 */
    }

    /* 반응형: 화면이 작아질 때 버튼 크기 조정 */
    @media (max-width: 768px) {
        button {
            padding: 6px 10px; /* 버튼 크기 축소 */
            font-size: 12px; /* 글자 크기 축소 */
        }

        .pagination {
            gap: 3px; /* 간격 축소 */
        }
    }
</style>

{#if errorMessage}
    <div class="error">{errorMessage}</div> <!-- 오류가 있을 경우 표시 -->
{:else}

    <div class="articles" style="margin: 25px; ">
        <div style="display: flex; justify-content: center; align-items: center">
            <h2 style="margin-left: 5px; margin-bottom: 20px;">익명게시판</h2>
            <Button href="anonarticle/create" color="secondary" variant="raised" style="font-weight: bold ;font-size: 12px; width: 70px; display: flex; margin-left: auto">글쓰기</Button>
        </div>
        {#each anonArticles.content as anonArticle}
            <Paper square onclick={() => navigateToAnonArticle(anonArticle.id)}  class="article" style="display: flex; padding: 12px; margin-top: 5px">


                <div style="font-size: 12px; justify-content: center; text-align: center">
                    {formatDate(anonArticle.createdDate)}
                </div>
                <div
                        style="font-weight: bold; font-size: 12px; padding-left: 20px; overflow: hidden; text-overflow: ellipsis; white-space: nowrap; max-width: 150px;"
                >
                    {anonArticle.title}
                </div>
                <div style="margin-left: auto; font-size: 11px">
                 익명의 사용자
                </div>
            </Paper>
        {/each}


        <!-- 페이지네이션 -->
        <div class="pagination" style="justify-content: center; align-items: center; display: flex; margin: 0px">
            <div style="margin-left: auto;">

                <button
                        onclick={() => (startPage > 0 ? goToPage(startPage - 1) : null)}
                        disabled={startPage === 0}
                >
                    이전
                </button>
                {#each Array(5).fill(0) as _, index (startPage + index)}
                    {#if startPage + index < anonArticles.totalPages}
                        <button
                                onclick={() => goToPage(startPage + index)}
                                class={startPage + index === currentPage ? "active" : ""}
                        >
                            {startPage + index + 1}
                        </button>
                    {/if}
                {/each}
                <button
                        onclick={() => (startPage + 5 < anonArticles.totalPages ? goToPage(startPage + 5) : null)}
                        disabled={startPage + 5 >= anonArticles.totalPages}
                >
                    다음
                </button>
            </div>
            <Button href="anonarticle/create" variant="raised" style="width: 80px; display: flex; margin-left: auto">글쓰기</Button>
        </div>

    </div>
{/if}
