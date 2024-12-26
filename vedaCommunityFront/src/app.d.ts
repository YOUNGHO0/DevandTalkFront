// See https://svelte.dev/docs/kit/types#app.d.ts
// for information about these interfaces
declare global {
	namespace App {
		interface CommunityUserReadResponseDto {
			nickname: string;
		}

		interface CommentDto {
			id: number;
			createdAt: string |null;
			commentContent: string;
			author: CommunityUserReadResponseDto |null;
			childCommentList: CommentDto[] | null;
		}
		interface AnonCommentDto {
			id: number;
			createdAt: string |null;
			commentContent: string;
			author: boolean,
			anonArticleAuthor:boolean,
			childCommentList: AnonCommentDto[] | null;
		}

		interface Author {
			nickname: string;
			vedaOrder: number;
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
			id : number
			title: string;
			content: string;
			author: Author;
			createdDate: string;
		}

		interface MainArticle{
			id: number;
			createdDate: string,
			title: string
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

		interface AnonArticleResponse {
			content: AnonArticle[];
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

		interface AnonArticle {
			id : number
			title: string;
			content: string;
			createdDate: string;
			author:boolean;
		}

		interface ArticleCreateDto {
			title: string;
			content: string;
		}
		interface AnonArticleCreateDto {
			title: string;
			content: string;
		}
		interface ArticleUpdateDto {
			"id" : number,
			"title" : string,
			"content" : string
		}
		interface AnonArticleUpdateDto {
			"id" : number,
			"title" : string,
			"content" : string
		}
		interface ArticleDeleteDto {
			"deleteId" : number;
		}
		interface AnonArticleDeleteDto {
			"anonArticleId" : number;
		}
		interface CommentCreateDto {
			"articleId": number
			"commentContent": string

		}
		interface AnonCommentCreateDto {
			"articleId": number
			"commentContent": string

		}
		interface CommentUpdateDto {
			commentId: number;
			content : string;
		}
		interface ChildCommentUpdateDto{
			parentId : number;
			commentContent :string;
		}
		interface CommentDeleteDto {
			commentId: number;
		}
	}
}

export {};
