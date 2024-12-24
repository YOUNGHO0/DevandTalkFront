    
    <script lang="ts">
    import {userStatus} from "../stores/user";

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
            if (apiResponse.status === 200) {
                console.log('200 received');
                let json = await apiResponse.json();
                userStatus.set({ userNickname: json.nickname, isLoggedIn : true });
            } else if (apiResponse.status === 401) {
                console.log(window.location.pathname)
                if (window.location.pathname !== '/login') {
                    window.location.href = '/login';
                    userStatus.set({ userNickname: null, isLoggedIn : false });
                }
            } else if (apiResponse.status === 403) {
                if (window.location.pathname !== '/temp') {
                    window.location.href = '/temp';
                    userStatus.set({ userNickname: null, isLoggedIn : false });
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



  :global(.mdc-top-app-bar--fixed) {
    position: fixed;
    top: 0; /* 상단에 정확히 고정 */
    left: 0; /* 왼쪽에 정확히 고정 */
    right: 0; /* 오른쪽 끝까지 고정 */
    z-index: 1000; /* 다른 요소들과 겹치지 않도록 높은 z-index 설정 */
    margin: 0; /* 기본 마진 제거 */
    padding: 0; /* 패딩 제거 */
  }

  :global(.nickname){
    font-family: 'Courier New', Courier, monospace;
  }
  :global(.mdc-drawer__header){
    padding-top: 5px;

  }

     .top-app-bar-row {
         display: flex;
         justify-content: space-between; /* 양쪽 끝 정렬 */
         align-items: center;
         width: 100%;
     }

     .left-section,
     .right-section {
         flex: 0 0 auto; /* 기본 너비를 내용 크기로 제한 */
         display: flex;
         align-items: center;
     }

     .center-section {
         flex: 1; /* 남은 공간을 모두 차지 */
         display: flex;
         justify-content: center; /* 가로 정렬 중앙 */
         align-items: center; /* 세로 정렬 중앙 */
     }

     .title {
         margin: 0; /* 여백 제거 */
         padding: 0; /* 패딩 제거 */
         text-align: center;
         font-size: 25px; /* 원하는 크기로 설정 */
     }

     :global(.mdc-drawer) {
         position: fixed; /* 화면에 고정 */
         top: 65px; /* TopAppBar 아래에 배치 */
         left: 0; /* 화면 왼쪽에 고정 */
         height: calc(100% - 65px); /* 화면 전체 높이에서 TopAppBar 높이를 뺀 값 */
         z-index: 1200; /* 다른 요소 위에 표시 */
         overflow-y: auto; /* 내용이 많을 경우 스크롤 가능 */
         box-shadow: 0 4px 6px rgba(0, 0, 0, 0.2); /* 약간의 그림자 추가 */
         background-color: white; /* Drawer 배경 색상 */
     }

     :global(.drawerTotal) {
         position: fixed; /* 화면에 고정 */
         top: 56px; /* TopAppBar 아래에 위치 */
         left: 0; /* 화면 왼쪽에 고정 */
         height: calc(100% - 65px); /* 화면 전체 높이에서 TopAppBar 높이를 뺀 값 */
         z-index: 1200; /* TopAppBar보다 위에 표시 */
         overflow-y: auto; /* 내용이 넘칠 경우 스크롤 가능 */
         width: 200px; /* Drawer의 너비 */
         background-color: white; /* Drawer 배경 색상 */
     }

     :global(.mdc-drawer__header) {
         padding-top: 5px;
     }

     :global(.nicknameWrapper) {
         display: flex;
         justify-content: space-between;
         align-items: center;
         background-color: #ff3e00;
         padding: 15px;
         color: white;
     }

   </style>













    <TopAppBar bind:this={topAppBar} variant="fixed">
        <Row class="top-app-bar-row">
            <Section class="left-section">
                <!-- 왼쪽 메뉴 아이콘 -->
                <IconButton class="material-icons" onclick={() => (open = !open)}>menu</IconButton>
            </Section>
            <Section class="center-section">
                <!-- 제목 -->
                <div class="title">EmbeAndTalk</div>
            </Section>
            <Section class="right-section">
                <!-- 오른쪽 섹션 비워두기 -->
            </Section>
        </Row>
    </TopAppBar>>
    <AutoAdjust {topAppBar}>
    </AutoAdjust>

    <Drawer class="drawerTotal" variant="modal" fixed={true} bind:open>
        <div class="nicknameWrapper">
            <h3 class="nickname">닉네임 위치</h3>
            <Button  style="color: white; width: 30px; font-size: 10px" onclick={handleLogout} class="logout-button">로그아웃</Button>
        </div>

        <Content>
            <List>
                <Item href="/article" style="width: 100%">자유게시판</Item>
                <Separator />
                <Item href="/anonarticle">익명게시판</Item>
                <Separator />
            </List>
        </Content>
    </Drawer>


    <div>
      {@render children()}
    </div>
  


