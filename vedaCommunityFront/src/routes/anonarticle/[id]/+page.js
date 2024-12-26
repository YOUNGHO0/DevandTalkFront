export function load({ params }) {
    // `params.id`에서 동적 파라미터를 가져옵니다.
    console.log(params);
    return {
        id: params.id // 이 데이터를 `+page.svelte`로 전달
    };
}