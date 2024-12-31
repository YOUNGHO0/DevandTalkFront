
<script lang="ts">

    import {formatDate} from "../../utils/helper.js";
    import "../../utils/common.css"
    let {dataList, title, type}:{ dataList:App.MainArticle[],title:string,type:string} = $props();
    import List, { Item, Text, Graphic, Separator, Subheader } from '@smui/list';
    import {goto} from "$app/navigation";
    import Button from "@smui/button";
    const apiUrl = import.meta.env.VITE_API_URL;
    import Paper, { Title, Content } from '@smui/paper';
</script>


<Paper variant="unelevated" style="width: 400px">
    <div style="display: flex; align-items: center; justify-content: center; padding: 10px">
        <h2 style="font-size: 20px; margin: 0px;      ">{title}</h2>
        <Button href={`/${type}`} style="margin-left: auto" variant="outlined">More</Button>
    </div>

    <Separator></Separator>
    {#each dataList as data}
        <div onclick={()=>{goto(`/${type}/${data.id}`)}}  style="display: flex;justify-content: flex-start; padding: 10px;align-items: center;">
            <div style="font-size: 20px; margin-left: 20px"> {data.title} </div>
        </div>
        <Separator></Separator>

    {/each}

</Paper>
