    
    <script lang="ts">
    let { children } = $props();
      // 외부 클릭 시 Drawer 닫기
     import { onMount, onDestroy } from 'svelte';
     import Drawer, {
       AppContent,
       Content,
       Header,
       Title,
       Subtitle,
       Scrim,
     } from '@smui/drawer';
     import Button, { Label } from '@smui/button';
     import List, { Item, Text, Graphic, Separator, Subheader } from '@smui/list';
   
     let open = $state(false);
     let active = $state('Inbox');
   
     function setActive(value: string) {
       active = value;
       open = false;
     }

     import TopAppBar, {
       Row,
       Section,
       AutoAdjust,
     } from '@smui/top-app-bar';
     import IconButton from '@smui/icon-button';
     let topAppBar: TopAppBar | null = $state(null);

   // 클라이언트 측에서만 실행되도록 보장
   function handleOutsideClick(event: MouseEvent) {
       const target = event.target as HTMLElement | null;

       // target이 null이 아니고 '.drawer-container'가 포함되지 않으면 open을 false로 설정
       if (target && !target.closest('.drawer-container')) {
           open = false;
       }
  }

  onMount(() => {
    // 클라이언트에서만 실행되도록 이벤트 리스너 추가
    if (typeof window !== 'undefined') {
      document.addEventListener('mousedown', handleOutsideClick);
    }
  });

  onDestroy(() => {
    if (typeof window !== 'undefined') {
      document.removeEventListener('mousedown', handleOutsideClick);
    }
  });
   </script>
   
   <style>
     /* These classes are only needed because the
       drawer is in a container on the page. */


       :global(.mdc-top-app-bar) {
    margin: 0; /* 기본 마진을 없애고 */
    padding: 0; /* 필요시 패딩도 없애기 */
  }


     .drawer-container {
       position: relative;
       display: flex;
       height: 500px;
       max-width: 600px;
       border: 20px solid
         var(--mdc-theme-text-hint-on-background, rgba(0, 0, 0, 0.1));
       overflow: hidden;
       z-index: 0;
     }
   
     * :global(.app-content) {
       flex: auto;
       overflow: auto;
       position: relative;
       flex-grow: 1;
     }
   
     .main-content {
       overflow: auto;
       padding: 16px;
       height: 100%;
       box-sizing: border-box;
     }
     :global(.section) {
     display: flex;
     justify-content: center; /* 가로 중앙 정렬 */
     align-items: center;    /* 세로 중앙 정렬 */
   }
     :global(#smui-app),
     :global(body),
     :global(html) {
       display: block !important;
       height: auto !important;
       width: auto !important;
       position: static !important;
     }
     :global(.mdc-drawer){
      top : 65px
     }

     .top-app-bar-row {
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 100%;
  }


 
  .mdc-drawer--modal {
    z-index: 1200; /* Drawer의 z-index 값을 TopAppBar보다 높게 설정 */
  }


  :global(.mdc-top-app-bar--fixed) {
    position: fixed;
    top: 0; /* 상단에 정확히 고정 */
    left: 0; /* 왼쪽에 정확히 고정 */
    right: 0; /* 오른쪽 끝까지 고정 */
    z-index: 1000; /* 다른 요소들과 겹치지 않도록 높은 z-index 설정 */
    margin: 0; /* 기본 마진 제거 */
    padding: 0; /* 패딩 제거 */
  }

  .title {
    padding-top: 5px;
    align-items: center;
    justify-content: center;
    font-size: 25px;
  }
  
  :global(.nickname){
    font-family: 'Courier New', Courier, monospace;
  }
  :global(.mdc-drawer__header){
    padding-top: 5px;

  }
   </style>




 
  
  
  
  
  
  
  
  
  
<TopAppBar bind:this={topAppBar} variant="fixed">
  <Row class="top-app-bar-row">
    <Section class="left-section">
      <IconButton class="material-icons" onclick={() => (open = !open)}>menu</IconButton>
    </Section>
    <Section class="center-section">
      <div class="title">embeandtalk</div>
    </Section>
  </Row>
</TopAppBar>
    <AutoAdjust {topAppBar}>
    </AutoAdjust>

    <Drawer variant="modal" fixed={false} bind:open>
      <Header>
        <Title class="nickname">닉네임 위치</Title>

      </Header>

      <Separator />
      <Content>
        <List>
          <Item href="/hello">
           자유게시판
          </Item>



        </List>
      </Content>
    </Drawer>

    <div>
      {@render children()}
      this is main content
        <Button>
          Settings
        </Button>
    </div>
  


