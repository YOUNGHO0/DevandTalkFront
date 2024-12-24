 <script lang="ts">

     import {onMount} from "svelte";

     export let data;
     import {userStatus} from "../../../stores/user.js";
     import UpdateArticle from "../../../components/article/UpdateArticle.svelte";
     import Article from "../../../components/article/Article.svelte";
     import CommentList from "../../../components/comment/CommentList.svelte";
     const apiUrl = import.meta.env.VITE_API_URL;
     let response: App.Article;
     let editMode: boolean = false;
     let id :bigint = BigInt(data.id);
     onMount(async()=>{
         const apiResponse = await fetch(`${apiUrl}/api/v1/article/${data.id}`, {
             method: "GET",
             headers: {
                 "Content-Type": "application/json",
             },
             credentials: "include", // 쿠키를 포함시켜 요청
         });
         response = await apiResponse.json();
     })

 </script>


 <style>

 </style>


 {#if editMode}
     <UpdateArticle {response} bind:editMode ></UpdateArticle>
 {:else}
     <Article {response} bind:editMode></Article>
 {/if}

 <CommentList {id} />

