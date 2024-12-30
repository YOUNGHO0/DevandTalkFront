 <script lang="ts">

     import {onMount} from "svelte";

     export let data;
     import {userStatus} from "../../../stores/user.js";
     import UpdateArticle from "../../../components/article/UpdateArticle.svelte";
     import Article from "../../../components/article/Article.svelte";
     import CommentList from "../../../components/comment/CommentList.svelte";
     import UpdateAnonArticle from "../../../components/anonArticle/UpdateAnonArticle.svelte";
     import AnonArticle from "../../../components/anonArticle/AnonArticle.svelte";
     import AnonCommentList from "../../../components/anoncomment/AnonCommentList.svelte";
     import {goto} from "$app/navigation";
     const apiUrl = import.meta.env.VITE_API_URL;
     let response: App.AnonArticle;
     let editMode: boolean = false;
     let id :number = Number(data.id);
     onMount(async()=>{
         const apiResponse = await fetch(`${apiUrl}/api/v1/anonArticle/${data.id}`, {
             method: "GET",
             headers: {
                 "Content-Type": "application/json",
             },
             credentials: "include", // 쿠키를 포함시켜 요청
         });
         if(apiResponse.status === 204 || apiResponse.status === 404 || apiResponse.status === 500){
             goto("/noarticle")
         }
         response = await apiResponse.json();
     })

 </script>


 <style>

 </style>


 {#if editMode}
     <UpdateAnonArticle {response} bind:editMode ></UpdateAnonArticle>
 {:else}
     <AnonArticle {response} bind:editMode></AnonArticle>
 {/if}

 <AnonCommentList {id} />

