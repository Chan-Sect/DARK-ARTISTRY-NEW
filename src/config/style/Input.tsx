import { styled } from "@mui/material";

export const VisuallyHiddenInput = styled('input')(() =>
({
    clip: 'rect(0 0 0 0)',
    clipPath: 'inset(50%)',
    overflow: 'hidden',
    position: 'absolute',
    whiteSpace: 'nowrap',
}))