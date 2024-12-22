<!-- src/routes/article/[id]/+page.svelte -->
<script>
    // `data` 객체를 통해 `load` 함수에서 전달된 데이터를 가져옴
    import {onMount} from "svelte";

    const apiUrl = import.meta.env.VITE_API_URL;
    export let data;
    let response ={};


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

        })
</script>

<h1>Article ID: {response.content}</h1>