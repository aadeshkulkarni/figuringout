interface PostQueryBase {
	select: {
		content: boolean;
		title: boolean;
		id: boolean;
		publishedDate: boolean;
		author: { select: { name: boolean } };
		published: boolean;
		tagsOnPost: { select: { tag: { select: { id: boolean; tagName: boolean } } } };
	};
}

interface PostQueryWithWhere extends PostQueryBase {
	where?: { authorId?: string; tagsOnPost?: { some: { tag: { id: string } } } };
}

export const buildQuery = (
	userId: string | undefined,
	tagId: string | undefined
): PostQueryWithWhere => {
	let baseQuery: PostQueryWithWhere = {
		select: {
			content: true,
			title: true,
			id: true,
			publishedDate: true,
			author: { select: { name: true } },
			published: true,
			tagsOnPost: { select: { tag: { select: { id: true, tagName: true } } } },
		},
	};
	if (userId) {
		baseQuery = { ...baseQuery, where: { ...baseQuery.where, authorId: userId } };
	}
	if (tagId) {
		baseQuery = {
			...baseQuery,
			where: { ...baseQuery.where, tagsOnPost: { some: { tag: { id: tagId } } } },
		};
	}
	return baseQuery;
};
