    
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
        const nicknameWrapper = document.querySelector('.drawerTotal');

        // nicknameWrapper 외부 클릭 시만 실행
        if (nicknameWrapper && target && !nicknameWrapper.contains(target)) {
            open = false;
        }
    }

  onMount(() => {
      checkUserStatus();
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



    const apiUrl = import.meta.env.VITE_API_URL;

    // 모든 페이지에서 실행할 로직
    async function checkUserStatus() {
        try {
            const apiResponse = await fetch(`${apiUrl}/api/v1/user`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                },
                credentials: 'include', // 쿠키를 포함시켜 요청
            });
            console.log(apiResponse.status)
            console.log(await apiResponse.text())
            console.log(window.location.pathname)
            if (apiResponse.status === 200) {
                console.log('200 received');
            } else if (apiResponse.status === 401) {
                console.log(window.location.pathname)
                if (window.location.pathname !== '/login') {
                    window.location.href = '/login';
                }
            } else if (apiResponse.status === 403) {
                if (window.location.pathname !== '/temp') {
                    window.location.href = '/temp';
                }
            }
        } catch (error) {
            console.log('Error occurred:', error);
            if (window.location.pathname !== '/serverError') {
                window.location.href = '/serverError';
            }

        }
    }

    const handleLogout = async () => {
        try {
            console.log("버튼 클릭")
            const apiResponse = await fetch(`${apiUrl}/api/v1/user/logout`, {
                method: 'GET',
                headers: {
                    // 'Content-Type'을 제거하거나, 필요시 명시하지 않음
                },
                credentials: 'include', // 쿠키를 포함시켜 요청
            });

            if (apiResponse.ok) {
                // 로그아웃이 성공하면 처리할 로직 (예: 리디렉션, 상태 변경 등)
                window.location.href = "/login";  // 로그인 페이지로 리디렉션
            } else {
                // 실패한 경우 처리
                console.error("로그아웃 실패");
            }
        } catch (error) {
            console.error("로그아웃 중 오류 발생:", error);
        }
    };

    import { afterNavigate } from '$app/navigation';

    afterNavigate(() => {
        checkUserStatus()
        open = false;
    });

   </script>
   
   <style>
     /* These classes are only needed because the
       drawer is in a container on the page. */
     :global(.mdc-top-app-bar) {
    margin: 0; /* 기본 마진을 없애고 */
    padding: 0; /* 필요시 패딩도 없애기 */
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

    <Drawer class="drawerTotal" variant="modal" fixed={false} bind:open>
        <div class="nicknameWrapper" style="padding-left: 15px; padding-right: 15px; background-color: #ff3e00;display: flex; justify-content: center">
            <h3 style=" color: white;text-align: center ;" class="nickname">닉네임 위치</h3>
            <Button onclick={handleLogout} style=" color: white; font-size: 14px; text-align: center; margin-left: auto"> 로그아웃 </Button>
        </div>


      <Content>
        <List>
          <Item href="/article" style="width: 100%">
           자유게시판
          </Item>
        <Separator />
            <Item href="/anonarticle" >
                익명게시판
            </Item>
            <Separator />



        </List>
      </Content>
    </Drawer>

    <div>
      {@render children()}
    </div>
  


