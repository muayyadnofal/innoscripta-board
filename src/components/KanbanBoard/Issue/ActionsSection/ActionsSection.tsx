import React from 'react';
import {Button} from '../../../ui/Button';
import './ActionsSection.css';
import {IssueStatus} from "../../../../types";
import {useUpdateIssue} from "../../../../domain/useCases/useUpdateIssue";

interface ActionsSectionProps {
    issueId: string;
    currentStatus: IssueStatus;
    onStatusUpdate?: () => void;
    onUndo?: () => void;
}

export const ActionsSection: React.FC<ActionsSectionProps> = ({issueId, currentStatus, onStatusUpdate, onUndo}) => {
    const {updateIssue, isLoading} = useUpdateIssue(onUndo);

    const handleMarkAsResolved = async () => {
        try {
            await updateIssue(issueId, {status: 'Done'});
            onStatusUpdate?.();
        } catch (error) {
        }
    };

    if (currentStatus === 'Done') {
        return null;
    }

    return (
        <section className="actions-section">
            <h4>Actions</h4>
            <div className="action-buttons">
                <Button
                    variant="solid"
                    size="md"
                    block
                    onClick={handleMarkAsResolved}
                    loading={isLoading}
                    disabled={isLoading}
                >
                    Mark As Resolved
                </Button>
            </div>
        </section>
    );
};