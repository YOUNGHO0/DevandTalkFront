import { writable } from 'svelte/store';

// 사용자 상태를 저장할 스토어
export const userStatus = writable<{ userNickname : string |null, isLoggedIn: boolean | null }>({
    userNickname :null,
    isLoggedIn: null,   // 로그인 여부 저장
});