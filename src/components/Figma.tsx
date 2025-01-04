import React, { Fragment, useState } from "react";
import { keyframes, styled } from "storybook/internal/theming";
import { FigmaIcon } from '@storybook/icons';

import { transparentize } from 'polished';

interface FigmaProps {

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
});

const Notification = styled.div<{ duration?: number }>(
	({ theme }) => ({
		fontFamily: `"Nunito Sans",-apple-system,".SFNSText-Regular","San Francisco",BlinkMacSystemFont,"Segoe UI","Helvetica Neue",Helvetica,Arial,sans-serif`,

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

export const Figma: React.FC<FigmaProps> = () => {
	return (
		<>
			<Container>
				
			</Container>
			<Notification>
				<NotificationIconWrapper>
					<FigmaIcon />
				</NotificationIconWrapper>
				<NotificationTextWrapper>
					<Headline>
						Storybook Love Figma
					</Headline>
					<SubHeadline>
						URL not found
					</SubHeadline>
				</NotificationTextWrapper>
			</Notification>
		</>
	);
}