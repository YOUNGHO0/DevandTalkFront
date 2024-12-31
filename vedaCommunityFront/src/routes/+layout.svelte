    
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
    const fetchWithTimeout = async (url:string, options = {}, timeout = 5000) => {
        const controller = new AbortController();
        const timeoutId = setTimeout(() => controller.abort(), timeout);

        try {
            const response = await fetch(url, {
                ...options,
                signal: controller.signal,
            });
            clearTimeout(timeoutId);
            return response;
        } catch (error:any) {
            clearTimeout(timeoutId);
            if (error.name === 'AbortError') {
                throw new Error('Request timed out');
            }
            throw error;
        }
    };

    async function checkUserStatus() {
        console.log("유저 상태 체크");

        try {
            const apiResponse = await fetchWithTimeout(`${apiUrl}/api/v1/user`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                },
                credentials: 'include',
            }, 5000); // 타임아웃 5초 설정

            console.log(`Response Status: ${apiResponse.status}`);

            // 상태 코드에 따라 처리
            switch (apiResponse.status) {
                case 200: {
                    const json = await apiResponse.json();
                    userStatus.set({ userNickname: json.nickname, isLoggedIn: true });
                    break;
                }
                case 401:
                    handleRedirection('/login');
                    break;
                case 403:
                    handleRedirection('/temp');
                    break;
                default:
                    handleRedirection('/serverError');
                    break;
            }
        } catch (error:any) {
            console.error('Error occurred:', error.message);
            handleRedirection('/serverError');
        }
    }

    // 리다이렉션 및 상태 초기화를 처리하는 함수
    function handleRedirection(targetPath:string) {
        if (window.location.pathname !== targetPath) {
            window.location.href = targetPath;
        }
        userStatus.set({ userNickname: null, isLoggedIn: false });
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
     }

     :global(.drawerTotal) {
         position: fixed; /* 화면에 고정 */
         top: 56px; /* TopAppBar 아래에 위치 */
         left: 0; /* 화면 왼쪽에 고정 */
         height: calc(100% - 65px); /* 화면 전체 높이에서 TopAppBar 높이를 뺀 값 */
         z-index: 1200; /* TopAppBar보다 위에 표시 */
         overflow-y: auto; /* 내용이 넘칠 경우 스크롤 가능 */
         width: 250px; /* Drawer의 너비 */
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
            <div style="display: flex; justify-content: space-between; align-items: center; width: 100%;">
                <div style="width: 100%; margin-right: auto;">
                    <IconButton class="material-icons" onclick={() => (open = !open)}>menu</IconButton>
                </div>
                <div class="title" style="width: 100%; text-align: center">DevAndTalk</div>
                <div style="width: 100%">

                </div>
            </div>

        </Row>
    </TopAppBar>
    <AutoAdjust {topAppBar}>
    </AutoAdjust>

    <Drawer class="drawerTotal" variant="modal" fixed={true} bind:open>
        <div class="nicknameWrapper">
            <h3 class="nickname">{$userStatus.userNickname}</h3>
            {#if $userStatus.isLoggedIn}
            <Button  style="color: white; width: 30px; font-size: 10px" onclick={handleLogout} class="logout-button">로그아웃</Button>
            {/if}
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
  


