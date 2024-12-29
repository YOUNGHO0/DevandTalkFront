
<script>

    import {goto} from "$app/navigation";

    const apiUrl = import.meta.env.VITE_API_URL;
</script>





<div style=" width:300px; justify-content: center; align-items: center; margin-left: auto; margin-right: auto; ">
    <h2 >로그인 해주세요</h2>
    <a href={`${apiUrl}/oauth2/authorization/google`} >
    <img style="width: 300px; " src="/google.png" onclick={()=>{console.log("wht")}}/>
    </a>
</div>

