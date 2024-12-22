<!-- src/routes/article/[id]/+page.svelte -->
<script>
    // `data` 객체를 통해 `load` 함수에서 전달된 데이터를 가져옴
    export let data;

    // 필요한 데이터 추출
    $: id = data.id;
    console.log(id); // 디버깅: 제대로 된 값인지 확인
</script>

<h1>Article ID: {id}</h1>