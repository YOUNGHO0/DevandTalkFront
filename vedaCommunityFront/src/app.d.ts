// See https://svelte.dev/docs/kit/types#app.d.ts
// for information about these interfaces
declare global {
	namespace App {
		// interface Error {}
		// interface Locals {}
		// interface PageData {}
		// interface PageState {}
		// interface Platform {}
		interface CommunityUserReadResponseDto {
			nickname: string;
		}

		interface CommentDto {
			id: number;
			createdAt: string;
			commentContent: string;
			author: CommunityUserReadResponseDto;
			childCommentList: CommentDto[] | null;
		}

		interface Author {
			nickname: string;
			vedaOrder: bigint;
		}

		interface Pageable {
			pageNumber: number;
			pageSize: number;
			offset: number;
			unpaged: boolean;
			sort: Sort;
		}

		interface Sort {
			empty: boolean;
			unsorted: boolean;
			sorted: boolean;
		}

		interface Article {
			id : bigint
			title: string;
			content: string;
			author: Author;
			createdDate: string;
		}

		interface ArticleResponse {
			content: Article[];
			pageable: Pageable;
			totalElements: number;
			totalPages: number;
			size: number;
			number: number;
			numberOfElements: number;
			first: boolean;
			last: boolean;
			empty: boolean;
		}

		interface ArticleCreateDto {
			title: string;
			content: string;
		}
		interface ArticleUpdateDto {
			"id" : bigint,
			"title" : string,
			"content" : string
		}
	}
}

export {};
