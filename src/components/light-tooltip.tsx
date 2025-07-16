import { styled } from '@mui/material/styles';
import Tooltip, { TooltipProps } from '@mui/material/Tooltip';
import React from 'react';

export const LightTooltip = styled(({ className, ...props }: TooltipProps) => (
    <Tooltip {...props} classes={{ popper: className }} />
))(({ theme }) => ({
    [`& .MuiTooltip-tooltip`]: {
        backgroundColor: theme.palette.common.white,
        color: 'rgba(0, 0, 0, 0.87)',
        boxShadow: theme.shadows[1],
        fontSize: 13,
        fontWeight: 'normal',
        maxWidth: 1000,
        padding: 12,
    },
    [`& .MuiTooltip-arrow`]: {
        color: theme.palette.common.white,
    },
}));

export function CustomTooltip(props: Omit<TooltipProps, 'children'> & { children: (string | React.ReactNode)[] | string | React.ReactNode }) {
    const { children, ...rest } = props;
    return <LightTooltip arrow placement="top-end" {...rest}><div>{children}</div></LightTooltip>
}


