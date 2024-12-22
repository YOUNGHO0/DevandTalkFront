
<script lang="ts">
    import {onMount} from "svelte";
    const apiUrl = import.meta.env.VITE_API_URL;
    // article 객체 타입 정의

    interface author{
        nickname : string;
        vedaOrder : bigint;
    }
    // Pageable 객체 타입 정의
    interface Pageable {
        pageNumber: number;
        pageSize: number;
        offset: number;
        unpaged: boolean;
        sort: Sort;
    }

    // Sort 객체 타입 정의
    interface Sort {
        empty: boolean;
        unsorted: boolean;
        sorted: boolean;
    }

    interface Article {
        title: string;
        content: string;
        author : author;
    }

    interface ArticleResponse {
        content: Article[];  // 실제 기사 내용 배열
        pageable: Pageable;   // 페이지 정보
        totalElements: number;  // 전체 아이템 수
        totalPages: number;     // 전체 페이지 수
        size: number;           // 페이지 크기
        number: number;         // 현재 페이지 번호
        numberOfElements: number;  // 현재 페이지의 아이템 수
        first: boolean;          // 첫 페이지 여부
        last: boolean;           // 마지막 페이지 여부
        empty: boolean;          // 내용이 비어있는지 여부
    }

    let errorMessage = ""; // 오류 메시지
    let articles: ArticleResponse  = {  // 초기값을 빈 객체로 할당
        content: [],
        pageable: {
            pageNumber: 0,
            pageSize: 20,
            offset: 0,
            unpaged: false,
            sort: { empty: true, unsorted: true, sorted: false }
        },
        totalElements: 0,
        totalPages: 1,
        size: 20,
        number: 0,
        numberOfElements: 0,
        first: true,
        last: true,
        empty: true
    };  // articles의 타입을 명시적으로 지정

    onMount(async () => {
        try {
            const apiResponse = await fetch(`${apiUrl}/api/v1/article/list`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                },
                credentials: 'include', // 쿠키를 포함시켜 요청
            });
            const data = await apiResponse.json();
            console.log(data)
            articles = data; // 받은 데이터를 articles에 저장

        } catch (e : any) {
            console.error("오류 발생:", e.message);  // 오류 메시지 출력
            console.log("오류 발생")
        }

    })
</script>

<div> this is article page</div>

{#if errorMessage}
    <div class="error">{errorMessage}</div> <!-- 오류가 있을 경우 표시 -->
{:else}
    <div class="articles">
        {console.log(articles)}
        {console.log(articles.content)}
        {#each articles.content as article}
                 <div class="article">
                {console.log(article)}
                <h2>{article.title}</h2>
                <div>{article.author.nickname}</div>
                <div>{article.author.vedaOrder}</div>
                <p>{article.content}</p>
            </div>
        {/each}
    </div>
{/if}





