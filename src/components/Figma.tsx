import React, { useEffect, useState } from "react";
import { keyframes, styled } from "storybook/internal/theming";
import { FigmaIcon } from '@storybook/icons';
import { FIGMA_CLIENT } from "../constants";

import { transparentize } from 'polished';
import { Progress } from "./Progress";

export interface FigmaProps {
	url: string;
	options?: {
		opacity: number;
		left: number;
		top: number;
	}
}

const slideIn = keyframes({
	'0%': {
		opacity: 0,
		transform: 'translateY(30px)',
	},
	'100%': {
		opacity: 1,
		transform: 'translateY(0)',
	},
});

const grow = keyframes({
	'0%': {
		width: '0%',
	},
	'100%': {
		width: '100%',
	},
});

const Container = styled.div({
	position: "absolute",
	left: 0,
	top: 0,
	zIndex: 9999,
	margin: "1rem",
	pointerEvents: "none"
});

const Notification = styled.div<{ duration?: number }>(
	({ theme }) => ({
		fontFamily: `"Nunito Sans",-apple-system,".SFNSText-Regular","San Francisco",BlinkMacSystemFont,"Segoe UI","Helvetica Neue",Helvetica,Arial,sans-serif`,

		width: "280px",

		position: "absolute",
		right: "0",
		bottom: "1rem",
		display: "flex",
		border: `1px solid ${theme.appBorderColor}`,
		padding: '12px',
		borderRadius: '4px 0 0 4px',
		alignItems: 'center',

		animation: `${slideIn} 500ms`,
		background: 'hsla(203, 50%, 20%, .97)',
		boxShadow: `0 2px 5px 0 rgba(0, 0, 0, 0.05), 0 5px 15px 0 rgba(0, 0, 0, 0.1)`,
		color: '#FFFFFF',
		textDecoration: 'none',
		overflow: 'hidden',
	}), ({ duration, theme }) => 
		duration && {
			'&::after': {
				content: '""',
				display: 'block',
				position: 'absolute',
				bottom: 0,
				left: 0,
				height: 3,
				background: theme.color.secondary,
				animation: `${grow} ${duration}ms linear forwards reverse`,
			},
		}
);

const NotificationIconWrapper = styled.div({
	display: 'flex',
	marginRight: 10,
	alignItems: 'center',

	svg: {
		width: 16,
		height: 16,
	},
});

const NotificationTextWrapper = styled.div({
	width: '100%',
	display: 'flex',
	flexDirection: 'column',
	color: '#ECF4F9'
});

const Headline = styled.div({
	height: '100%',
	alignItems: 'center',
	whiteSpace: 'balance',
	overflow: 'hidden',
	textOverflow: 'ellipsis',
	fontSize: "12px",
	fontWeight: '700',
	lineHeight: '16px',
});

const SubHeadline = styled.div({
	color: transparentize(0.25, '#FFFFFF'),
	fontSize: 11,
	lineHeight: '14px',
	marginTop: 2,
	whiteSpace: 'balance',
});

export const Figma: React.FC<FigmaProps> = ({ url, options }) => {
	const [imageSrc, setImageSrc] = useState<string | undefined>();

	const [loadingImage, setLoadingImage] = useState<boolean>(false);
	const [error, setError] = useState<string | undefined>();

	useEffect(() => {
		setLoadingImage(true);

		if(!url) {
			setError("There is not image configured for this component.");
			setLoadingImage(false);

			return;
		}

		const urlProvided = new URL(url);
		const nodeId = urlProvided.searchParams.get("node-id");
		const fileId = urlProvided.pathname.split("/")[2];

		if (!nodeId || !fileId) {
			setError("Invalid Figma link");
			setLoadingImage(false);

			return;
		}

		setError(undefined);

		FIGMA_CLIENT.fileImages(fileId, {
			ids: [nodeId],
			format: "svg",
		}).then(({ data }) => {
			const nodeIdKey = nodeId.replace("-", ":");
			const imageUrl = data.images[nodeIdKey];

			if(imageUrl) {
				setImageSrc(imageUrl);
			} else {
				setImageSrc(undefined);
				setError("The configured image for the current viewport width is invalid or can not be fetched.");
				setLoadingImage(false);
			}
		}).catch((error) => {
			setLoadingImage(false);
			setError(`An error ocurred while loading the image. "${error}"`)
		});
	}, [url]);

	return (
		<>
			<Progress isAnimating={loadingImage} />

			<Container style={{ left: options?.left || 0, top: options?.top || 0 }}>
				{imageSrc && (
					<img 
						src={imageSrc} 
						onLoad={() => setLoadingImage(false)} 
						style={{ opacity: options?.opacity || 0.5 }} 
					/>
				)}
			</Container>
			
			{error && (
				<Notification>
					<NotificationIconWrapper>
						<FigmaIcon />
					</NotificationIconWrapper>
					<NotificationTextWrapper>
						<Headline>
							Storybook Love Figma
						</Headline>
						<SubHeadline>
							{error}
						</SubHeadline>
					</NotificationTextWrapper>
				</Notification>
			)}
		</>
	);
}