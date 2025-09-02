import React from 'react';
import {Button} from "../ui/Button";

interface UndoToastProps {
    message: string;
    onUndo: () => void;
}

export const UndoToast = (props: UndoToastProps) => {
    const {message, onUndo} = props;

    return (
        <div style={{display: 'flex', gap: '16px', alignItems: 'center', justifyContent: 'center'}}>
            <div style={{marginBottom: '8px', fontSize: '14px'}}>{message}</div>
            <Button onClick={onUndo}>
                Undo
            </Button>
        </div>
    );
}