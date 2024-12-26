

<script lang="ts">
    import {onMount} from "svelte";
    import {get} from "svelte/store";
    import CardLayout from "../components/main/CardLayout.svelte";

    const apiUrl = import.meta.env.VITE_API_URL;

    let articleData : App.MainArticle[] = $state([]);
    let anonArticleData : App.MainArticle[] = $state([]);
    // async/await를 사용하여 비동기적으로 데이터를 가져오고 Promise를 반환
    async function getArticleList(type: string): Promise<App.MainArticle[]> {
        try {
            const apiResponse = await fetch(`${apiUrl}/api/v1/${type}/list?size=10`, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                },
                credentials: "include", // 쿠키를 포함시켜 요청
            });

            // JSON 데이터를 가져와 articleData에 저장
            let data ;// Svelte store에 배열 타입을 지정
            data = await apiResponse.json();
            console.log(data);
            return data.content; // 비동기 함수는 Promise를 반환해야 하므로 이를 반환
        } catch (e) {
            console.log("예외발생", e);
            return [];  // 에러가 발생하면 빈 배열을 반환
        }
    }

    onMount(async()=>{
        articleData = await getArticleList("article");
        anonArticleData = await getArticleList("anonArticle")
    })
</script>



<div
        style="display: flex; flex-wrap: wrap; gap: 20px; justify-content: center;">
    <!-- CardLayout 컴포넌트를 2개 나란히 배치하며, 화면이 좁아지면 아래로 이동 -->
    <CardLayout type="article" title="자유게시판" dataList={articleData} style="flex: 1 1 300px;"/>
    <CardLayout type="anonArticle" title="익명게시판" dataList={anonArticleData} style="flex: 1 1 300px;"/>
</div>