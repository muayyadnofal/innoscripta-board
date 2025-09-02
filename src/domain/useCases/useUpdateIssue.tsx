import {useCache, useMutation} from "../../lib/query";
import {issuesService} from "../../data/api/IssueDataSource";
import {IssueEntity} from "../../data/api/entities/issue.entity";
import {toast} from "react-toastify";
import {UndoToast} from "../../components/UndoToast/UndoToast";
import {IssueModel} from "../models/Issue.model";

export function useUpdateIssue(onUndo?: () => void) {
    const {cache, updateCache} = useCache();
    const cacheKey = 'issues'

    const mutation = useMutation(
        async ({id, updates}: { id: string; updates: Partial<IssueEntity> }) =>
            issuesService.updateById(id, updates),
        {delay: 0}
    );

    const transformAssignee = (data: IssueModel[] | IssueEntity[]) =>
        data.map(issue => ({
            ...issue,
            assignee: typeof issue.assignee === "object" ? issue.assignee.name : issue.assignee
        }));

    const applyUpdate = (
        id: string,
        updates: Partial<IssueEntity>,
        data: IssueEntity[]
    ) => data.map(issue => (issue.id === id ? {...issue, ...updates} : issue));

    const getCurrentData = () => cache[cacheKey]?.data as IssueModel[] | undefined;

    const updateIssue = async (id: string, updates: Partial<IssueEntity>) => {
        const currentData = getCurrentData();
        let previousData: IssueEntity[] = []
        if (currentData) {
            previousData = transformAssignee(currentData);
            updateCache(cacheKey, applyUpdate(id, updates, previousData as IssueEntity[]));
        }

        if (!currentData) return await mutation.mutate({id, updates});

        const issueToUpdate = currentData.find(issue => issue.id === id);
        if (!issueToUpdate) return await mutation.mutate({id, updates});


        try {
            const result = await mutation.mutate({id, updates});

            toast.success(
                ({closeToast}) => (
                    <UndoToast
                        message="Issue updated successfully"
                        onUndo={async () => {
                            updateCache(cacheKey, previousData);
                            await mutation.mutate({
                                id,
                                updates: {...issueToUpdate, assignee: issueToUpdate?.assignee.name},
                            });
                            onUndo && onUndo();
                            closeToast?.();
                        }}
                    />
                ),
                {
                    position: "bottom-right",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: false,
                    pauseOnHover: true,
                    draggable: true,
                    closeButton: false,
                }
            );


            return result;
        } catch (error) {
            updateCache(cacheKey, previousData);
            throw error;
        }
    };

    return {
        updateIssue,
        isLoading: mutation.isLoading,
        error: mutation.error
    };
}
