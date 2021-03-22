import {Tooltip, TooltipProps, withStyles} from '@material-ui/core';
import React from 'react';

export const LightTooltip = withStyles((theme) => ({
    tooltip: {
        backgroundColor: theme.palette.common.white,
        color: 'rgba(0, 0, 0, 0.87)',
        boxShadow: theme.shadows[1],
        fontSize: 13,
        fontWeight: 'normal',
        maxWidth: 1000,
        padding: 12,
    },
    arrow: {
        color: theme.palette.common.white,
    },
}))(Tooltip);

export function CustomTooltip(props: Omit<TooltipProps, 'children'> & { children: (string | React.ReactNode)[] }) {
    const { children, ...rest } = props;
    return <LightTooltip arrow placement="top" {...rest}><div>{children}</div></LightTooltip>
}


