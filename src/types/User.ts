export type User = {
	username: string;
	globalName: string;
	discriminator: string;
	bannerColor: {
		value: number;
		r: number;
		g: number;
		b: number;
	};
	bannerUrl: string | null;
	avatarUrl: string;
	defaultAvatarUrl: string;
	mfaEnabled: boolean;
	verified: boolean;
	email: string | null;
	locale: string;
	oAuthFlags: number;
	flags: number;

	mention?: string | null;
	creationTimestamp?: string;
}